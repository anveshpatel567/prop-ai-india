
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import { AiToolProvider } from './context/AiToolContext';
import Index from "./pages/index";
import Auth from "./pages/auth";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard/index";
import ListProperty from "./pages/list-property";
import CreateListing from "./pages/listing/create";
import AllListings from "./pages/listing/all";
import Search from "./pages/search";
import Compare from "./pages/compare";
import AiTools from "./pages/ai/index";
import Admin from "./pages/admin/index";
import AdminAnalytics from "./pages/admin/analytics";
import DeveloperAiSummary from "./pages/admin/developer-ai-summary";
import CreditPacks from "./pages/admin/credit-packs";
import ListingOffers from "./pages/admin/listing-offers";
import NotFound from "./pages/404";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <WalletProvider>
          <AiToolProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/list-property" element={<ListProperty />} />
                <Route path="/listing/create" element={<CreateListing />} />
                <Route path="/listing/all" element={<AllListings />} />
                <Route path="/search" element={<Search />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/ai" element={<AiTools />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/analytics" element={<AdminAnalytics />} />
                <Route path="/admin/developer-ai-summary" element={<DeveloperAiSummary />} />
                <Route path="/admin/credit-packs" element={<CreditPacks />} />
                <Route path="/admin/listing-offers" element={<ListingOffers />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AiToolProvider>
        </WalletProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
