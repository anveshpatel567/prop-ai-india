
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/index';
import Search from './pages/search';
import ListProperty from './pages/list-property';
import CreateListing from './pages/listing/create';
import AiTools from './pages/ai/index';
import SeoPreview from './pages/admin/seo-preview';
import CommunityIndex from './pages/community/index';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/search" element={<Search />} />
      <Route path="/list-property" element={<ListProperty />} />
      <Route path="/listing/create" element={<CreateListing />} />
      <Route path="/ai" element={<AiTools />} />
      <Route path="/admin/seo-preview" element={<SeoPreview />} />
      <Route path="/community" element={<CommunityIndex />} />
    </Routes>
  );
};
