
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
  // ✅ Always call hooks at the top level - never conditionally
  const [isMounted, setIsMounted] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
      
      // Load notifications from localStorage after mounting
      const stored = localStorage.getItem("freeproplist_notifications");
      if (stored) {
        try {
          setNotifications(JSON.parse(stored));
        } catch (error) {
          console.error('Failed to load notifications from storage:', error);
        }
      }
    }
  }, []);

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

  // ✅ Safe guard AFTER all hooks are called
  if (!isMounted) {
    return (
      <div className="fixed bottom-16 right-4 bg-blue-100 px-4 py-2 rounded-lg shadow-lg text-sm z-50">
        📱 Notification context initializing...
      </div>
    );
  }

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
