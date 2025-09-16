'use client';

import { useState } from 'react';
import { X, Building, Heart, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface NewProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewProgramModal({ isOpen, onClose }: NewProgramModalProps) {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    program: '',
    bandeira: '',
    regional: '',
    contact: '',
    phone: '',
    email: '',
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('New program:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Novo Programa / Parceria</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Program Type Selection */}
          <div className="grid grid-cols-3 gap-4">
            <div 
              className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                formData.program === 'arrecadacao' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setFormData({...formData, program: 'arrecadacao'})}
            >
              <div className="text-center">
                <Building className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <h3 className="font-medium text-gray-900">Arrecadação</h3>
                <p className="text-sm text-gray-500">Coleta de produtos</p>
              </div>
            </div>

            <div 
              className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                formData.program === 'contra_desperdicio' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setFormData({...formData, program: 'contra_desperdicio'})}
            >
              <div className="text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-medium text-gray-900">Contra Desperdício</h3>
                <p className="text-sm text-gray-500">Reaproveitamento</p>
              </div>
            </div>

            <div 
              className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                formData.program === 'doacao' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setFormData({...formData, program: 'doacao_alimentos'})}
            >
              <div className="text-center">
                <Package className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-medium text-gray-900">Doação de Alimentos</h3>
                <p className="text-sm text-gray-500">Doação direta de alimentos</p>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Tipo</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="loja">Loja</SelectItem>
                  <SelectItem value="osc">OSC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="name">Nome</Label>
              <Input 
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Nome da loja/OSC"
              />
            </div>

            <div>
              <Label htmlFor="bandeira">Bandeira</Label>
              <Select value={formData.bandeira} onValueChange={(value) => setFormData({...formData, bandeira: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a bandeira" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="extra">Extra</SelectItem>
                  <SelectItem value="pao-de-acucar">Pão de Açúcar</SelectItem>
                  <SelectItem value="assai">Assaí</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="regional">Regional</Label>
              <Select value={formData.regional} onValueChange={(value) => setFormData({...formData, regional: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a regional" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sao-paulo">São Paulo</SelectItem>
                  <SelectItem value="rio-janeiro">Rio de Janeiro</SelectItem>
                  <SelectItem value="minas-gerais">Minas Gerais</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Informações de Contato</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="contact">Nome do contato</Label>
                <Input 
                  id="contact"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input 
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input 
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="email@exemplo.com"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Observações</Label>
            <Textarea 
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Informações adicionais sobre a parceria..."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
              Criar Programa
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}