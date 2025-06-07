
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useThrottleZones } from '@/hooks/useThrottleZones';
import { format } from 'date-fns';
import { Timer } from 'lucide-react';

export function ThrottleZonePanel() {
  const { zones, loading, applyThrottleZone } = useThrottleZones();
  const [userId, setUserId] = useState('');
  const [reason, setReason] = useState('');
  const [level, setLevel] = useState<'low' | 'medium' | 'high'>('low');

  const handleApplyThrottle = async () => {
    if (!userId || !reason) return;
    
    await applyThrottleZone(userId, reason, level);
    setUserId('');
    setReason('');
    setLevel('low');
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Timer className="h-5 w-5" />
          Throttle Zone Manager
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
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for throttling"
            />
          </div>
          <div>
            <Label htmlFor="level">Throttle Level</Label>
            <Select value={level} onValueChange={(value: 'low' | 'medium' | 'high') => setLevel(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleApplyThrottle} disabled={!userId || !reason}>
            Apply Throttle Zone
          </Button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Active Throttle Zones</h3>
          {loading ? (
            <p className="text-muted-foreground">Loading throttle zones...</p>
          ) : (
            <div className="space-y-2">
              {zones.map((zone) => (
                <div key={zone.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">User: {zone.user_id}</span>
                    <Badge className={getLevelColor(zone.throttle_level || 'low')}>
                      {zone.throttle_level?.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Reason: {zone.throttle_reason}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Imposed: {format(new Date(zone.imposed_at), 'PPp')}
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
