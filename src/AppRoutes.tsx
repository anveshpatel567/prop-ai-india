
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/index';
import Auth from '@/pages/auth';
import Dashboard from '@/pages/dashboard/index';
import NotFound from '@/pages/NotFound';
import Compare from '@/pages/compare';
import Profile from '@/pages/profile';
import Search from '@/pages/search';
import ListProperty from '@/pages/list-property';
import AllListings from '@/pages/listing/all';
import CreateListing from '@/pages/listing/create';
import LoanOptimizer from '@/pages/tools/loan-optimizer';
import LocalityReport from '@/pages/tools/locality-report';
import SeoSchema from '@/pages/tools/seo-schema';
import TitleChain from '@/pages/tools/title-chain';
import AgentMatch from '@/pages/seeker/agent-match';
import SmartMatches from '@/pages/seeker/smart-matches';
import AgentResume from '@/pages/agent/resume';
import AiTools from '@/pages/ai/index';
import AdminIndex from '@/pages/admin/index';
import AdminAnalytics from '@/pages/admin/analytics';
import AdminCampaignInsights from '@/pages/admin/campaign-insights';
import AdminCreditPacks from '@/pages/admin/credit-packs';
import AdminListingOffers from '@/pages/admin/listing-offers';
import AdminPropertyMatches from '@/pages/admin/property-matches';
import AdminDeveloperAiSummary from '@/pages/admin/developer-ai-summary';
import AdminAiInsights from '@/pages/admin/ai-insights';
import AiOversightPage from '@/pages/admin/ai-oversight/index';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/search" element={<Search />} />
      <Route path="/list-property" element={<ListProperty />} />
      <Route path="/listing/all" element={<AllListings />} />
      <Route path="/listing/create" element={<CreateListing />} />
      <Route path="/tools/loan-optimizer" element={<LoanOptimizer />} />
      <Route path="/tools/locality-report" element={<LocalityReport />} />
      <Route path="/tools/seo-schema" element={<SeoSchema />} />
      <Route path="/tools/title-chain" element={<TitleChain />} />
      <Route path="/seeker/agent-match" element={<AgentMatch />} />
      <Route path="/seeker/smart-matches" element={<SmartMatches />} />
      <Route path="/agent/resume" element={<AgentResume />} />
      <Route path="/ai" element={<AiTools />} />
      <Route path="/admin" element={<AdminIndex />} />
      <Route path="/admin/analytics" element={<AdminAnalytics />} />
      <Route path="/admin/campaign-insights" element={<AdminCampaignInsights />} />
      <Route path="/admin/credit-packs" element={<AdminCreditPacks />} />
      <Route path="/admin/listing-offers" element={<AdminListingOffers />} />
      <Route path="/admin/property-matches" element={<AdminPropertyMatches />} />
      <Route path="/admin/developer-ai-summary" element={<AdminDeveloperAiSummary />} />
      <Route path="/admin/ai-insights" element={<AdminAiInsights />} />
      <Route path="/admin/ai-oversight" element={<AiOversightPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
