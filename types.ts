
export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  username: string;
  email: string;
  coins: number;
  revenue: number;
  role: UserRole;
  referralCode: string;
  referralsCount: number;
  completedTasks: number;
  joinedDate: string;
  isVerified: boolean;
  // Daily limits and reset tracking
  lastDailyReset: string;
  dailySpinCount: number;
  dailyVideoWatched: boolean;
  dailyTasksCompleted: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  link: string;
  ownerId: string;
  status: 'ACTIVE' | 'PENDING' | 'COMPLETED';
  requireScreenshot?: boolean;
}

export interface Website {
  id: string;
  url: string;
  category: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  ownerId: string;
  stats: {
    impressions: number;
    clicks: number;
    earnings: number;
  };
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'EARN' | 'WITHDRAW' | 'DEPOSIT' | 'REWARD' | 'AD_SPEND';
  amount: number;
  method?: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  date: string;
}

export type AdZone = 'NATIVE' | 'POP_UNDER' | 'BANNER_728' | 'BANNER_300' | 'SOCIAL';
