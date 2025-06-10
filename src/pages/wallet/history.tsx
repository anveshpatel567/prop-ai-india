
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Zap, Calendar, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Transaction {
  id: string;
  tool_name: string;
  credit_cost: number;
  status: string;
  created_at: string;
  input_data?: any;
  output_data?: any;
  error_message?: string;
}

const WalletHistory: React.FC = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchTransactions();
    }
  }, [user?.id]);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_tool_transactions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getToolDisplayName = (toolName: string) => {
    const names: Record<string, string> = {
      'smart_description': 'AI Smart Description',
      'pricing_suggestion': 'AI Pricing Suggestion',
      'quality_enhancer': 'Quality Enhancer',
      'search_match': 'AI Search Match',
      'video_generator': 'Video Generator',
      'brochure_matcher': 'Brochure Matcher',
      'fraud_detector': 'Fraud Detection',
      'title_chain_generator': 'Title Chain',
      'whatsapp_responder': 'WhatsApp Responder'
    };
    return names[toolName] || toolName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800">Success</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/wallet">
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Wallet
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Transaction History</h1>
          <p className="text-gray-600">Your AI tool usage and credit transactions</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading transactions...</div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Zap className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p>No transactions yet</p>
                <p className="text-sm">Start using AI tools to see your usage history here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <Card key={transaction.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Zap className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{getToolDisplayName(transaction.tool_name)}</h3>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(transaction.created_at).toLocaleDateString()} at{' '}
                            {new Date(transaction.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-orange-600">
                            -{transaction.credit_cost} credits
                          </span>
                          {getStatusBadge(transaction.status)}
                        </div>
                      </div>
                    </div>

                    {transaction.error_message && (
                      <div className="mt-2 p-2 bg-red-50 rounded text-sm text-red-700">
                        <strong>Error:</strong> {transaction.error_message}
                      </div>
                    )}

                    {transaction.status === 'success' && transaction.output_data && (
                      <div className="mt-2 p-2 bg-green-50 rounded text-sm text-green-700">
                        <strong>Result:</strong> AI tool completed successfully
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default WalletHistory;
