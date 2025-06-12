
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { Wallet as WalletIcon, Plus, TrendingUp, Clock, CreditCard } from 'lucide-react';

const Wallet: React.FC = () => {
  const { balance, receipts } = useWallet();

  const creditPackages = [
    { credits: 100, price: 499, popular: false },
    { credits: 250, price: 999, popular: true },
    { credits: 500, price: 1999, popular: false },
  ];

  const handleBuyCredits = (pack: { credits: number; price: number }) => {
    console.log('Buying credits:', pack);
    // Here you would integrate with payment gateway
  };

  const last7DaysUsage = 45; // Mock data

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Wallet</h1>
          <p className="text-gray-600">Manage your AI credits and view transaction history</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Balance */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-white">
                  <WalletIcon className="h-6 w-6 mr-2" />
                  Current Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-2">
                  {balance?.balance || 0} Credits
                </div>
                <p className="text-orange-100">
                  Last updated: {balance?.last_updated ? new Date(balance.last_updated).toLocaleDateString() : 'Never'}
                </p>
              </CardContent>
            </Card>

            {/* Usage Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-orange-500" />
                  Usage Summary (Last 7 Days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{last7DaysUsage} Credits</p>
                    <p className="text-gray-600">Used this week</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Average per day</p>
                    <p className="text-lg font-semibold text-orange-600">{Math.round(last7DaysUsage / 7)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-orange-500" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {receipts.length > 0 ? (
                  <div className="space-y-4">
                    {receipts.slice(0, 5).map((receipt) => (
                      <div key={receipt.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <div>
                          <p className="font-medium">Credit Purchase</p>
                          <p className="text-sm text-gray-600">
                            {new Date(receipt.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">+{Math.round(receipt.amount * 0.25)} credits</p>
                          <p className="text-sm text-gray-600">₹{receipt.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <CreditCard className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No transactions yet</p>
                    <p className="text-sm">Buy your first credit pack to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Buy Credits */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2 text-orange-500" />
                  Buy Credits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {creditPackages.map((pack, index) => (
                  <div
                    key={index}
                    className={`relative p-4 border-2 rounded-lg transition-all cursor-pointer hover:shadow-md ${
                      pack.popular 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    {pack.popular && (
                      <div className="absolute -top-2 left-4 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                        Most Popular
                      </div>
                    )}
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-800">{pack.credits}</p>
                      <p className="text-sm text-gray-600 mb-2">Credits</p>
                      <p className="text-lg font-semibold text-orange-600 mb-3">₹{pack.price}</p>
                      <Button
                        onClick={() => handleBuyCredits(pack)}
                        className={`w-full ${
                          pack.popular 
                            ? 'bg-gradient-to-r from-orange-500 to-red-600' 
                            : 'bg-gradient-to-r from-gray-600 to-gray-700'
                        }`}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Low Credits Warning */}
            {balance && balance.balance < 50 && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <WalletIcon className="h-5 w-5 text-yellow-600 mr-2" />
                    <p className="font-semibold text-yellow-800">Low Credits</p>
                  </div>
                  <p className="text-sm text-yellow-700 mb-3">
                    You're running low on credits. Buy more to continue using AI tools.
                  </p>
                  <Button 
                    size="sm" 
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500"
                    onClick={() => handleBuyCredits(creditPackages[1])}
                  >
                    Add Credits
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wallet;
