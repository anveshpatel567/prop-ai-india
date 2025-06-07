
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFlaggedUsers } from '@/hooks/useFlaggedUsers';
import { format } from 'date-fns';
import { Flag } from 'lucide-react';

export function FlaggedUserPanel() {
  const { flaggedUsers, loading, flagUser } = useFlaggedUsers();
  const [userId, setUserId] = useState('');
  const [flagType, setFlagType] = useState('');
  const [flagReason, setFlagReason] = useState('');
  const [filterType, setFilterType] = useState('all');

  const handleFlagUser = async () => {
    if (!userId || !flagType || !flagReason) return;
    
    await flagUser(userId, flagType, flagReason);
    setUserId('');
    setFlagType('');
    setFlagReason('');
  };

  const filteredUsers = filterType === 'all' 
    ? flaggedUsers 
    : flaggedUsers.filter(user => user.flag_type === filterType);

  const flagTypes = ['abuse', 'spam', 'exploit', 'harassment', 'other'];
  const uniqueFlagTypes = [...new Set(flaggedUsers.map(user => user.flag_type))];

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
            <Select value={flagType} onValueChange={setFlagType}>
              <SelectTrigger>
                <SelectValue placeholder="Select flag type" />
              </SelectTrigger>
              <SelectContent>
                {flagTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Flagged Users</h3>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueFlagTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {loading ? (
            <p className="text-muted-foreground">Loading flagged users...</p>
          ) : (
            <div className="space-y-2">
              {filteredUsers.map((user) => (
                <div key={user.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">User: {user.user_id}</span>
                    <Badge variant="destructive">
                      {user.flag_type.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Reason: {user.flag_reason}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Flagged: {format(new Date(user.flagged_at), 'PPp')}
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
