
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/layout/GlassCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useWallet } from '@/context/WalletContext';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useSearchParams } from 'react-router-dom';

interface PaymentLog {
  id: string;
  stripe_session_id: string;
  amount: number;
  currency: string;
  status: string;
  credits_added: number;
  created_at: string;
}

const CREDIT_PACKAGES = [
  { credits: 100, price: 999, popular: false },
  { credits: 500, price: 4499, popular: true, bonus: 50 },
  { credits: 1000, price: 7999, popular: false, bonus: 200 },
  { credits: 2500, price: 17999, popular: false, bonus: 750 },
];

const Wallet: React.FC = () => {
  const { balance, refreshBalance } = useWallet();
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  const [paymentLogs, setPaymentLogs] = useState<PaymentLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      fetchPaymentLogs();
    }
    
    // Handle payment success/cancel from URL params
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');
    
    if (success === 'true') {
      toast({
        title: "Payment Successful!",
        description: "Your credits have been added to your wallet.",
      });
      refreshBalance();
    } else if (canceled === 'true') {
      toast({
        title: "Payment Canceled",
        description: "Your payment was canceled. No charges were made.",
        variant: "destructive"
      });
    }
  }, [user, searchParams, toast, refreshBalance]);

  const fetchPaymentLogs = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('payment_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setPaymentLogs(data || []);
    } catch (error) {
      console.error('Error fetching payment logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseCredits = async (packageData: typeof CREDIT_PACKAGES[0]) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to purchase credits.",
        variant: "destructive"
      });
      return;
    }

    setProcessingPayment(packageData.credits);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-stripe-session', {
        body: {
          amount: packageData.price,
          credits: packageData.credits + (packageData.bonus || 0),
        },
      });

      if (error) throw error;

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessingPayment(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Wallet</h1>
          <p className="text-gray-600">Manage your AI credits and view transaction history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Balance & Purchase */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Balance */}
            <GlassCard>
              <div className="p-6 text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Current Balance</h2>
                <div className="text-5xl font-bold text-orange-600 mb-2">
                  {balance?.balance || 0}
                </div>
                <p className="text-gray-600">AI Credits Available</p>
              </div>
            </GlassCard>

            {/* Credit Packages */}
            <GlassCard>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Purchase Credits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CREDIT_PACKAGES.map((pkg) => (
                    <Card key={pkg.credits} className={`relative ${pkg.popular ? 'ring-2 ring-orange-500' : ''}`}>
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-orange-500 text-white">Most Popular</Badge>
                        </div>
                      )}
                      <CardHeader className="text-center pb-3">
                        <CardTitle className="text-2xl font-bold text-gray-800">
                          {pkg.credits}
                          {pkg.bonus && (
                            <span className="text-green-600"> +{pkg.bonus}</span>
                          )}
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                          {pkg.bonus ? `${pkg.credits + pkg.bonus} total credits` : 'credits'}
                        </p>
                      </CardHeader>
                      <CardContent className="text-center space-y-4">
                        <div>
                          <p className="text-3xl font-bold text-gray-800">
                            ₹{(pkg.price / 100).toFixed(0)}
                          </p>
                          <p className="text-sm text-gray-600">
                            ₹{(pkg.price / 100 / (pkg.credits + (pkg.bonus || 0))).toFixed(2)} per credit
                          </p>
                        </div>
                        <Button
                          onClick={() => handlePurchaseCredits(pkg)}
                          disabled={processingPayment === pkg.credits}
                          className="w-full bg-gradient-to-r from-orange-500 to-red-600"
                        >
                          {processingPayment === pkg.credits ? 'Processing...' : 'Purchase'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Transaction History */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Loading...</p>
                  </div>
                ) : paymentLogs.length === 0 ? (
                  <p className="text-center text-gray-600 py-8">No transactions yet</p>
                ) : (
                  <div className="space-y-4">
                    {paymentLogs.map((log) => (
                      <div key={log.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-gray-800">
                              +{log.credits_added} Credits
                            </p>
                            <p className="text-sm text-gray-600">
                              ₹{(log.amount / 100).toFixed(2)}
                            </p>
                          </div>
                          <Badge className={getStatusColor(log.status)}>
                            {log.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500">
                          {new Date(log.created_at).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Credit Usage Guide */}
            <Card>
              <CardHeader>
                <CardTitle>Credit Usage Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Title Enhancement:</span>
                  <span className="font-medium">5 credits</span>
                </div>
                <div className="flex justify-between">
                  <span>Description Enhancement:</span>
                  <span className="font-medium">15 credits</span>
                </div>
                <div className="flex justify-between">
                  <span>AI Pricing:</span>
                  <span className="font-medium">25 credits</span>
                </div>
                <div className="flex justify-between">
                  <span>Brochure Parser:</span>
                  <span className="font-medium">50 credits</span>
                </div>
                <div className="flex justify-between">
                  <span>Video Generation:</span>
                  <span className="font-medium">100 credits</span>
                </div>
                <div className="flex justify-between">
                  <span>Quality Enhancer:</span>
                  <span className="font-medium">300 credits</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Wallet;
