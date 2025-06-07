
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';

// Pages
import HomePage from '@/pages/index';
import AuthPage from '@/pages/auth';
import LoginPage from '@/pages/login';
import RegisterPage from '@/pages/register';
import DashboardPage from '@/pages/dashboard/index';
import ProfilePage from '@/pages/profile';
import ListPropertyPage from '@/pages/list-property';
import ListingCreatePage from '@/pages/listing/create';
import AllListingsPage from '@/pages/listing/all';
import SearchPage from '@/pages/search';
import ComparePage from '@/pages/compare';
import NotFoundPage from '@/pages/NotFound';

// AI Tools
import AiToolsPage from '@/pages/ai/index';
import MyAiUsagePage from '@/pages/my-ai-usage';
import LoanOptimizerPage from '@/pages/tools/loan-optimizer';
import LocalityReportPage from '@/pages/tools/locality-report';
import SeoSchemaPage from '@/pages/tools/seo-schema';
import TitleChainPage from '@/pages/tools/title-chain';

// Seeker Tools
import AgentMatchPage from '@/pages/seeker/agent-match';
import SmartMatchesPage from '@/pages/seeker/smart-matches';

// Agent Tools
import AgentResumePage from '@/pages/agent/resume';

// Admin Pages
import AdminIndexPage from '@/pages/admin/index';
import AdminAnalyticsPage from '@/pages/admin/analytics';
import AdminAiInsightsPage from '@/pages/admin/ai-insights';
import AdminAiOversightPage from '@/pages/admin/ai-oversight/index';
import AdminCampaignInsightsPage from '@/pages/admin/campaign-insights';
import AdminCreditPacksPage from '@/pages/admin/credit-packs';
import AdminListingOffersPage from '@/pages/admin/listing-offers';
import AdminPropertyMatchesPage from '@/pages/admin/property-matches';
import AdminDeveloperAiSummaryPage from '@/pages/admin/developer-ai-summary';
import AdminQAToolsPage from '@/pages/admin/qa-tools';

export const AppRoutes: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/listing/all" element={<AllListingsPage />} />
          <Route path="/compare" element={<ComparePage />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/list-property" element={<ListPropertyPage />} />
          <Route path="/listing/create" element={<ListingCreatePage />} />

          {/* AI Tools */}
          <Route path="/ai" element={<AiToolsPage />} />
          <Route path="/my-ai-usage" element={<MyAiUsagePage />} />
          <Route path="/tools/loan-optimizer" element={<LoanOptimizerPage />} />
          <Route path="/tools/locality-report" element={<LocalityReportPage />} />
          <Route path="/tools/seo-schema" element={<SeoSchemaPage />} />
          <Route path="/tools/title-chain" element={<TitleChainPage />} />

          {/* Seeker Tools */}
          <Route path="/seeker/agent-match" element={<AgentMatchPage />} />
          <Route path="/seeker/smart-matches" element={<SmartMatchesPage />} />

          {/* Agent Tools */}
          <Route path="/agent/resume" element={<AgentResumePage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminIndexPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/admin/ai-insights" element={<AdminAiInsightsPage />} />
          <Route path="/admin/ai-oversight" element={<AdminAiOversightPage />} />
          <Route path="/admin/qa-tools" element={<AdminQAToolsPage />} />
          <Route path="/admin/campaign-insights" element={<AdminCampaignInsightsPage />} />
          <Route path="/admin/credit-packs" element={<AdminCreditPacksPage />} />
          <Route path="/admin/listing-offers" element={<AdminListingOffersPage />} />
          <Route path="/admin/property-matches" element={<AdminPropertyMatchesPage />} />
          <Route path="/admin/developer-ai-summary" element={<AdminDeveloperAiSummaryPage />} />

          {/* Catch all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};
