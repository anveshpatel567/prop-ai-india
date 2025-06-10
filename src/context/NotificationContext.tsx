
import React, { createContext, useContext, useEffect, useState } from "react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'isRead' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
  getUnreadCount: () => number;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (typeof window === 'undefined') return null;
  return <NotificationProviderInner>{children}</NotificationProviderInner>;
};

const NotificationProviderInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("freeproplist_notifications");
    if (stored) {
      try {
        setNotifications(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load notifications from storage:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted && notifications.length > 0) {
      localStorage.setItem("freeproplist_notifications", JSON.stringify(notifications));
    }
  }, [notifications, mounted]);

  if (!mounted) {
    return <div>Loading notifications...</div>;
  }

  const addNotification = (notification: Omit<Notification, 'id' | 'isRead' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getUnreadCount = () => {
    return notifications.filter(n => !n.isRead).length;
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      markAsRead,
      removeNotification,
      getUnreadCount
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
};
