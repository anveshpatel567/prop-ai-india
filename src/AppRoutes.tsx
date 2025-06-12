
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home'));
const Auth = lazy(() => import('./pages/Auth'));
const ListProperty = lazy(() => import('./pages/list-property'));
const CreateListing = lazy(() => import('./pages/listing/create'));
const PropertyDetail = lazy(() => import('./pages/property/[id]'));
const Search = lazy(() => import('./pages/Search'));
const Wallet = lazy(() => import('./pages/Wallet'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AiTools = lazy(() => import('./pages/AiTools'));
const MyAiUsage = lazy(() => import('./pages/MyAiUsage'));
const GptApiTester = lazy(() => import('./pages/devtools/GptApiTester'));
const QaTools = lazy(() => import('./pages/QaTools'));
const Pricing = lazy(() => import('./pages/Pricing'));

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
