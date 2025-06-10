
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWallet } from '@/context/WalletContext';
import { Zap, CreditCard, History } from 'lucide-react';
import { Link } from 'react-router-dom';

const WalletPage: React.FC = () => {
  const { balance } = useWallet();

  const creditPacks = [
    { credits: 250, price: 250, popular: false },
    { credits: 500, price: 450, popular: true },
    { credits: 1000, price: 800, popular: false },
    { credits: 2500, price: 1875, popular: false },
  ];

  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Wallet</h1>
          <p className="text-gray-600">Manage your AI credits and payments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Current Balance</p>
                  <p className="text-2xl font-bold">{balance?.balance || 0} credits</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Link to="/wallet/history">
                <Button variant="outline" className="w-full">
                  <History className="h-4 w-4 mr-2" />
                  View History
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Exchange Rate</p>
                <p className="text-lg font-semibold">₹1 = 1 Credit</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Buy Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {creditPacks.map((pack) => (
                <div key={pack.credits} className={`border rounded-lg p-4 relative ${pack.popular ? 'border-blue-500' : 'border-gray-200'}`}>
                  {pack.popular && (
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">
                      Popular
                    </Badge>
                  )}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">{pack.credits} Credits</h3>
                    <p className="text-2xl font-bold text-blue-600">₹{pack.price}</p>
                    <p className="text-sm text-gray-500 mb-4">
                      {pack.credits !== pack.price && `Save ₹${pack.credits - pack.price}`}
                    </p>
                    <Button className="w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Buy Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default WalletPage;
