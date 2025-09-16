'use client';

import { Sidebar } from '@/components/Sidebar';
import { RelatoriosDashboard } from '@/components/RelatoriosDashboard';

export default function RelatoriosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <RelatoriosDashboard />
    </div>
  );
}