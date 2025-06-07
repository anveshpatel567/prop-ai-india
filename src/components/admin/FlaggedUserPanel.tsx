
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useFlaggedUsers } from '@/hooks/useFlaggedUsers';
import { format } from 'date-fns';
import { Flag } from 'lucide-react';

export function FlaggedUserPanel() {
  const { flaggedUsers, loading, flagUser } = useFlaggedUsers();
  const [userId, setUserId] = useState('');
  const [flagType, setFlagType] = useState('');
  const [flagReason, setFlagReason] = useState('');

  const handleFlagUser = async () => {
    if (!userId || !flagType || !flagReason) return;
    
    await flagUser(userId, flagType, flagReason);
    setUserId('');
    setFlagType('');
    setFlagReason('');
  };

  const getFlagTypeColor = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('abuse')) return 'bg-red-100 text-red-800';
    if (lowerType.includes('spam')) return 'bg-orange-100 text-orange-800';
    if (lowerType.includes('exploit')) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flag className="h-5 w-5" />
          Flagged Users
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 p-4 bg-muted/50 rounded-lg">
          <div>
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID"
            />
          </div>
          <div>
            <Label htmlFor="flagType">Flag Type</Label>
            <Input
              id="flagType"
              value={flagType}
              onChange={(e) => setFlagType(e.target.value)}
              placeholder="e.g., abuse, spam, exploit"
            />
          </div>
          <div>
            <Label htmlFor="flagReason">Flag Reason</Label>
            <Textarea
              id="flagReason"
              value={flagReason}
              onChange={(e) => setFlagReason(e.target.value)}
              placeholder="Detailed reason for flagging"
            />
          </div>
          <Button onClick={handleFlagUser} disabled={!userId || !flagType || !flagReason}>
            Flag User
          </Button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Flagged Users History</h3>
          {loading ? (
            <p className="text-muted-foreground">Loading flagged users...</p>
          ) : (
            <div className="space-y-2">
              {flaggedUsers.map((flag) => (
                <div key={flag.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">User: {flag.user_id}</span>
                    <Badge className={getFlagTypeColor(flag.flag_type)}>
                      {flag.flag_type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Reason: {flag.flag_reason}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Flagged: {format(new Date(flag.flagged_at), 'PPp')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
