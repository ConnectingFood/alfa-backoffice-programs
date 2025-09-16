'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Camera, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loja } from '@/types';

const tagOptions = [
  'visitadas',
  'sem_contato', 
  'sem_parceria',
  'iniciando',
  'abertura',
  'plano_b',
  'ocorrencias',
  'piloto',
  'nao_flv'
] as const;

const tagLabels: Record<typeof tagOptions[number], string> = {
  visitadas: 'Lojas visitadas',
  sem_contato: 'Sem contato',
  sem_parceria: 'Sem parceria',
  iniciando: 'Iniciando',
  abertura: 'Abertura de lojas',
  plano_b: 'Previsão de Plano B',
  ocorrencias: 'Ocorrências',
  piloto: 'Em fase Piloto',
  nao_flv: 'Não trabalha com FLV'
};

interface LojaModalProps {
  loja: Loja | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LojaModal({ loja, isOpen, onClose }: LojaModalProps) {
  const [activeTab, setActiveTab] = useState('dados');
  const [novaObservacao, setNovaObservacao] = useState('');
  const [editedLoja, setEditedLoja] = useState<Loja | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  useEffect(() => {
    if (loja) {
      setEditedLoja(loja);
    } else {
      setEditedLoja(null);
    }
  }, [loja]);

  if (!isOpen || !editedLoja) return null;

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadingLogo(true);
      // Simular upload - em produção seria uma chamada para API
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        // Aqui você salvaria a imagem no backend e atualizaria o estado
        console.log('Logo uploaded for Loja:', editedLoja.id, result);
        setEditedLoja({
          ...editedLoja,
          logo: result
        });
        setUploadingLogo(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Implementar salvamento
    console.log('Salvando Loja:', editedLoja);
    onClose();
  };

  const addObservacao = () => {
    if (novaObservacao.trim()) {
      setEditedLoja({
        ...editedLoja,
        observacoesCRM: [...(editedLoja?.observacoesCRM || []), novaObservacao]
      });
      setNovaObservacao('');
    }
  };

  const toggleTag = (tag: string) => {
    const currentTags = editedLoja?.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    setEditedLoja({
      ...editedLoja,
      tags: newTags
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-4 mb-2">
              {/* Logo/Avatar */}
              <div className="relative group">
                {editedLoja.logo ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                    <img 
                      src={editedLoja.logo} 
                      alt={`Logo ${editedLoja.nome}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Building size={24} className="text-blue-600" />
                  </div>
                )}
                
                {/* Upload overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <label htmlFor="loja-logo-upload" className="cursor-pointer">
                    {uploadingLogo ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <Camera size={20} className="text-white" />
                    )}
                  </label>
                  <input
                    id="loja-logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-gray-900">{editedLoja.nome}</h2>
            <p className="text-sm text-gray-500">{editedLoja.bandeira} • {editedLoja.regional}</p>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dados">Dados</TabsTrigger>
              <TabsTrigger value="crm">CRM</TabsTrigger>
              <TabsTrigger value="contato">Contato</TabsTrigger>
            </TabsList>

            <TabsContent value="dados" className="mt-6">
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900">Informações da Loja</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="codigoGPA">Código GPA</Label>
                    <Input 
                      id="codigoGPA"
                      value={editedLoja?.codigoGPA || ''}
                      onChange={(e) => setEditedLoja({
                        ...editedLoja!,
                        codigoGPA: e.target.value
                      })}
                      placeholder="GPA001"
                    />
                  </div>

                  <div>
                    <Label htmlFor="codigoLoja">Código da Loja</Label>
                    <Input 
                      id="codigoLoja"
                      value={editedLoja?.codigo || ''}
                      onChange={(e) => setEditedLoja({
                        ...editedLoja!,
                        codigo: e.target.value
                      })}
                      placeholder="EXT001"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      value={editedLoja?.email || ''}
                      onChange={(e) => setEditedLoja({
                        ...editedLoja!,
                        email: e.target.value
                      })}
                      placeholder="email@loja.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="local">Local</Label>
                    <Input 
                      id="local"
                      value={editedLoja?.endereco || ''}
                      onChange={(e) => setEditedLoja({
                        ...editedLoja!,
                        endereco: e.target.value
                      })}
                      placeholder="Endereço completo"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cidade">Cidade e Estado</Label>
                    <Input 
                      id="cidade"
                      value={`${editedLoja?.cidade || ''}, ${editedLoja?.estado || ''}`}
                      onChange={(e) => {
                        const [cidade, estado] = e.target.value.split(', ');
                        setEditedLoja({
                          ...editedLoja!,
                          cidade: cidade || '',
                          estado: estado || ''
                        });
                      }}
                      placeholder="São Paulo, SP"
                    />
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={editedLoja?.status}
                      onValueChange={(value) => setEditedLoja({
                        ...editedLoja!,
                        status: value as Loja['status']
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="verificar">Verificar</SelectItem>
                        <SelectItem value="inativo">Inativa (Não querem/podem doar)</SelectItem>
                        <SelectItem value="encerrada">Encerrada (fechou)</SelectItem>
                        <SelectItem value="backlog">Backlog</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Tags da Loja</h4>
                  <div className="flex flex-wrap gap-2">
                    {tagOptions.map(tag => (
                      <Badge
                        key={tag}
                        variant={editedLoja?.tags?.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          editedLoja?.tags?.includes(tag) 
                            ? 'bg-orange-100 text-orange-800 border-orange-300' 
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tagLabels[tag]}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="crm" className="mt-6">
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900">Histórico CRM</h3>
                
                <div className="space-y-3">
                  {editedLoja.observacoesCRM?.map((obs, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{obs}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date().toLocaleDateString('pt-BR')} - Usuário Admin
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Textarea
                    placeholder="Adicionar nova observação..."
                    value={novaObservacao}
                    onChange={(e) => setNovaObservacao(e.target.value)}
                    rows={3}
                  />
                  <Button onClick={addObservacao} className="bg-orange-600 hover:bg-orange-700">
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contato" className="mt-6">
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900">Informações de Contato</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="responsavel">Responsável</Label>
                    <Input 
                      id="responsavel"
                      value={editedLoja?.contato?.responsavel || editedLoja?.gerente || ''}
                      onChange={(e) => setEditedLoja({
                        ...editedLoja!,
                        contato: {
                          ...editedLoja?.contato,
                          responsavel: e.target.value
                        },
                        gerente: e.target.value
                      })}
                      placeholder="Nome do responsável"
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input 
                      id="telefone"
                      value={editedLoja?.telefone || ''}
                      onChange={(e) => setEditedLoja({
                        ...editedLoja!,
                        telefone: e.target.value
                      })}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700">
            Salvar Alterações
          </Button>
        </div>
      </div>
    </div>
  );
}