'use client';

import { useState } from 'react';
import { X, Heart, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { mockLojas } from '@/lib/data';

/* ===================== Types ===================== */
type Tag =
  | 'sem_contato'
  | 'boas_vindas'
  | 'solicitar_questionario'
  | 'depoimento'
  | 'direito_imagem';

interface NovaOSCModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ===================== Static data ===================== */
const tagOptions: Tag[] = [
  'sem_contato',
  'boas_vindas',
  'solicitar_questionario',
  'depoimento',
  'direito_imagem',
];

const tagLabels: Record<Tag, string> = {
  sem_contato: 'Sem contato',
  boas_vindas: 'Boas vindas',
  solicitar_questionario: 'Solicitar questionário',
  depoimento: 'Depoimento',
  direito_imagem: 'Direito de uso de imagem',
};

export function NovaOSCModal({ isOpen, onClose }: NovaOSCModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cnpj: '',
    responsavel: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: '',
    observacoes: '',
    tags: [] as Tag[],
    fazerParceria: false,
    lojasParaParceria: [] as string[],
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nova OSC:', formData);
    onClose();
    // Reset form
    setFormData({
      name: '',
      email: '',
      cnpj: '',
      responsavel: '',
      telefone: '',
      endereco: '',
      cidade: '',
      estado: '',
      observacoes: '',
      tags: [],
      fazerParceria: false,
      lojasParaParceria: [],
    });
  };

  const toggleTag = (tag: Tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }));
  };

  const toggleLojaParceria = (lojaId: string) => {
    setFormData((prev) => ({
      ...prev,
      lojasParaParceria: prev.lojasParaParceria.includes(lojaId)
        ? prev.lojasParaParceria.filter((id) => id !== lojaId)
        : [...prev.lojasParaParceria, lojaId],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Nova OSC</h2>
              <p className="text-sm text-gray-500">Cadastrar nova Organização da Sociedade Civil</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Informações Básicas</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome da OSC *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Instituto Esperança"
                  required
                />
              </div>

              <div>
                <Label htmlFor="cnpj">CNPJ *</Label>
                <Input
                  id="cnpj"
                  value={formData.cnpj}
                  onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                  placeholder="12.345.678/0001-90"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contato@instituto.org.br"
                  required
                />
              </div>

              <div>
                <Label htmlFor="responsavel">Responsável</Label>
                <Input
                  id="responsavel"
                  value={formData.responsavel}
                  onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                  placeholder="Maria Silva"
                />
              </div>

              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <Label htmlFor="estado">Estado</Label>
                <Select value={formData.estado} onValueChange={(value) => setFormData({ ...formData, estado: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SP">São Paulo</SelectItem>
                    <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                    <SelectItem value="MG">Minas Gerais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="endereco">Endereço Completo</Label>
              <Input
                id="endereco"
                value={formData.endereco}
                onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                placeholder="Rua das Flores, 123 - Centro"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Tags da OSC</h3>
            <div className="flex flex-wrap gap-2">
              {tagOptions.map((tag: Tag) => (
                <Badge
                  key={tag}
                  variant={formData.tags.includes(tag) ? 'default' : 'outline'}
                  className={`cursor-pointer ${
                    formData.tags.includes(tag)
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

          {/* Parceria */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="fazerParceria"
                checked={formData.fazerParceria}
                onCheckedChange={(checked) => setFormData({ ...formData, fazerParceria: Boolean(checked) })}
              />
              <Label htmlFor="fazerParceria" className="font-semibold text-gray-900">
                Fazer parceria imediatamente
              </Label>
            </div>

            {formData.fazerParceria && (
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Selecione as lojas para parceria:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {mockLojas
                    .filter((loja) => loja.status === 'ativo')
                    .map((loja) => (
                      <div key={loja.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`loja-${loja.id}`}
                          checked={formData.lojasParaParceria.includes(loja.id)}
                          onCheckedChange={() => toggleLojaParceria(loja.id)}
                        />
                        <Label htmlFor={`loja-${loja.id}`} className="text-sm cursor-pointer">
                          {loja.nome} - {loja.bandeira}
                        </Label>
                      </div>
                    ))}
                </div>
                {formData.lojasParaParceria.length > 0 && (
                  <div className="text-sm text-green-600 flex items-center">
                    <Check size={14} className="mr-1" />
                    {formData.lojasParaParceria.length} loja(s) selecionada(s)
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Observações */}
          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              placeholder="Informações adicionais sobre a OSC..."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
              <Plus size={16} className="mr-2" />
              Cadastrar OSC
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
