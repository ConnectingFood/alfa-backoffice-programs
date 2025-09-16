'use client';

import { useState } from 'react';
import { oscStatusConfig, confiancaConfig } from '@/lib/data';
import { Search, Filter, Eye, Plus, Link, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { OSCModal } from './OSCModal';
import { ParceriasModal } from './ParceriasModal';
import { NovaOSCModal } from './NovaOSCModal';
import { OSC } from '@/types';

/* ===== Tipos auxiliares (derivados dos configs e do domínio) ===== */
type OSCStatus = keyof typeof oscStatusConfig;             // ex.: 'ativo' | 'verificar' | 'inativo' | 'backlog'
type ConfiancaKey = keyof typeof confiancaConfig;          // conforme seu arquivo de dados
type OSCTipo = 'normal' | 'natal_solidariedade';           // ajuste se houver outros

interface OSCsListProps {
  oscs: OSC[];
}

export function OSCsList({ oscs }: OSCsListProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | OSCStatus>('all');
  const [tipoFilter, setTipoFilter] = useState<'all' | OSCTipo>('all');
  const [selectedOSC, setSelectedOSC] = useState<OSC | null>(null);
  const [isOSCModalOpen, setIsOSCModalOpen] = useState<boolean>(false);
  // importante: usar undefined no estado e coalescer na prop
  const [parceriasOSC, setParceriasOSC] = useState<OSC | undefined>(undefined);
  const [isParceriasModalOpen, setIsParceriasModalOpen] = useState<boolean>(false);
  const [isNovaOSCModalOpen, setIsNovaOSCModalOpen] = useState<boolean>(false);

  const filteredOSCs = oscs.filter((osc: OSC) => {
    const matchesSearch =
      osc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      osc.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || (osc.status as OSCStatus) === statusFilter;

    const matchesTipo =
      tipoFilter === 'all' || (osc.tipo as OSCTipo) === tipoFilter;

    return matchesSearch && matchesStatus && matchesTipo;
  });

  const handleVerOSC = (osc: OSC) => {
    setSelectedOSC(osc);
    setIsOSCModalOpen(true);
  };

  const handleParcerias = (osc: OSC) => {
    setParceriasOSC(osc);
    setIsParceriasModalOpen(true);
  };

  const handleNovaOSC = () => {
    setIsNovaOSCModalOpen(true);
  };

  return (
    <TooltipProvider>
      <div className="ml-72 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">OSCs</h1>
            <p className="text-sm text-gray-500">Gestão de Organizações da Sociedade Civil</p>
          </div>
          <Button onClick={handleNovaOSC} className="bg-orange-600 hover:bg-orange-700">
            <Plus size={16} className="mr-2" />
            Nova OSC
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filtros:</span>
            </div>

            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  placeholder="Buscar por nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as 'all' | OSCStatus)}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Todos os Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="verificar">Verificar</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
                <SelectItem value="backlog">Backlog</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={tipoFilter}
              onValueChange={(v) => setTipoFilter(v as 'all' | OSCTipo)}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tipo de OSC" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="natal_solidariedade">Natal Solidariedade</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="overflow-x-auto max-h-[calc(100vh-400px)]">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">OSC</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">CNPJ</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">STATUS</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">ARRECADADO (KG)</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">Nº LOJAS</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">CONFIANÇA</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">ÚLTIMA COLETA</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">CADASTRO ATUALIZADO EM</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {filteredOSCs.map((osc: OSC, index: number) => {
                  const statusKey = osc.status as OSCStatus;
                  const confiancaKey = osc.confianca as ConfiancaKey;

                  const statusConfig = oscStatusConfig[statusKey];
                  const confiancaConf = confiancaConfig[confiancaKey];

                  return (
                    <tr
                      key={osc.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900 text-sm">{osc.name}</p>
                            {osc.tipo === 'natal_solidariedade' && (
                              <Badge
                                variant="outline"
                                className="text-xs bg-red-50 text-red-700 border-red-200"
                              >
                                Natal
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">{osc.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">{osc.cnpj}</td>
                      <td className="py-4 px-4">
                        <Badge className={`text-xs ${statusConfig.color}`}>
                          {statusConfig.label}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700 text-center font-medium">
                        {osc.arrecadado.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700 text-center">
                        {osc.numeroLojas}
                      </td>
                      <td className="py-4 px-4">
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge className={`text-xs ${confiancaConf.color} cursor-help`}>
                              {confiancaConf.label}
                              <Info size={10} className="ml-1" />
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{confiancaConf.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">
                        {osc.ultimaColeta !== '-'
                          ? new Date(osc.ultimaColeta).toLocaleDateString('pt-BR')
                          : '-'}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">
                        {new Date(osc.cadastroAtualizadoEm).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                            onClick={() => handleVerOSC(osc)}
                          >
                            <Eye size={14} className="mr-1" />
                            Ver
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleParcerias(osc)}
                          >
                            <Link size={14} className="mr-1" />
                            Parcerias
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredOSCs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma OSC encontrada</h3>
              <p className="text-gray-500 mb-4">Tente ajustar os filtros ou termos de busca</p>
            </div>
          )}
        </div>

        {/* Results Summary */}
        {filteredOSCs.length > 0 && (
          <div className="mt-4 text-sm text-gray-500">
            Mostrando {filteredOSCs.length} de {oscs.length} OSCs
          </div>
        )}

        {/* Modals */}
        <OSCModal
          osc={selectedOSC}
          isOpen={isOSCModalOpen}
          onClose={() => setIsOSCModalOpen(false)}
        />

        <ParceriasModal
          entity={parceriasOSC ?? undefined}
          type="osc"
          isOpen={isParceriasModalOpen}
          onClose={() => {
            setIsParceriasModalOpen(false);
            setParceriasOSC(undefined);
          }}
        />

        <NovaOSCModal
          isOpen={isNovaOSCModalOpen}
          onClose={() => setIsNovaOSCModalOpen(false)}
        />
      </div>
    </TooltipProvider>
  );
}
