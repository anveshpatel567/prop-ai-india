
import { Helmet } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { Routes, Route } from 'react-router-dom';
import { ProviderTreeWrapper } from '@/context/ProviderTreeWrapper';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { DevStatusOverlay } from '@/components/common/DevStatusOverlay';

// Pages
import Home from '@/pages/index';
import Search from '@/pages/search';
import Profile from '@/pages/profile';
import About from '@/pages/about';
import Contact from '@/pages/contact';
import AuthPage from '@/pages/auth';
import WalletPage from '@/pages/wallet';
import CreateListing from '@/pages/listing/create';

// New routes
import CrmPage from '@/pages/crm';
import AgentDashboard from '@/pages/agent/dashboard';
import WalletHistory from '@/pages/wallet/history';
import DevStatus from '@/pages/dev/status';

const App = () => {
  return (
    <ErrorBoundary>
      <ProviderTreeWrapper>
        <Helmet>
          <title>FreePropList - Find Your Perfect Property</title>
          <meta name="description" content="Search and discover properties with AI-powered tools and smart recommendations" />
        </Helmet>
        
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/wallet/history" element={<WalletHistory />} />
            <Route path="/list-property" element={<CreateListing />} />
            <Route path="/crm" element={<CrmPage />} />
            <Route path="/agent/dashboard" element={<AgentDashboard />} />
            <Route path="/dev/status" element={<DevStatus />} />
          </Routes>
        </div>

        <Toaster />
        <DevStatusOverlay />
      </ProviderTreeWrapper>
    </ErrorBoundary>
  );
};

export default App;
