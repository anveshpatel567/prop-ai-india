
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/index';
import AuthPage from './pages/auth';
import DashboardPage from './pages/dashboard/index';
import ListPropertyPage from './pages/list-property';
import SearchPage from './pages/search';
import ComparePage from './pages/compare';
import ProfilePage from './pages/profile';
import AllListingsPage from './pages/listing/all';
import CreateListingPage from './pages/listing/create';
import AdminPage from './pages/admin/index';
import AdminAnalyticsPage from './pages/admin/analytics';
import AdminCreditPacksPage from './pages/admin/credit-packs';
import AdminCampaignInsightsPage from './pages/admin/campaign-insights';
import AdminListingOffersPage from './pages/admin/listing-offers';
import AdminDeveloperAiSummaryPage from './pages/admin/developer-ai-summary';
import AiToolsPage from './pages/ai/index';
import LoanOptimizerPage from './pages/tools/loan-optimizer';
import AgentResumePage from './pages/agent/resume';
import AgentMatchPage from './pages/seeker/agent-match';
import SeoSchemaPage from './pages/tools/seo-schema';
import LocalityReportPage from './pages/tools/locality-report';
import TitleChainPage from './pages/tools/title-chain';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import { AiToolProvider } from './context/AiToolContext';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <AuthProvider>
      <WalletProvider>
        <AiToolProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/list-property" element={<ListPropertyPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/listing/all" element={<AllListingsPage />} />
                <Route path="/listing/create" element={<CreateListingPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
                <Route path="/admin/credit-packs" element={<AdminCreditPacksPage />} />
                <Route path="/admin/campaign-insights" element={<AdminCampaignInsightsPage />} />
                <Route path="/admin/listing-offers" element={<AdminListingOffersPage />} />
                <Route path="/admin/developer-ai-summary" element={<AdminDeveloperAiSummaryPage />} />
                <Route path="/ai" element={<AiToolsPage />} />
                <Route path="/tools/loan-optimizer" element={<LoanOptimizerPage />} />
                <Route path="/agent/resume" element={<AgentResumePage />} />
                <Route path="/seeker/agent-match" element={<AgentMatchPage />} />
                <Route path="/tools/seo-schema" element={<SeoSchemaPage />} />
                <Route path="/tools/locality-report" element={<LocalityReportPage />} />
                <Route path="/tools/title-chain" element={<TitleChainPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </AiToolProvider>
      </WalletProvider>
    </AuthProvider>
  );
}

export default App;
