
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/types/supabase-db';

type Notification = Database['public']['Tables']['notifications']['Row'];
type NotificationInsert = Database['public']['Tables']['notifications']['Insert'];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
        return [];
      }

      setNotifications(data || []);
      return data || [];
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to fetch notifications');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createNotification = async (notificationData: NotificationInsert) => {
    try {
      setLoading(true);
      const { data, error: createError } = await supabase
        .from('notifications')
        .insert(notificationData)
        .select()
        .single();

      if (createError) {
        setError(createError.message);
        return null;
      }

      return data;
    } catch (err) {
      console.error('Error creating notification:', err);
      setError('Failed to create notification');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { data, error: updateError } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        setError(updateError.message);
        return null;
      }

      // Update local state
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
      return data;
    } catch (err) {
      console.error('Error marking notification as read:', err);
      setError('Failed to mark notification as read');
      return null;
    }
  };

  const getUnreadCount = () => {
    return notifications.filter(n => !n.is_read).length;
  };

  return {
    notifications,
    loading,
    error,
    fetchNotifications,
    createNotification,
    markAsRead,
    getUnreadCount
  };
};
