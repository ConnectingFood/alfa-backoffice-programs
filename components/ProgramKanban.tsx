'use client';

import { useState } from 'react';
import { Program, Partner, ProgramKanbanProps } from '@/types';
import { ArrowLeft, Plus, Filter, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProgramColumn } from './ProgramColumn';
import { PartnerModal } from './PartnerModal';
import { programConfig } from '@/lib/data';

export function ProgramKanban({ program, partners, onBack, onPartnerClick }: ProgramKanbanProps) {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'lojas' | 'oscs'>('lojas');

  const programType = programConfig[program.type];
  
  // Filter partners by program
  const programPartners = partners.filter(p => p.program === program.type);
  
  // Filter OSCs and Lojas separately
  const oscPartners = programPartners.filter(p => p.type === 'osc');
  const lojaPartners = programPartners.filter(p => p.type === 'loja');

  // Get partners for current active section
  const currentPartners = activeSection === 'lojas' ? lojaPartners : oscPartners;
  
  const ativoPartners = currentPartners.filter(p => p.stage === 'ativo');
  const verificarPartners = currentPartners.filter(p => p.stage === 'verificar');
  const inativoPartners = currentPartners.filter(p => p.stage === 'inativo');
  const encerradaPartners = currentPartners.filter(p => p.stage === 'encerrada');
  const backlogPartners = currentPartners.filter(p => p.stage === 'backlog');

  const handlePartnerClick = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsPartnerModalOpen(true);
    onPartnerClick(partner);
  };

  const handleClosePartnerModal = () => {
    setIsPartnerModalOpen(false);
    setSelectedPartner(null);
  };

  return (
    <div className="ml-72">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft size={16} className="mr-2" />
              Voltar
            </Button>
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <h1 className="text-xl font-bold text-gray-900">{program.name}</h1>
                <Badge className={programType.color}>
                  {programType.label}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1 max-w-2xl">{program.description}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Filtros */}
            <div className="flex items-center space-x-2 flex-wrap">
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Bandeira" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="extra">Extra</SelectItem>
                  <SelectItem value="pao-de-acucar">Pão de Açúcar</SelectItem>
                  <SelectItem value="assai">Assaí</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Regional" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="sao-paulo">São Paulo</SelectItem>
                  <SelectItem value="rio-janeiro">Rio de Janeiro</SelectItem>
                  <SelectItem value="minas-gerais">Minas Gerais</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Calendar size={16} className="mr-2" />
                Período
              </Button>

              <Button variant="outline" size="sm">
                <Filter size={16} className="mr-2" />
                Filtros
              </Button>
            </div>

            {/* Nova Loja */}
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => {/* Implementar navegação para lojas */}}
              >
                Lojas
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Plus size={16} className="mr-2" />
                Nova Loja
              </Button>
            </div>
          </div>
        </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-gray-900">{lojaPartners.length}</p>
          <p className="text-xs text-gray-500">Total de Lojas</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-green-600">{lojaPartners.filter(p => p.stage === 'ativo').length}</p>
          <p className="text-xs text-green-600">Lojas Ativas</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-orange-600">{oscPartners.length}</p>
          <p className="text-xs text-orange-600">Total de OSCs</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-blue-600">
            {program.totalDonations.amount.toLocaleString()} {program.totalDonations.unit}
          </p>
          <p className="text-xs text-blue-600">Total Arrecadado</p>
        </div>
      </div>
    </div>

      {/* Kanban Board */}
      <div className="p-6">
        {/* Section Toggle */}
        <div className="mb-6">
          <div className="flex bg-gray-100 rounded-lg p-1 w-fit">
            <button
              onClick={() => setActiveSection('lojas')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === 'lojas'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Lojas ({lojaPartners.length})
            </button>
            <button
              onClick={() => setActiveSection('oscs')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === 'oscs'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              OSCs ({oscPartners.length})
            </button>
          </div>
        </div>

        {/* Kanban Columns */}
        <div className="flex gap-6 h-full overflow-x-auto">
          <ProgramColumn 
            stage="ativo" 
            partners={ativoPartners}
            onPartnerClick={handlePartnerClick}
          />
          <ProgramColumn 
            stage="verificar" 
            partners={verificarPartners}
            onPartnerClick={handlePartnerClick}
          />
          <ProgramColumn 
            stage="inativo" 
            partners={inativoPartners}
            onPartnerClick={handlePartnerClick}
          />
          <ProgramColumn 
            stage="encerrada" 
            partners={encerradaPartners}
            onPartnerClick={handlePartnerClick}
          />
          <ProgramColumn 
            stage="backlog" 
            partners={backlogPartners}
            onPartnerClick={handlePartnerClick}
          />
        </div>
      </div>

      {/* Partner Modal */}
      <PartnerModal 
        partner={selectedPartner}
        isOpen={isPartnerModalOpen}
        onClose={handleClosePartnerModal}
      />
    </div>
  );
}