
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/index';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard/index';
import ListProperty from './pages/list-property';
import Search from './pages/search';
import Compare from './pages/compare';
import AiTools from './pages/ai/index';
import Admin from './pages/admin/index';
import NotFound from './pages/NotFound';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/list-property" element={<ListProperty />} />
      <Route path="/search" element={<Search />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="/ai" element={<AiTools />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
