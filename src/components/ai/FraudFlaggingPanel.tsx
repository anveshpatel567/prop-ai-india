
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, CheckCircle } from 'lucide-react';
import { useFraudFlagging } from '@/hooks/useFraudFlagging';
import { useToast } from '@/hooks/use-toast';

export const FraudFlaggingPanel: React.FC = () => {
  const { flags, loading, flagListing } = useFraudFlagging();
  const { toast } = useToast();
  const [listingId, setListingId] = useState('');
  const [reason, setReason] = useState('');

  const handleFlag = async () => {
    if (!listingId.trim() || !reason.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both listing ID and reason",
        variant: "destructive"
      });
      return;
    }

    try {
      await flagListing(listingId, { reason, flagged_manually: true });
      toast({
        title: "Listing Flagged",
        description: "The listing has been flagged for fraud review",
      });
      setListingId('');
      setReason('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to flag listing",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-600">
            <Shield className="mr-2 h-5 w-5" />
            AI Fraud Detection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Listing ID"
              value={listingId}
              onChange={(e) => setListingId(e.target.value)}
            />
            <Input
              placeholder="Fraud reason/indicator"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <Button onClick={handleFlag} disabled={loading} className="bg-orange-500 hover:bg-orange-600">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Flag for Review (10 credits)
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-gray-700">Recent Fraud Flags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {flags.map((flag) => (
              <div key={flag.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Listing: {flag.listing_id}</span>
                  <Badge variant={flag.admin_reviewed ? "default" : "secondary"}>
                    {flag.admin_reviewed ? "Reviewed" : "Pending"}
                  </Badge>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(flag.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
