
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { AdminDashboardHeader } from '@/components/admin/AdminDashboardHeader';
import { UserManagementSection } from '@/components/admin/UserManagementSection';
import { CreditManagementSection } from '@/components/admin/CreditManagementSection';
import { AiInsightsSection } from '@/components/admin/AiInsightsSection';
import { AdminPanelsGrid } from '@/components/admin/AdminPanelsGrid';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <AdminDashboardHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <UserManagementSection />
          <CreditManagementSection />
        </div>

        <AdminPanelsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AiInsightsSection />
        </div>
      </div>
    </div>
  );
}
