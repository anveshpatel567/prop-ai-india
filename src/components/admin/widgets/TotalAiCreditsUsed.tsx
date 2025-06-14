
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { TrendingUp } from 'lucide-react';

export default function TotalAiCreditsUsed() {
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTotal() {
      try {
        const { data, error } = await supabase
          .from('ai_tool_transactions')
          .select('credits_used');

        if (error) throw error;

        const totalCredits = (data || []).reduce((sum, item) => sum + (item.credits_used || 0), 0);
        setTotal(totalCredits);
      } catch (error) {
        console.error('Error fetching total credits:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTotal();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Total AI Credits Used
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          ) : (
            <div className="text-3xl font-bold text-indigo-600">{total.toLocaleString()}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
