'use client';

import { Sidebar } from '@/components/Sidebar';
import { PlanejamentoAgenda } from '@/components/PlanejamentoAgenda';

export default function PlanejamentoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <PlanejamentoAgenda />
    </div>
  );
}