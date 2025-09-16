'use client';

import { Sidebar } from '@/components/Sidebar';
import { LojasList } from '@/components/LojasList';

export default function LojasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <LojasList />
    </div>
  );
}