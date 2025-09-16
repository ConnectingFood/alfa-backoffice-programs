'use client';

import { Sidebar } from '@/components/Sidebar';
import { NFsList } from '@/components/NFsList';

export default function NFsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <NFsList />
    </div>
  );
}