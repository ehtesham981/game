
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Task, Website, Transaction } from '../types';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  tasks: Task[];
  websites: Website[];
  transactions: Transaction[];
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  addTask: (task: Task) => void;
  addWebsite: (website: Website) => void;
  addTransaction: (tx: Transaction) => void;
  updateUserBalance: (coins: number, revenue?: number) => void;
  updateProfile: (username: string, email: string) => void;
  completeDailySpin: (win: number) => void;
  completeDailyVideo: (reward: number) => void;
  completeDailyTask: (taskId: string, reward: number) => void;
  logout: () => void;
  approveTransaction: (id: string) => void;
  approveWebsite: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('adspredia_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('adspredia_theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('adspredia_tasks');
    // Task list is now empty by default as requested
    return saved ? JSON.parse(saved) : [];
  });

  const [websites, setWebsites] = useState<Website[]>(() => {
    const saved = localStorage.getItem('adspredia_websites');
    return saved ? JSON.parse(saved) : [];
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('adspredia_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('adspredia_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const syncUserToDb = (updatedUser: User) => {
    const usersRaw = localStorage.getItem('adspredia_users_db');
    if (usersRaw) {
      const users: User[] = JSON.parse(usersRaw);
      const updatedUsers = users.map(u => u.id === updatedUser.id ? updatedUser : u);
      localStorage.setItem('adspredia_users_db', JSON.stringify(updatedUsers));
    } else {
      localStorage.setItem('adspredia_users_db', JSON.stringify([updatedUser]));
    }
  };

  useEffect(() => {
    if (currentUser) {
      const now = new Date();
      const lastReset = new Date(currentUser.lastDailyReset || now.toISOString());
      const hoursSinceReset = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60);

      if (hoursSinceReset >= 24) {
        const updatedUser = {
          ...currentUser,
          lastDailyReset: now.toISOString(),
          dailySpinCount: 0,
          dailyVideoWatched: false,
          dailyTasksCompleted: []
        };
        setCurrentUser(updatedUser);
        syncUserToDb(updatedUser);
      }
    }
  }, [currentUser?.id]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('adspredia_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('adspredia_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('adspredia_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('adspredia_websites', JSON.stringify(websites));
  }, [websites]);

  useEffect(() => {
    localStorage.setItem('adspredia_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const addTask = (task: Task) => setTasks(prev => [...prev, task]);
  const addWebsite = (website: Website) => setWebsites(prev => [...prev, website]);
  const addTransaction = (tx: Transaction) => setTransactions(prev => [...prev, tx]);

  const updateUserBalance = (coins: number, revenue: number = 0) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      coins: currentUser.coins + coins,
      revenue: currentUser.revenue + revenue
    };
    setCurrentUser(updatedUser);
    syncUserToDb(updatedUser);
  };

  const updateProfile = (username: string, email: string) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      username,
      email
    };
    setCurrentUser(updatedUser);
    syncUserToDb(updatedUser);
  };

  const completeDailySpin = (win: number) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      coins: currentUser.coins + win,
      dailySpinCount: currentUser.dailySpinCount + 1
    };
    setCurrentUser(updatedUser);
    syncUserToDb(updatedUser);
  };

  const completeDailyVideo = (reward: number) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      coins: currentUser.coins + reward,
      dailyVideoWatched: true
    };
    setCurrentUser(updatedUser);
    syncUserToDb(updatedUser);
  };

  const completeDailyTask = (taskId: string, reward: number) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      coins: currentUser.coins + reward,
      completedTasks: currentUser.completedTasks + 1,
      dailyTasksCompleted: [...currentUser.dailyTasksCompleted, taskId]
    };
    setCurrentUser(updatedUser);
    syncUserToDb(updatedUser);
  };

  const logout = () => {
    if (currentUser) syncUserToDb(currentUser);
    setCurrentUser(null);
  };

  const approveTransaction = (id: string) => {
    setTransactions(prev => prev.map(tx => {
      if (tx.id === id) {
        if (tx.type === 'DEPOSIT' && tx.status === 'PENDING') {
            if (currentUser?.id === tx.userId) {
                updateUserBalance(tx.amount);
            }
        }
        return { ...tx, status: 'COMPLETED' };
      }
      return tx;
    }));
  };

  const approveWebsite = (id: string) => {
    setWebsites(prev => prev.map(ws => ws.id === id ? { ...ws, status: 'APPROVED' } : ws));
  };

  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser, tasks, websites, transactions, 
      theme, toggleTheme, addTask, addWebsite, addTransaction, updateUserBalance, 
      updateProfile, completeDailySpin, completeDailyVideo, completeDailyTask,
      logout, approveTransaction, approveWebsite
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
