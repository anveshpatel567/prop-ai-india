
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import MyAiUsagePage from './pages/my-ai-usage';
import AiToolsIndex from './pages/ai/index';
import AiPricingPage from './pages/tools/ai-pricing';
import AiVideoPage from './pages/tools/ai-video';
import LocalityReportPage from './pages/tools/locality-report';
import LoanOptimizerPage from './pages/tools/loan-optimizer';
import SeoSchemaPage from './pages/tools/seo-schema';
import AiFraudDetectionPage from './pages/tools/ai-fraud-detection';
import BrochureMatcherPage from './pages/tools/brochure-matcher';
import TitleChainPage from './pages/tools/title-chain';
import AdminDashboard from './pages/admin/index';
import AdminToolsOverviewPage from './pages/admin/tools-overview';
import AdminUsageMetricsPage from './pages/admin/usage-metrics';
import LaunchChecklistPage from './pages/admin/launch-checklist';
import AiToolHealthPage from './pages/admin/ai-tool-health';
import CardsTestPage from './pages/test/cards';
import ButtonsTestPage from './pages/test/buttons';
import ModalsTestPage from './pages/test/modals';
import AiPanelsTestPage from './pages/test/ai-panels';
import DevToolsPage from './pages/devtools';
import AgentResumePage from './pages/agent/resume';
import SeekerAgentMatchPage from './pages/seeker/agent-match';
import SeekerSmartMatchesPage from './pages/seeker/smart-matches';
import SearchPage from './pages/search';
import ListPropertyPage from './pages/list-property';
import CreateListingPage from './pages/listing/create';
import AllListingsPage from './pages/listing/all';
import ComparePage from './pages/compare';
import NotFound from './pages/404';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-ai-usage" element={<MyAiUsagePage />} />
      
      {/* AI Tools */}
      <Route path="/ai" element={<AiToolsIndex />} />
      <Route path="/tools/ai-pricing" element={<AiPricingPage />} />
      <Route path="/tools/ai-video" element={<AiVideoPage />} />
      <Route path="/tools/locality-report" element={<LocalityReportPage />} />
      <Route path="/tools/loan-optimizer" element={<LoanOptimizerPage />} />
      <Route path="/tools/seo-schema" element={<SeoSchemaPage />} />
      <Route path="/tools/ai-fraud-detection" element={<AiFraudDetectionPage />} />
      <Route path="/tools/brochure-matcher" element={<BrochureMatcherPage />} />
      <Route path="/tools/title-chain" element={<TitleChainPage />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/tools-overview" element={<AdminToolsOverviewPage />} />
      <Route path="/admin/usage-metrics" element={<AdminUsageMetricsPage />} />
      <Route path="/admin/launch-checklist" element={<LaunchChecklistPage />} />
      <Route path="/admin/ai-tool-health" element={<AiToolHealthPage />} />
      
      {/* Test Routes */}
      <Route path="/test/cards" element={<CardsTestPage />} />
      <Route path="/test/buttons" element={<ButtonsTestPage />} />
      <Route path="/test/modals" element={<ModalsTestPage />} />
      <Route path="/test/ai-panels" element={<AiPanelsTestPage />} />
      <Route path="/devtools" element={<DevToolsPage />} />
      
      {/* Agent Routes */}
      <Route path="/agent/resume" element={<AgentResumePage />} />
      
      {/* Seeker Routes */}
      <Route path="/seeker/agent-match" element={<SeekerAgentMatchPage />} />
      <Route path="/seeker/smart-matches" element={<SeekerSmartMatchesPage />} />
      
      {/* Property Routes */}
      <Route path="/search" element={<SearchPage />} />
      <Route path="/list-property" element={<ListPropertyPage />} />
      <Route path="/listing/create" element={<CreateListingPage />} />
      <Route path="/listing/all" element={<AllListingsPage />} />
      <Route path="/compare" element={<ComparePage />} />
      
      {/* Catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
