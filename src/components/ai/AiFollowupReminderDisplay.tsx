
import React, { useEffect } from 'react';
import { useAiFollowupReminders } from '@/hooks/useAiFollowupReminders';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Clock, AlertTriangle } from 'lucide-react';

export default function AiFollowupReminderDisplay() {
  const { user } = useAuth();
  const { reminders, loading, fetchAgentReminders, getUpcomingReminders, getOverdueReminders } = useAiFollowupReminders();

  useEffect(() => {
    if (user?.id) {
      fetchAgentReminders(user.id);
    }
  }, [user?.id]);

  if (!user || loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading follow-up reminders...</p>
        </CardContent>
      </Card>
    );
  }

  const upcomingReminders = getUpcomingReminders();
  const overdueReminders = getOverdueReminders();

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return <AlertTriangle className="h-3 w-3" />;
      case 'medium': return <Clock className="h-3 w-3" />;
      case 'low': return <Bell className="h-3 w-3" />;
      default: return <Bell className="h-3 w-3" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          AI Follow-up Reminders ({reminders.length})
        </CardTitle>
        {(upcomingReminders.length > 0 || overdueReminders.length > 0) && (
          <div className="flex gap-4 text-sm">
            <span className="text-blue-600">Upcoming: {upcomingReminders.length}</span>
            <span className="text-red-600">Overdue: {overdueReminders.length}</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {reminders.length === 0 ? (
          <p className="text-gray-500">No follow-up reminders yet. AI will generate smart reminders for your leads!</p>
        ) : (
          <div className="space-y-4">
            {overdueReminders.length > 0 && (
              <div>
                <h4 className="font-medium text-red-600 mb-2">Overdue Reminders</h4>
                {overdueReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="p-4 border border-red-200 rounded-lg bg-red-50 mb-2"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getUrgencyColor(reminder.urgency_level)}>
                        {getUrgencyIcon(reminder.urgency_level)}
                        <span className="ml-1">{reminder.urgency_level}</span>
                      </Badge>
                      <span className="text-sm text-red-600 font-medium">
                        Due: {new Date(reminder.recommended_time).toLocaleString()}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-2">
                      {reminder.reminder_text}
                    </p>
                    
                    <div className="text-xs text-gray-500">
                      Lead ID: {reminder.lead_id}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {upcomingReminders.length > 0 && (
              <div>
                <h4 className="font-medium text-blue-600 mb-2">Upcoming Reminders</h4>
                {upcomingReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50 mb-2"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getUrgencyColor(reminder.urgency_level)}>
                        {getUrgencyIcon(reminder.urgency_level)}
                        <span className="ml-1">{reminder.urgency_level}</span>
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {new Date(reminder.recommended_time).toLocaleString()}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-2">
                      {reminder.reminder_text}
                    </p>
                    
                    <div className="text-xs text-gray-500">
                      Lead ID: {reminder.lead_id}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
