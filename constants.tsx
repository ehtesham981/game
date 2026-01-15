
import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Globe, 
  PlusSquare, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  ClipboardList, 
  Settings as SettingsIcon,
  Users,
  ShieldCheck,
  TrendingUp,
  CircleDollarSign,
  Gift
} from 'lucide-react';

export const NAV_ITEMS = [
  { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
  { name: 'Tasks', path: '/tasks', icon: <ClipboardList size={20} /> },
  { name: 'Wallet', path: '/wallet', icon: <Wallet size={20} /> },
  { name: 'Websites', path: '/websites', icon: <Globe size={20} /> },
  { name: 'Create Task', path: '/create-task', icon: <PlusSquare size={20} /> },
  { name: 'Deposit', path: '/deposit', icon: <ArrowDownCircle size={20} /> },
  { name: 'Withdraw', path: '/withdraw', icon: <ArrowUpCircle size={20} /> },
  { name: 'Settings', path: '/settings', icon: <SettingsIcon size={20} /> },
];

export const ADMIN_NAV_ITEMS = [
  { name: 'Admin Hub', path: '/admin', icon: <ShieldCheck size={20} /> },
  { name: 'Manage Users', path: '/admin/users', icon: <Users size={20} /> },
];

export const PAYMENT_METHODS = [
  { id: 'binance', name: 'Binance (USDT)', icon: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png' },
  { id: 'payeer', name: 'Payeer', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Payeer_logo.svg/1200px-Payeer_logo.svg.png' },
  { id: 'easypaisa', name: 'Easypaisa', icon: 'https://seeklogo.com/images/E/easypaisa-logo-4B02271235-seeklogo.com.png' },
  { id: 'jazzcash', name: 'JazzCash', icon: 'https://seeklogo.com/images/J/jazzcash-logo-0558778E28-seeklogo.com.png' },
  { id: 'bank', name: 'Bank Transfer', icon: 'https://cdn-icons-png.flaticon.com/512/2830/2830284.png' },
];

export const STAT_CARDS = [
  { label: 'Coin Balance', key: 'coins', color: 'text-yellow-400', icon: <CircleDollarSign /> },
  { label: 'Total Revenue', key: 'revenue', color: 'text-emerald-400', icon: <TrendingUp /> },
  { label: 'Completed Tasks', key: 'completedTasks', color: 'text-indigo-400', icon: <ClipboardList /> },
  { label: 'Referral Bonus', key: 'referralBonus', color: 'text-pink-400', icon: <Gift /> },
];
