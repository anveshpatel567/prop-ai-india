
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components for better performance
const Home = lazy(() => import('./pages/home'));
const Auth = lazy(() => import('./pages/auth'));
const ListProperty = lazy(() => import('./pages/list-property'));
const CreateListing = lazy(() => import('./pages/listing/create'));
const PropertyDetail = lazy(() => import('./pages/property/[id]'));
const Search = lazy(() => import('./pages/search'));
const Wallet = lazy(() => import('./pages/wallet'));
const AdminDashboard = lazy(() => import('./pages/admin/index'));
const AiTools = lazy(() => import('./pages/ai/index'));
const MyAiUsage = lazy(() => import('./pages/my-ai-usage'));
const GptApiTester = lazy(() => import('./pages/devtools/gpt'));
const QaTools = lazy(() => import('./pages/admin/qa-tools'));
const Pricing = lazy(() => import('./pages/pricing'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/list-property" element={<ListProperty />} />
        <Route path="/listing/create" element={<CreateListing />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/ai" element={<AiTools />} />
        <Route path="/my-ai-usage" element={<MyAiUsage />} />
        <Route path="/devtools/gpt" element={<GptApiTester />} />
        <Route path="/qa-tools" element={<QaTools />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
