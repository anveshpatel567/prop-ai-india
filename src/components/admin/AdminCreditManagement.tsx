
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Coins, Plus, Minus } from 'lucide-react';

export const AdminCreditManagement: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [actionType, setActionType] = useState<'add' | 'deduct'>('add');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCreditAction = async () => {
    if (!userId || !amount || !reason) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('adminCreditOverride', {
        body: {
          target_user_id: userId,
          action_type: actionType,
          amount: parseInt(amount),
          reason
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Credits ${actionType === 'add' ? 'added' : 'deducted'} successfully. New balance: ${data.new_balance}`,
      });

      // Reset form
      setUserId('');
      setAmount('');
      setReason('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update credits",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Coins className="mr-2 h-5 w-5" />
          Credit Management
        </CardTitle>
        <CardDescription>
          Manually add or deduct credits for any user
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="userId">User ID</Label>
          <Input
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user UUID"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="action">Action</Label>
            <Select value={actionType} onValueChange={(value: 'add' | 'deduct') => setActionType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">
                  <div className="flex items-center">
                    <Plus className="mr-2 h-4 w-4 text-green-500" />
                    Add Credits
                  </div>
                </SelectItem>
                <SelectItem value="deduct">
                  <div className="flex items-center">
                    <Minus className="mr-2 h-4 w-4 text-red-500" />
                    Deduct Credits
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter credit amount"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="reason">Reason</Label>
          <Textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for credit adjustment..."
            rows={3}
          />
        </div>

        <Button 
          onClick={handleCreditAction}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Processing...' : `${actionType === 'add' ? 'Add' : 'Deduct'} Credits`}
        </Button>
      </CardContent>
    </Card>
  );
};
