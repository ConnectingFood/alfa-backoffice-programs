'use client';

import { useState } from 'react';
import { X, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockOSCs, mockParcerias, mockLojas } from '@/lib/data';
import type { OSC } from '@/types';

/* ===================== Tipos locais ===================== */
type Loja = {
  id: string;
  nome: string;
};

type ParceriaStatus = 'ativa' | 'desfeita';

type Parceria = {
  id: string;
  lojaId: string;
  oscId: string;
  status: ParceriaStatus;
  dataInicio: string;          // ISO date
  dataFim?: string;            // ISO date
  motivo?: string;
  observacoes?: string;
};

type EntityType = 'loja' | 'osc';

interface ParceriasModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** tipo da entidade focal da modal: 'loja' significa que a tela mostra as OSCs parceiras dessa loja; 'osc' mostra as lojas parceiras dessa OSC */
  type: EntityType;
  /** entidade focal (ou `loja` legado abaixo) */
  entity?: OSC | Loja;
  /** compat legado: se vier, usamos como entity */
  loja?: Loja;
}

interface FormState {
  partnerId: string;   // id da OSC (quando currentType === 'loja') ou id da Loja (quando currentType === 'osc')
  observacoes: string;
  motivo: string;
}

export function ParceriasModal({ entity, type, loja, isOpen, onClose }: ParceriasModalProps) {
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [editingParceria, setEditingParceria] = useState<Parceria | null>(null);
  const [formData, setFormData] = useState<FormState>({
    partnerId: '',
    observacoes: '',
    motivo: '',
  });

  // Suporte ao prop legado `loja`
  const currentEntity: OSC | Loja | undefined = entity ?? loja ?? undefined;
  const currentType: EntityType = (type ?? 'loja') as EntityType;

  if (!isOpen || !currentEntity) return null;

  // Filtra parcerias da entidade focal
  const parceriasEntity: Parceria[] =
    currentType === 'loja'
      ? (mockParcerias as Parceria[]).filter((p) => p.lojaId === currentEntity.id)
      : (mockParcerias as Parceria[]).filter((p) => p.oscId === currentEntity.id);

  const parceriasAtivas = parceriasEntity.filter((p) => p.status === 'ativa');
  const parceriasDesfeitas = parceriasEntity.filter((p) => p.status === 'desfeita');

  const resetForm = () =>
    setFormData({
      partnerId: '',
      observacoes: '',
      motivo: '',
    });

  const handleAddParceria = () => {
    // Implementar adição de parceria (chamada API)
    console.log('Adicionando parceria:', {
      type: currentType,
      entityId: currentEntity.id,
      ...formData,
    });
    setShowAddForm(false);
    setEditingParceria(null);
    resetForm(); // <-- aqui estava o bug: antes usava { oscId: '' }
  };

  const handleEditParceria = (parceria: Parceria) => {
    setEditingParceria(parceria);
    setShowAddForm(true);
    setFormData({
      partnerId: currentType === 'loja' ? parceria.oscId : parceria.lojaId,
      observacoes: parceria.observacoes ?? '',
      motivo: parceria.motivo ?? '',
    });
  };

  const handleRemoveParceria = (parceria: Parceria) => {
    // Implementar remoção de parceria (chamada API)
    console.log('Removendo parceria:', parceria);
  };

  const getPartnerName = (parceria: Parceria): string => {
    if (currentType === 'loja') {
      const osc = (mockOSCs as OSC[]).find((o) => o.id === parceria.oscId);
      return osc ? osc.name : 'OSC não encontrada';
    } else {
      const loja = (mockLojas as Loja[]).find((l) => l.id === parceria.lojaId);
      return loja ? loja.nome : 'Loja não encontrada';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Parcerias - {'nome' in currentEntity ? currentEntity.nome : (currentEntity as OSC).name}
            </h2>
            <p className="text-sm text-gray-500">
              Gestão de parcerias {currentType === 'loja' ? 'da loja' : 'da OSC'}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Add Partnership Button */}
          <div className="mb-6">
            <Button onClick={() => setShowAddForm(true)} className="bg-orange-600 hover:bg-orange-700">
              <Plus size={16} className="mr-2" />
              Nova Parceria
            </Button>
          </div>

          {/* Add/Edit Form */}
          {(showAddForm || editingParceria) && (
            <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="font-medium text-gray-900 mb-4">
                {editingParceria ? 'Editar Parceria' : 'Nova Parceria'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="partner">{currentType === 'loja' ? 'OSC' : 'Loja'}</Label>
                  <Select
                    value={formData.partnerId}
                    onValueChange={(value) => setFormData({ ...formData, partnerId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`Selecione ${currentType === 'loja' ? 'uma OSC' : 'uma Loja'}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {currentType === 'loja'
                        ? (mockOSCs as OSC[]).map((osc) => (
                            <SelectItem key={osc.id} value={osc.id}>
                              {osc.name}
                            </SelectItem>
                          ))
                        : (mockLojas as Loja[]).map((loja) => (
                            <SelectItem key={loja.id} value={loja.id}>
                              {loja.nome}
                            </SelectItem>
                          ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="motivo">Motivo (se aplicável)</Label>
                  <Input
                    id="motivo"
                    value={formData.motivo}
                    onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                    placeholder="Motivo da alteração"
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                  placeholder="Observações sobre a parceria"
                  rows={3}
                />
              </div>

              <div className="flex gap-2 mt-4">
                <Button onClick={handleAddParceria} className="bg-orange-600 hover:bg-orange-700">
                  {editingParceria ? 'Salvar' : 'Adicionar'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingParceria(null);
                    resetForm();
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          {/* Active Partnerships */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Parcerias Ativas ({parceriasAtivas.length})</h3>

            {parceriasAtivas.length > 0 ? (
              <div className="space-y-3">
                {parceriasAtivas.map((parceria) => (
                  <div key={parceria.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{getPartnerName(parceria)}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Início: {new Date(parceria.dataInicio).toLocaleDateString('pt-BR')}
                        </p>
                        {parceria.observacoes && (
                          <p className="text-sm text-gray-700 mt-2 p-2 bg-gray-50 rounded">
                            {parceria.observacoes}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800">Ativa</Badge>
                        <Button variant="ghost" size="sm" onClick={() => handleEditParceria(parceria)}>
                          <Edit size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveParceria(parceria)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Nenhuma parceria ativa</p>
            )}
          </div>

          {/* Ended Partnerships */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Parcerias Desfeitas ({parceriasDesfeitas.length})
            </h3>

            {parceriasDesfeitas.length > 0 ? (
              <div className="space-y-3">
                {parceriasDesfeitas.map((parceria) => (
                  <div key={parceria.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{getPartnerName(parceria)}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Período:{' '}
                          {new Date(parceria.dataInicio).toLocaleDateString('pt-BR')} -{' '}
                          {parceria.dataFim
                            ? new Date(parceria.dataFim).toLocaleDateString('pt-BR')
                            : '-'}
                        </p>
                        {parceria.motivo && (
                          <p className="text-sm text-red-700 mt-1">
                            <strong>Motivo:</strong> {parceria.motivo}
                          </p>
                        )}
                        {parceria.observacoes && (
                          <p className="text-sm text-gray-700 mt-2 p-2 bg-white rounded">
                            {parceria.observacoes}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-100 text-red-800">Desfeita</Badge>
                        <Button variant="ghost" size="sm" onClick={() => handleEditParceria(parceria)}>
                          <Edit size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Nenhuma parceria desfeita</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}
