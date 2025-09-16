'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, Clock, Package, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { mockLojas } from '@/lib/data';

/* ===================== Types ===================== */
type Cliente = 'GPA' | 'Assaí' | 'Proença';
type Estado = 'São Paulo' | 'Rio de Janeiro' | 'Minas Gerais';

type Programa = { id: string; name: string; type: string };
type Responsavel = { id: string; name: string; loja: string };

type Loja = {
  id: string;
  nome: string;
  bandeira: string;
  cidade: string;
  estado: string;
  status: string;         // 'ativo' | ... (mantido flexível)
  ultimaColeta: string;   // '-' | ISO date
};

interface NovaColetaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LastCollectionData {
  data: string;        // ISO
  quantidade: number;  // kg
}

interface FormState {
  cliente: Cliente | '';
  programId: string;
  estado: Estado | '';
  cidade: string;
  bandeira: string;
  lojaId: string;
  data: string;                 // yyyy-mm-dd
  horario: string;              // HH:mm
  responsavel: string;
  quantidadePrevista: string;   // mantido como string para input controlado
  observacoes: string;
  notificarLoja: boolean;
  notificarOSC: boolean;
  notificarRegional: boolean;
}

/* ===================== Static data ===================== */
const clientePrograms: Record<Cliente, Programa[]> = {
  GPA: [
    { id: '1', name: 'Programa de parceria contra o desperdício', type: 'contra_desperdicio' },
  ],
  'Assaí': [
    { id: '3', name: 'Programa destino certo', type: 'contra_desperdicio' },
  ],
  'Proença': [
    { id: '4', name: 'Programa doação do bem', type: 'contra_desperdicio' },
  ],
};

const estadoCidades: Record<Estado, string[]> = {
  'São Paulo': ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo'],
  'Rio de Janeiro': ['Rio de Janeiro', 'Niterói', 'Duque de Caxias', 'Nova Iguaçu'],
  'Minas Gerais': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora'],
};

const clienteBandeiras: Record<Cliente, string[]> = {
  'GPA': ['Extra', 'Pão de Açúcar'],
  'Assaí': ['Assaí'],
  'Proença': ['Proença'],
};

const mockResponsaveis: Responsavel[] = [
  { id: '1', name: 'João Silva', loja: 'Extra Hiper Vila Olímpia' },
  { id: '2', name: 'Maria Santos', loja: 'Pão de Açúcar Jardins' },
  { id: '3', name: 'Carlos Lima', loja: 'Assaí Atacadista Morumbi' },
  { id: '4', name: 'Ana Costa', loja: 'Proença Centro' },
];

