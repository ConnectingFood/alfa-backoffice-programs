'use client';

import { useState } from 'react';
import { stageConfig, programConfig } from '@/lib/data';
import {
  X,
  Phone,
  Mail,
  Calendar,
  FileText,
  MessageSquare,
  ExternalLink,
  Plus,
  Clock,
  Upload,
  BarChart3,
  Camera,
  Heart,
  Building,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NovaInteracaoModal } from './NovaInteracaoModal';
import type { Partner } from '@/types';

interface PartnerModalProps {
  partner: Partner | null;
  isOpen: boolean;
  onClose: () => void;
}

type StageKey = keyof typeof stageConfig;
type ProgramKey = keyof typeof programConfig;

// Adiciona 'schedule' como opcional só para esta tela, sem mudar seus tipos globais.
type PartnerWithOptionalSchedule = Partner & {
  schedule?: {
    frequency: string;
    nextCollection: string | Date;
  };
};

export function PartnerModal({ partner, isOpen, onClose }: PartnerModalProps) {
  const [isNovaInteracaoModalOpen, setIsNovaInteracaoModalOpen] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && partner) {
      setUploadingLogo(true);
      // Simulação de upload
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        console.log('Logo uploaded for partner:', partner.id, result);
        setUploadingLogo(false);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen || !partner) return null;

  // Narrow local para acessar schedule de forma segura
  const p = partner as PartnerWithOptionalSchedule;

  const stage = stageConfig[partner.stage as StageKey];
  const program = programConfig[partner.program as ProgramKey];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-4 mb-2">
              {/* Logo/Avatar */}
              <div className="relative group">
                {partner.logo ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                    <img
                      src={partner.logo}
                      alt={`Logo ${partner.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      partner.type === 'osc' ? 'bg-red-100' : 'bg-blue-100'
                    }`}
                  >
                    {partner.type === 'osc' ? (
                      <Heart size={24} className="text-red-600" />
                    ) : (
                      <Building size={24} className="text-blue-600" />
                    )}
                  </div>
                )}

                {/* Upload overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <label htmlFor="partner-logo-upload" className="cursor-pointer">
                    {uploadingLogo ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <Camera size={20} className="text-white" />
                    )}
                  </label>
                  <input
                    id="partner-logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">{partner.name}</h2>
                <div className="flex gap-2 mt-1">
                  <Badge className={stage?.color ?? 'bg-gray-100 text-gray-800'}>
                    {/* stage.icon é provavelmente um elemento JSX pronto */}
                    {stage?.icon ? <span className="mr-1 inline-flex">{stage.icon}</span> : null}
                    {stage?.label ?? partner.stage}
                  </Badge>
                  <Badge className={program?.color ?? 'bg-gray-100 text-gray-800'}>
                    {program?.label ?? partner.program}
                  </Badge>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              {partner.bandeira} • {partner.regional}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="interactions">Timeline</TabsTrigger>
              <TabsTrigger value="nfs">Notas Fiscais</TabsTrigger>
              <TabsTrigger value="reports">Relatórios</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Contacts */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Contatos</h3>
                  {partner.contacts.map((contact, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium text-gray-900">{contact.name}</p>
                      <p className="text-sm text-gray-600 mb-2">{contact.role}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <a
                          href={`tel:${contact.phone}`}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                        >
                          <Phone size={14} />
                          {contact.phone}
                        </a>
                        <a
                          href={`mailto:${contact.email}`}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                        >
                          <Mail size={14} />
                          {contact.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Schedule & Metrics */}
                <div className="space-y-4">
                  {p.schedule && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Agenda de Coleta</h3>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={16} className="text-blue-600" />
                          <span className="font-medium text-blue-900">
                            Frequência: {p.schedule.frequency}
                          </span>
                        </div>
                        <p className="text-sm text-blue-700">
                          Próxima coleta:{' '}
                          {new Date(p.schedule.nextCollection).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  )}

                  {partner.lastDonation && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Última Doação</h3>
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-green-700">
                            {partner.lastDonation.amount.toLocaleString()} {partner.lastDonation.unit}
                          </span>
                          <span className="text-sm text-green-600">
                            {new Date(partner.lastDonation.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="interactions" className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Timeline de Interações</h3>
                <Button size="sm" onClick={() => setIsNovaInteracaoModalOpen(true)}>
                  <Plus size={16} className="mr-2" />
                  Nova Interação
                </Button>
              </div>

              <div className="space-y-4">
                {partner.interactions.map((interaction) => (
                  <div key={interaction.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        {interaction.type === 'ligacao' && (
                          <Phone size={14} className="text-blue-600" />
                        )}
                        {interaction.type === 'whatsapp' && (
                          <MessageSquare size={14} className="text-green-600" />
                        )}
                        {interaction.type === 'email' && (
                          <Mail size={14} className="text-purple-600" />
                        )}
                        {interaction.type === 'visita' && (
                          <Clock size={14} className="text-orange-600" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 capitalize">{interaction.type}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(interaction.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{interaction.description}</p>
                      <p className="text-xs text-gray-500 mt-1">Por: {interaction.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nfs" className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Notas Fiscais</h3>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  <Upload size={16} className="mr-2" />
                  Upload NF
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Número</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Data</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">CFOP</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Valor</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partner.nfs.map((nf) => (
                      <tr key={nf.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-sm text-gray-900">{nf.id}</td>
                        <td className="py-3 px-4 text-sm text-gray-700">
                          {new Date(nf.date).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-700">{nf.cfop}</td>
                        <td className="py-3 px-4 text-sm text-gray-700">R$ {nf.value.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary">{nf.status}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">
                            <ExternalLink size={14} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="mt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Relatórios do Programa</h3>
                  <Button variant="outline" size="sm">
                    <BarChart3 size={16} className="mr-2" />
                    Exportar Dados
                  </Button>
                </div>

                {/* Métricas principais */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Total Arrecadado</h4>
                    <p className="text-2xl font-bold text-blue-700">2.450 kg</p>
                    <p className="text-sm text-blue-600">Últimos 30 dias</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2">Coletas Realizadas</h4>
                    <p className="text-2xl font-bold text-green-700">12</p>
                    <p className="text-sm text-green-600">Este mês</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h4 className="font-medium text-orange-900 mb-2">Economia Gerada</h4>
                    <p className="text-2xl font-bold text-orange-700">R$ 8.750</p>
                    <p className="text-sm text-orange-600">Valor estimado</p>
                  </div>
                </div>

                {/* Gráfico de performance (placeholder) */}
                <div className="bg-white border rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Performance Mensal</h4>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <BarChart3 size={48} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-500 font-medium">Gráfico de Performance</p>
                      <p className="text-sm text-gray-400">Dados de arrecadação e impacto social</p>
                    </div>
                  </div>
                </div>

                {/* Relatórios detalhados */}
                <div className="bg-white border rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Relatórios Detalhados</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Relatório de Impacto Social</p>
                        <p className="text-sm text-gray-600">Análise completa do programa</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <FileText size={16} className="mr-2" />
                        Visualizar
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Dashboard Operacional</p>
                        <p className="text-sm text-gray-600">Métricas de coleta e distribuição</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <BarChart3 size={16} className="mr-2" />
                        Abrir Dashboard
                      </Button>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-6">Dashboards integrados com métricas de performance</p>

                <div className="bg-gray-100 rounded-lg p-8 border-2 border-dashed border-gray-300">
                  <p className="text-gray-500">[Power BI Embed será carregado aqui]</p>
                  <Button className="mt-4" variant="outline">
                    <ExternalLink size={16} className="mr-2" />
                    Abrir no Power BI
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Nova Interação Modal */}
        {isNovaInteracaoModalOpen && (
          <NovaInteracaoModal
            partner={partner!}
            isOpen={isNovaInteracaoModalOpen}
            onClose={() => setIsNovaInteracaoModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
