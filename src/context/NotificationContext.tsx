
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
  // ✅ SSR-safe: All hooks declared unconditionally
  const [isMounted, setIsMounted] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // ✅ SSR-safe: Mount detection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  // ✅ SSR-safe: localStorage access only after mounting
  useEffect(() => {
    if (!isMounted) return;
    
    // Load notifications from localStorage after mounting
    const stored = localStorage.getItem("freeproplist_notifications");
    if (stored) {
      try {
        setNotifications(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load notifications from storage:', error);
      }
    }
  }, [isMounted]);

  // ✅ SSR-safe: localStorage save only when mounted
  useEffect(() => {
    if (isMounted && notifications.length > 0) {
      localStorage.setItem("freeproplist_notifications", JSON.stringify(notifications));
    }
  }, [notifications, isMounted]);

  const addNotification = (notification: Omit<Notification, 'id' | 'isRead' | 'createdAt'>) => {
    if (!isMounted) return;
    
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    if (!isMounted) return;
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const removeNotification = (id: string) => {
    if (!isMounted) return;
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getUnreadCount = () => {
    return notifications.filter(n => !n.isRead).length;
  };

  // ✅ SSR-safe: Provide loading state during hydration
  if (!isMounted) {
    return (
      <NotificationContext.Provider value={{
        notifications: [],
        addNotification: () => {},
        markAsRead: () => {},
        removeNotification: () => {},
        getUnreadCount: () => 0
      }}>
        {children}
      </NotificationContext.Provider>
    );
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
