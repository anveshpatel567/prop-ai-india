
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ProviderTreeWrapper } from '@/context/ProviderTreeWrapper';
import { DevStatusOverlay } from '@/components/common/DevStatusOverlay';

// Pages
import Home from '@/pages/home';
import About from '@/pages/about';
import Contact from '@/pages/contact';
import AuthPage from '@/pages/auth';
import WalletPage from '@/pages/wallet';
import WalletHistory from '@/pages/wallet/history';
import CreateListing from '@/pages/listing/create';
import CrmPage from '@/pages/crm';
import AgentDashboard from '@/pages/agent/dashboard';
import DevStatus from '@/pages/dev/status';
import DevtoolsPage from '@/pages/devtools';
import DevtoolsGpt from '@/pages/devtools/gpt';
import Profile from '@/pages/profile';
import Login from '@/pages/login';
import Dashboard from '@/pages/dashboard/index';

// AI Tools Pages
import AiPricingPage from '@/pages/tools/ai-pricing';
import AiVideoPage from '@/pages/tools/ai-video';
import BrochureMatcherPage from '@/pages/tools/brochure-matcher';
import AiFraudDetectionPage from '@/pages/tools/ai-fraud-detection';
import TitleChainPage from '@/pages/tools/title-chain';

function App() {
  return (
    <ProviderTreeWrapper>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/wallet/history" element={<WalletHistory />} />
            <Route path="/listing/create" element={<CreateListing />} />
            <Route path="/crm" element={<CrmPage />} />
            <Route path="/agent/dashboard" element={<AgentDashboard />} />
            <Route path="/dev/status" element={<DevStatus />} />
            <Route path="/devtools" element={<DevtoolsPage />} />
            <Route path="/devtools/gpt" element={<DevtoolsGpt />} />
            
            {/* AI Tools Routes */}
            <Route path="/tools/ai-pricing" element={<AiPricingPage />} />
            <Route path="/tools/ai-video" element={<AiVideoPage />} />
            <Route path="/tools/brochure-matcher" element={<BrochureMatcherPage />} />
            <Route path="/tools/ai-fraud-detection" element={<AiFraudDetectionPage />} />
            <Route path="/tools/title-chain" element={<TitleChainPage />} />
          </Routes>
          
          <DevStatusOverlay />
          <Toaster />
        </div>
      </Router>
    </ProviderTreeWrapper>
  );
}

export default App;
