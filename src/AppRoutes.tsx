
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import Index from './pages/index';
import Search from './pages/search';
import ListProperty from './pages/list-property';
import CreateListing from './pages/listing/create';
import AiTools from './pages/ai/index';
import SeoPreview from './pages/admin/seo-preview';
import AiEngagement from './pages/admin/ai-engagement';
import CommunityIndex from './pages/community/index';
import Login from './pages/login';
import NotFound from './pages/404';
import DevtoolsGpt from './pages/devtools/gpt';

// Wrapper component for pages with error boundaries
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ErrorBoundary>
    {children}
  </ErrorBoundary>
);

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
      <Route path="/search" element={<PageWrapper><Search /></PageWrapper>} />
      <Route path="/list-property" element={<PageWrapper><ListProperty /></PageWrapper>} />
      <Route path="/listing/create" element={<PageWrapper><CreateListing /></PageWrapper>} />
      <Route path="/ai" element={<PageWrapper><AiTools /></PageWrapper>} />
      <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
      <Route path="/admin/seo-preview" element={<PageWrapper><SeoPreview /></PageWrapper>} />
      <Route path="/admin/ai-engagement" element={<PageWrapper><AiEngagement /></PageWrapper>} />
      <Route path="/community" element={<PageWrapper><CommunityIndex /></PageWrapper>} />
      <Route path="/devtools/gpt" element={<PageWrapper><DevtoolsGpt /></PageWrapper>} />
      <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
    </Routes>
  );
};
