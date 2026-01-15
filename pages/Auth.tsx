
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ShieldCheck, Mail, Lock, User as UserIcon, ArrowRight, Loader2 } from 'lucide-react';
import { User } from '../types';

export const Login: React.FC = () => {
  const { setCurrentUser } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate looking up user in a "database" (localStorage)
    setTimeout(() => {
      const usersRaw = localStorage.getItem('adspredia_users_db');
      const users: User[] = usersRaw ? JSON.parse(usersRaw) : [];
      
      const existingUser = users.find(u => u.email.toLowerCase() === formData.email.toLowerCase());

      if (existingUser) {
        // Found user, set as current
        setCurrentUser(existingUser);
      } else {
        // If not in DB, create new for the first time
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          username: formData.email.split('@')[0],
          email: formData.email,
          coins: 50, 
          revenue: 0,
          role: formData.email.toLowerCase() === 'admin@adspredia.site' ? 'ADMIN' : 'USER',
          referralCode: 'REF-' + Math.random().toString(36).toUpperCase().substr(2, 5),
          referralsCount: 0,
          completedTasks: 0,
          joinedDate: new Date().toISOString(),
          isVerified: true,
          lastDailyReset: new Date().toISOString(),
          dailySpinCount: 0,
          dailyVideoWatched: false,
          dailyTasksCompleted: []
        };
        
        const updatedUsers = [...users, newUser];
        localStorage.setItem('adspredia_users_db', JSON.stringify(updatedUsers));
        setCurrentUser(newUser);
      }
      
      navigate('/');
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto py-12 animate-in zoom-in duration-300">
      <div className="p-8 rounded-[40px] bg-slate-900 border border-slate-800 shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <ShieldCheck size={120} />
        </div>
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-xl shadow-indigo-600/30">
             <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white">Welcome Back</h1>
          <p className="text-slate-400 font-medium">Log in to manage your earning dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                required
                type="email" 
                placeholder="name@example.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 ring-indigo-600 transition-all font-medium text-white"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                required
                type="password" 
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 ring-indigo-600 transition-all font-medium text-white"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black text-lg transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 text-white"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Enter Network <ArrowRight size={20} /></>}
          </button>
        </form>

        <div className="text-center">
          <p className="text-slate-500 text-sm">
            New to Ads Predia? <button onClick={() => navigate('/signup')} className="text-indigo-400 font-bold hover:underline">Create an account</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const usersRaw = localStorage.getItem('adspredia_users_db');
      const users: User[] = usersRaw ? JSON.parse(usersRaw) : [];

      if (users.some(u => u.email.toLowerCase() === formData.email.toLowerCase())) {
        alert("Email already registered. Please log in.");
        setLoading(false);
        return;
      }

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        username: formData.username,
        email: formData.email,
        coins: 50, 
        revenue: 0,
        role: 'USER',
        referralCode: 'REF-' + Math.random().toString(36).toUpperCase().substr(2, 5),
        referralsCount: 0,
        completedTasks: 0,
        joinedDate: new Date().toISOString(),
        isVerified: true,
        lastDailyReset: new Date().toISOString(),
        dailySpinCount: 0,
        dailyVideoWatched: false,
        dailyTasksCompleted: []
      };

      localStorage.setItem('adspredia_users_db', JSON.stringify([...users, newUser]));
      
      setLoading(false);
      alert("Registration Successful! Your 50 Coins welcome bonus is secured. Log in to claim.");
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto py-12 animate-in slide-in-from-bottom-4 duration-500">
      <div className="p-8 rounded-[40px] bg-slate-900 border border-slate-800 shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <UserIcon size={120} />
        </div>
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-xl shadow-emerald-600/30">
             <UserIcon size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white">Join Network</h1>
          <p className="text-slate-400 font-medium">Start earning with premium monetization.</p>
        </div>
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 ml-1">Username</label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                required 
                type="text" 
                placeholder="johndoe" 
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 ring-emerald-600 transition-all font-medium text-white" 
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                required 
                type="email" 
                placeholder="name@example.com" 
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 ring-emerald-600 transition-all font-medium text-white" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                required 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 ring-emerald-600 transition-all font-medium text-white" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-black text-lg transition-all shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 text-white">
            {loading ? <Loader2 className="animate-spin" /> : "Sign Up & Get 50 Bonus"}
          </button>
        </form>
        <div className="text-center">
          <p className="text-slate-500 text-sm">
            Already registered? <button onClick={() => navigate('/login')} className="text-emerald-400 font-bold hover:underline">Log in</button>
          </p>
        </div>
      </div>
    </div>
  );
};