/* ===================== Component ===================== */
export function NovaColetaModal({ isOpen, onClose }: NovaColetaModalProps) {
  const [formData, setFormData] = useState<FormState>({
    cliente: '',
    programId: '',
    estado: '',
    cidade: '',
    bandeira: '',
    lojaId: '',
    data: '',
    horario: '',
    responsavel: '',
    quantidadePrevista: '',
    observacoes: '',
    notificarLoja: false,
    notificarOSC: false,
    notificarRegional: false,
  });

  const [lastCollectionData, setLastCollectionData] = useState<LastCollectionData | null>(null);

  if (!isOpen) return null;

  /* ------- Helpers & derived data ------- */
  const availablePrograms: Programa[] =
    formData.cliente ? clientePrograms[formData.cliente] : [];

  const availableCidades: string[] =
    formData.estado ? estadoCidades[formData.estado] : [];

  const availableBandeiras: string[] =
    formData.cliente ? clienteBandeiras[formData.cliente] : [];

  // tipar mockLojas localmente para evitar "any"
  const allLojas = (mockLojas as unknown as Loja[]) || [];

  const filteredLojas: Loja[] = allLojas.filter((loja) => {
    if (formData.bandeira && loja.bandeira !== formData.bandeira) return false;
    if (formData.cidade && loja.cidade !== formData.cidade) return false;
    if (formData.estado && loja.estado !== formData.estado) return false;
    return true;
  });

  // Priorizar lojas sem doação (status !== 'ativo')
  const lojasOrdenadas: Loja[] = [...filteredLojas].sort((a, b) => {
    if (a.status !== 'ativo' && b.status === 'ativo') return -1;
    if (a.status === 'ativo' && b.status !== 'ativo') return 1;
    return 0;
  });

  const availableResponsaveis: Responsavel[] = formData.lojaId
    ? mockResponsaveis.filter(
        (r) => r.loja === filteredLojas.find((l) => l.id === formData.lojaId)?.nome
      )
    : [];

  function getLastCollectionData(lojaId: string): LastCollectionData | null {
    const loja = allLojas.find((l) => l.id === lojaId);
    // se tiver data válida (diferente de '-'), retornar quantidade mockada
    return loja && loja.ultimaColeta !== '-' ? { data: loja.ultimaColeta, quantidade: 75 } : null;
  }

  function handleUseLastAmount() {
    if (lastCollectionData) {
      setFormData({ ...formData, quantidadePrevista: String(lastCollectionData.quantidade) });
    }
  }

  useEffect(() => {
    if (formData.lojaId) {
      setLastCollectionData(getLastCollectionData(formData.lojaId));
    } else {
      setLastCollectionData(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.lojaId]);

  /* ------- Submit ------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nova coleta:', formData);
    onClose();
    // Reset form
    setFormData({
      cliente: '',
      programId: '',
      estado: '',
      cidade: '',
      bandeira: '',
      lojaId: '',
      data: '',
      horario: '',
      responsavel: '',
      quantidadePrevista: '',
      observacoes: '',
      notificarLoja: false,
      notificarOSC: false,
      notificarRegional: false,
    });
  };

  /* ===================== UI ===================== */
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 rethink-sans">Nova Coleta</h2>
              <p className="text-sm text-gray-500 hedvig-letters-sans">Agendar nova coleta de alimentos</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Seleção Hierárquica */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 rethink-sans">Seleção de Local</h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Cliente */}
              <div>
                <Label htmlFor="cliente" className="rethink-sans">Cliente</Label>
                <Select
                  value={formData.cliente}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      cliente: value as Cliente,
                      programId: '',
                      bandeira: '',
                      lojaId: '',
                      responsavel: '',
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GPA">GPA</SelectItem>
                    <SelectItem value="Assaí">Assaí</SelectItem>
                    <SelectItem value="Proença">Proença</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Programa */}
              <div>
                <Label htmlFor="programa" className="rethink-sans">Programa</Label>
                <Select
                  value={formData.programId}
                  onValueChange={(value) => setFormData({ ...formData, programId: value })}
                  disabled={!formData.cliente}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o programa" />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePrograms.map((program) => (
                      <SelectItem key={program.id} value={program.id}>
                        {program.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Estado */}
              <div>
                <Label htmlFor="estado" className="rethink-sans">Estado</Label>
                <Select
                  value={formData.estado}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      estado: value as Estado,
                      cidade: '',
                      lojaId: '',
                      responsavel: '',
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="São Paulo">São Paulo</SelectItem>
                    <SelectItem value="Rio de Janeiro">Rio de Janeiro</SelectItem>
                    <SelectItem value="Minas Gerais">Minas Gerais</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Cidade */}
              <div>
                <Label htmlFor="cidade" className="rethink-sans">Cidade</Label>
                <Select
                  value={formData.cidade}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      cidade: value,
                      lojaId: '',
                      responsavel: '',
                    })
                  }
                  disabled={!formData.estado}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a cidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCidades.map((cidade) => (
                      <SelectItem key={cidade} value={cidade}>
                        {cidade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Bandeira */}
              <div>
                <Label htmlFor="bandeira" className="rethink-sans">Bandeira</Label>
                <Select
                  value={formData.bandeira}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      bandeira: value,
                      lojaId: '',
                      responsavel: '',
                    })
                  }
                  disabled={!formData.cliente}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a bandeira" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableBandeiras.map((bandeira) => (
                      <SelectItem key={bandeira} value={bandeira}>
                        {bandeira}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Loja */}
              <div>
                <Label htmlFor="loja" className="rethink-sans">Loja</Label>
                <Select
                  value={formData.lojaId}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      lojaId: value,
                      responsavel: '',
                    })
                  }
                  disabled={!formData.bandeira}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a loja" />
                  </SelectTrigger>
                  <SelectContent>
                    {lojasOrdenadas.map((loja) => (
                      <SelectItem key={loja.id} value={loja.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{loja.nome}</span>
                          {loja.status !== 'ativo' && (
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded ml-2">
                              Sem doação
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Data e Horário */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 rethink-sans">Agendamento</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="data" className="rethink-sans">Data da Coleta</Label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="data"
                    type="date"
                    value={formData.data}
                    onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="horario" className="rethink-sans">Horário</Label>
                <div className="relative">
                  <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="horario"
                    type="time"
                    value={formData.horario}
                    onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Responsável e Quantidade */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 rethink-sans">Detalhes da Coleta</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="responsavel" className="rethink-sans">Responsável</Label>
                <Select
                  value={formData.responsavel}
                  onValueChange={(value) => setFormData({ ...formData, responsavel: value })}
                  disabled={!formData.lojaId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableResponsaveis.map((responsavel) => (
                      <SelectItem key={responsavel.id} value={responsavel.name}>
                        {responsavel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="quantidade" className="rethink-sans">Quantidade Prevista (kg)</Label>
                <div className="relative">
                  <Package size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="quantidade"
                    type="number"
                    value={formData.quantidadePrevista}
                    onChange={(e) => setFormData({ ...formData, quantidadePrevista: e.target.value })}
                    placeholder="0"
                    className="pl-10"
                    min="0"
                    required
                  />
                </div>

                {lastCollectionData && (
                  <div className="mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleUseLastAmount}
                      className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      Usar última coleta: {lastCollectionData.quantidade}kg (
                      {new Date(lastCollectionData.data).toLocaleDateString('pt-BR')})
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notificações */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 rethink-sans">Notificações</h3>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="notificarLoja"
                  checked={formData.notificarLoja}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, notificarLoja: Boolean(checked) })
                  }
                />
                <Label htmlFor="notificarLoja" className="hedvig-letters-sans flex items-center">
                  <Bell size={14} className="mr-2 text-blue-600" />
                  Notificar Loja
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="notificarOSC"
                  checked={formData.notificarOSC}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, notificarOSC: Boolean(checked) })
                  }
                />
                <Label htmlFor="notificarOSC" className="hedvig-letters-sans flex items-center">
                  <Bell size={14} className="mr-2 text-green-600" />
                  Notificar OSC
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="notificarRegional"
                  checked={formData.notificarRegional}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, notificarRegional: Boolean(checked) })
                  }
                />
                <Label htmlFor="notificarRegional" className="hedvig-letters-sans flex items-center">
                  <Bell size={14} className="mr-2 text-orange-600" />
                  Notificar Regional
                </Label>
              </div>
            </div>
          </div>

          {/* Observações */}
          <div>
            <Label htmlFor="observacoes" className="rethink-sans">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              placeholder="Informações adicionais sobre a coleta..."
              rows={3}
              className="hedvig-letters-sans"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose} className="rethink-sans">
              Cancelar
            </Button>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700 rethink-sans">
              <Calendar size={16} className="mr-2" />
              Agendar Coleta
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
