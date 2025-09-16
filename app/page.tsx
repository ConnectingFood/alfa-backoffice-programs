'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ProgramsList } from '@/components/ProgramsList';
import { ProgramKanban } from '@/components/ProgramKanban';
import { MonitoramentoDashboard } from '@/components/MonitoramentoDashboard';
import { PartnerModal } from '@/components/PartnerModal';
import { NewProgramModal } from '@/components/NewProgramModal';
import { mockPartners, mockPrograms } from '@/lib/data';
import { Partner, Program } from '@/types';

export default function Home() {
  const [currentView, setCurrentView] = useState<'list' | 'kanban' | 'monitoramento'>('list');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isNewProgramModalOpen, setIsNewProgramModalOpen] = useState(false);

  const handleProgramClick = (program: Program) => {
    setSelectedProgram(program);
    setCurrentView('kanban');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedProgram(null);
  };

  const handlePartnerClick = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsPartnerModalOpen(true);
  };

  const handleClosePartnerModal = () => {
    setIsPartnerModalOpen(false);
    setSelectedPartner(null);
  };

  const handleNewProgram = () => {
    setIsNewProgramModalOpen(true);
  };

  const handleMonitoramento = (program: Program) => {
    setSelectedProgram(program);
    setCurrentView('monitoramento');
  };
  const handleCloseNewProgramModal = () => {
    setIsNewProgramModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      {currentView === 'list' ? (
        <ProgramsList 
          programs={mockPrograms}
          onProgramClick={handleProgramClick}
          onNewProgram={handleNewProgram}
          onMonitoramento={handleMonitoramento}
        />
      ) : currentView === 'kanban' ? (
        selectedProgram && (
          <ProgramKanban 
            program={selectedProgram}
            partners={mockPartners}
            onBack={handleBackToList}
            onPartnerClick={handlePartnerClick}
          />
        )
      ) : currentView === 'monitoramento' ? (
        selectedProgram && (
          <MonitoramentoDashboard 
            program={selectedProgram}
            onBack={handleBackToList}
          />
        )
      ) : null}
      
      <PartnerModal 
        partner={selectedPartner}
        isOpen={isPartnerModalOpen}
        onClose={handleClosePartnerModal}
      />
      
      <NewProgramModal 
        isOpen={isNewProgramModalOpen}
        onClose={handleCloseNewProgramModal}
      />
    </div>
  );
}