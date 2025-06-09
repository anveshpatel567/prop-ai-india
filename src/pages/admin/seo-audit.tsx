
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SeoAuditPanel } from '@/components/admin/SeoAuditPanel';
import { SitemapRenderer } from '@/components/seo/SitemapRenderer';
import { GoBackHomeButton } from '@/components/ui/GoBackHomeButton';

const SeoAuditPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">SEO Management</h1>
            <p className="text-gray-600">Manage SEO metadata and generate sitemaps</p>
          </div>
          <GoBackHomeButton />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <SeoAuditPanel />
          <SitemapRenderer />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SeoAuditPage;
