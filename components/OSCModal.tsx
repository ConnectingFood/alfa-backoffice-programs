'use client';

import { useState, useEffect } from 'react';
import { OSC } from '@/types';
import { X, Plus, Check, AlertCircle, Camera, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const tagOptions = [
  'sem_contato',
  'boas_vindas', 
  'solicitar_questionario',
  'depoimento',
  'direito_imagem'
];

const tagLabels = {
  sem_contato: 'Sem contato',
  boas_vindas: 'Boas vindas',
  solicitar_questionario: 'Solicitar questionário',
  depoimento: 'Depoimento',
  direito_imagem: 'Direito de uso de imagem'
};

export function OSCModal({ osc, isOpen, onClose }: { osc: OSC | null; isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('checklist');
  const [novaObservacao, setNovaObservacao] = useState('');
  const [editedOSC, setEditedOSC] = useState<OSC | null>(osc);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  useEffect(() => {
    if (osc) {
      setEditedOSC(osc);
    } else {
      setEditedOSC(null);
    }
  }, [osc]);

  if (!isOpen || !osc) return null;

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadingLogo(true);
      // Simular upload - em produção seria uma chamada para API
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        // Aqui você salvaria a imagem no backend e atualizaria o estado
        console.log('Logo uploaded for OSC:', osc.id, result);
        setEditedOSC({
          ...editedOSC!,
          logo: result
        });
        setUploadingLogo(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Implementar salvamento
    console.log('Salvando OSC:', editedOSC);
    onClose();
  };

  const addObservacao = () => {
    if (novaObservacao.trim()) {
      setEditedOSC({
        ...editedOSC!,
        observacoesCRM: [...(editedOSC?.observacoesCRM || []), novaObservacao]
      });
      setNovaObservacao('');
    }
  };

  const toggleTag = (tag) => {
    const currentTags = editedOSC?.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    setEditedOSC({
      ...editedOSC!,
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
                {editedOSC?.logo ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                    <img 
                      src={editedOSC.logo} 
                      alt={`Logo ${osc.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <Heart size={24} className="text-red-600" />
                  </div>
                )}
                
                {/* Upload overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <label htmlFor="osc-logo-upload" className="cursor-pointer">
                    {uploadingLogo ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <Camera size={20} className="text-white" />
                    )}
                  </label>
                  <input
                    id="osc-logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-gray-900">{osc.name}</h2>
            <p className="text-sm text-gray-500">{osc.email}</p>
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
              <TabsTrigger value="checklist">Checklist</TabsTrigger>
              <TabsTrigger value="crm">CRM</TabsTrigger>
              <TabsTrigger value="contato">Contato</TabsTrigger>
            </TabsList>

            <TabsContent value="checklist" className="mt-6">
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900">Checklist de Verificação</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">CNPJ ativo na receita</span>
                      <div className="flex items-center gap-2">
                        {editedOSC?.checklist?.cnpjAtivo ? (
                          <Check size={16} className="text-green-600" />
                        ) : (
                          <AlertCircle size={16} className="text-red-600" />
                        )}
                        <Select 
                          value={(editedOSC?.checklist?.cnpjAtivo ?? false) ? 'sim' : 'nao'}
                          onValueChange={(value) => setEditedOSC({
                            ...editedOSC,
                            checklist: {
                              ...editedOSC?.checklist,
                              cnpjAtivo: value === 'sim'
                            }
                          })}
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sim">Sim</SelectItem>
                            <SelectItem value="nao">Não</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Fit com objetivos CF</span>
                      <div className="flex items-center gap-2">
                        {editedOSC?.checklist?.fitObjetivos ? (
                          <Check size={16} className="text-green-600" />
                        ) : (
                          <AlertCircle size={16} className="text-red-600" />
                        )}
                        <Select 
                          value={(editedOSC?.checklist?.fitObjetivos ?? false) ? 'sim' : 'nao'}
                          onValueChange={(value) => setEditedOSC({
                            ...editedOSC,
                            checklist: {
                              ...editedOSC?.checklist,
                              fitObjetivos: value === 'sim'
                            }
                          })}
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sim">Sim</SelectItem>
                            <SelectItem value="nao">Não</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Verificação reputação</span>
                      <div className="flex items-center gap-2">
                        {editedOSC?.checklist?.verificacaoReputacao ? (
                          <Check size={16} className="text-green-600" />
                        ) : (
                          <AlertCircle size={16} className="text-red-600" />
                        )}
                        <Select 
                          value={(editedOSC?.checklist?.verificacaoReputacao ?? false) ? 'sim' : 'nao'}
                          onValueChange={(value) => setEditedOSC({
                            ...editedOSC,
                            checklist: {
                              ...editedOSC?.checklist,
                              verificacaoReputacao: value === 'sim'
                            }
                          })}
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sim">Sim</SelectItem>
                            <SelectItem value="nao">Não</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Endereço confirmado</span>
                      <div className="flex items-center gap-2">
                        {editedOSC?.checklist?.enderecoConfirmado ? (
                          <Check size={16} className="text-green-600" />
                        ) : (
                          <AlertCircle size={16} className="text-red-600" />
                        )}
                        <Select 
                          value={(editedOSC?.checklist?.enderecoConfirmado ?? false) ? 'sim' : 'nao'}
                          onValueChange={(value) => setEditedOSC({
                            ...editedOSC,
                            checklist: {
                              ...editedOSC?.checklist,
                              enderecoConfirmado: value === 'sim'
                            }
                          })}
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sim">Sim</SelectItem>
                            <SelectItem value="nao">Não</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Pesquisado CNPJ CNEP</span>
                      <div className="flex items-center gap-2">
                        {editedOSC?.checklist?.pesquisadoCNEP ? (
                          <Check size={16} className="text-green-600" />
                        ) : (
                          <AlertCircle size={16} className="text-red-600" />
                        )}
                        <Select 
                          value={(editedOSC?.checklist?.pesquisadoCNEP ?? false) ? 'sim' : 'nao'}
                          onValueChange={(value) => setEditedOSC({
                            ...editedOSC,
                            checklist: {
                              ...editedOSC?.checklist,
                              pesquisadoCNEP: value === 'sim'
                            }
                          })}
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sim">Sim</SelectItem>
                            <SelectItem value="nao">Não</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Pesquisado CNPJ CEPIM</span>
                      <div className="flex items-center gap-2">
                        {editedOSC?.checklist?.pesquisadoCEPIM ? (
                          <Check size={16} className="text-green-600" />
                        ) : (
                          <AlertCircle size={16} className="text-red-600" />
                        )}
                        <Select 
                          value={(editedOSC?.checklist?.pesquisadoCEPIM ?? false) ? 'sim' : 'nao'}
                          onValueChange={(value) => setEditedOSC({
                            ...editedOSC,
                            checklist: {
                              ...editedOSC?.checklist,
                              pesquisadoCEPIM: value === 'sim'
                            }
                          })}
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sim">Sim</SelectItem>
                            <SelectItem value="nao">Não</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Pesquisado CNPJ CEIS</span>
                      <div className="flex items-center gap-2">
                        {editedOSC?.checklist?.pesquisadoCEIS ? (
                          <Check size={16} className="text-green-600" />
                        ) : (
                          <AlertCircle size={16} className="text-red-600" />
                        )}
                        <Select 
                          value={(editedOSC?.checklist?.pesquisadoCEIS ?? false) ? 'sim' : 'nao'}
                          onValueChange={(value) => setEditedOSC({
                            ...editedOSC,
                            checklist: {
                              ...editedOSC?.checklist,
                              pesquisadoCEIS: value === 'sim'
                            }
                          })}
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sim">Sim</SelectItem>
                            <SelectItem value="nao">Não</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="emailContato">Email de contato</Label>
                      <Input 
                        id="emailContato"
                        value={editedOSC?.checklist?.emailContato || ''}
                        onChange={(e) => setEditedOSC({
                          ...editedOSC,
                          checklist: {
                            ...editedOSC?.checklist,
                            emailContato: e.target.value
                          }
                        })}
                        placeholder="email@exemplo.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Tags da OSC</h4>
                  <div className="flex flex-wrap gap-2">
                    {tagOptions.map(tag => (
                      <Badge
                        key={tag}
                        variant={editedOSC?.tags?.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          editedOSC?.tags?.includes(tag) 
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
                  {editedOSC?.observacoesCRM?.map((obs, index) => (
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
                      value={editedOSC?.contato?.responsavel || ''}
                      onChange={(e) => setEditedOSC({
                        ...editedOSC!,
                        contato: {
                          ...editedOSC?.contato,
                          responsavel: e.target.value
                        }
                      })}
                      placeholder="Nome do responsável"
                    />
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={editedOSC?.status || 'ativo'}
                      onValueChange={(value) => setEditedOSC({
                        ...editedOSC!,
                        status: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="verificar">Verificar</SelectItem>
                        <SelectItem value="inativo">Inativa (Não querem/podem receber)</SelectItem>
                        <SelectItem value="backlog">Backlog</SelectItem>
                      </SelectContent>
                    </Select>
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