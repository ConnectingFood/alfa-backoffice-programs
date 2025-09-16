'use client';

import { Sidebar } from '@/components/Sidebar';
import { DashboardOverview } from '@/components/DashboardOverview';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <DashboardOverview />
    </div>
  );
}