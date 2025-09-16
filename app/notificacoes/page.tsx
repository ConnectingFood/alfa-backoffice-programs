'use client';

import { Sidebar } from '@/components/Sidebar';
import { NotificacoesList } from '@/components/NotificacoesList';

export default function NotificacoesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <NotificacoesList />
    </div>
  );
}