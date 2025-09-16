'use client';

import { OSCsList } from '@/components/OSCsList';
import { mockOSCs } from '@/lib/data';
import { Sidebar } from '@/components/Sidebar';

export default function OSCsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <OSCsList oscs={mockOSCs} />
    </div>
  );
}