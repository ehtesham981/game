
import React from 'react';
import { useApp } from '../store/AppContext';
import { STAT_CARDS } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Copy, Share2, ExternalLink, ArrowRight, ChevronRight, Zap, Target, ShieldCheck, Activity, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockChartData = [
  { name: 'Mon', impressions: 4000, clicks: 2400 },
  { name: 'Tue', impressions: 3000, clicks: 1398 },
  { name: 'Wed', impressions: 2000, clicks: 9800 },
  { name: 'Thu', impressions: 2780, clicks: 3908 },
  { name: 'Fri', impressions: 1890, clicks: 4800 },
  { name: 'Sat', impressions: 2390, clicks: 3800 },
  { name: 'Sun', impressions: 3490, clicks: 4300 },
];

const Dashboard: React.FC = () => {
  const { currentUser, theme } = useApp();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(`https://adspredia.site/signup?ref=${currentUser.referralCode}`);
    alert("Referral link copied!");
  };

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <h1 className={`text-5xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
            Network Pulse
          </h1>
          <p className={`text-lg font-bold ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
            Welcome back, {currentUser.username}.
          </p>
        </div>
        <div className={`flex items-center gap-4 p-3 rounded-[24px] border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'}`}>
           <div className="px-6 py-3 bg-indigo-600 rounded-[18px] font-black text-[10px] tracking-widest text-white shadow-xl shadow-indigo-600/30 uppercase">ELITE PARTNER</div>
           <div className={`px-6 py-3 rounded-[18px] font-black text-[10px] tracking-widest uppercase flex items-center gap-2 ${theme === 'dark' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-emerald-50 text-emerald-600'}`}>
              <ShieldCheck size={14} /> ACTIVE
           </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {STAT_CARDS.map((stat) => (
          <div key={stat.label} className={`p-10 rounded-[50px] border relative overflow-hidden group transition-all hover:scale-[1.02] duration-500 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/40'}`}>
            <div className={`absolute -top-4 -right-4 p-8 ${stat.color} opacity-5 transition-all duration-700 group-hover:scale-150`}>
              {React.cloneElement(stat.icon as React.ReactElement, { size: 100 })}
            </div>
            <p className={`text-[10px] font-black uppercase tracking-[0.4em] mb-6 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>{stat.label}</p>
            <div className="flex items-end gap-2">
              <span className={`text-5xl font-black ${stat.color} tracking-tighter`}>
                {stat.key === 'revenue' ? `$${currentUser.revenue.toFixed(2)}` : (currentUser as any)[stat.key]}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Main Chart */}
        <div className={`lg:col-span-8 p-12 rounded-[60px] border space-y-12 shadow-2xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-slate-200/50'}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
               <h3 className={`text-2xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Yield Projections</h3>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Activity size={12} className="text-emerald-500" /> Live Data Synchronization
               </p>
            </div>
            <div className={`flex p-1.5 rounded-[20px] border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
               {['7D', '30D', '90D'].map(t => (
                  <button key={t} className={`px-6 py-2 rounded-[14px] text-xs font-black transition-all ${t === '7D' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30' : 'text-slate-500 hover:text-slate-900'}`}>{t}</button>
               ))}
            </div>
          </div>
          
          <div className="h-[400px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorImp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={theme === 'dark' ? 0.4 : 0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="6 6" stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'} vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke={theme === 'dark' ? '#475569' : '#94a3b8'} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 12, fontWeight: 900}} 
                  dy={15} 
                />
                <YAxis 
                  stroke={theme === 'dark' ? '#475569' : '#94a3b8'} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 12, fontWeight: 900}} 
                />
                <Tooltip 
                  cursor={{ stroke: '#6366f1', strokeWidth: 2, strokeDasharray: '4 4' }}
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', 
                    border: 'none',
                    borderRadius: '32px',
                    boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.4)',
                    padding: '24px'
                  }} 
                  itemStyle={{fontSize: '13px', fontWeight: '900', textTransform: 'uppercase'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="impressions" 
                  stroke="#6366f1" 
                  fillOpacity={1} 
                  fill="url(#colorImp)" 
                  strokeWidth={6} 
                  animationDuration={2500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-10">
          <div className="p-12 rounded-[60px] bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 relative overflow-hidden group shadow-2xl shadow-indigo-600/40 transition-all duration-700">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000 scale-150">
              <Share2 size={120} className="text-white" />
            </div>
            <div className="relative z-10 space-y-8">
               <h3 className="text-3xl font-black text-white leading-tight">Elite Partner <br /> Program</h3>
               <p className="text-indigo-100 text-sm font-bold leading-relaxed">
                  Refer 10 active publishers to unlock the VIP 20% commission tier.
               </p>
               <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-2xl rounded-[24px] border border-white/20">
                  <span className="flex-1 truncate text-xs font-black text-white/90 ml-3 uppercase tracking-widest">{currentUser.referralCode}</span>
                  <button onClick={handleCopyReferral} className="p-4 bg-white text-indigo-700 rounded-[18px] hover:bg-indigo-50 transition-all shadow-2xl active:scale-95">
                     <Copy size={20} />
                  </button>
               </div>
               <button className="w-full py-5 bg-white/20 text-white font-black rounded-[24px] hover:bg-white/30 transition-all border border-white/30 text-xs tracking-[0.3em] uppercase">
                 TRACK REFERRALS
               </button>
            </div>
          </div>

          <div className={`p-12 rounded-[60px] border shadow-2xl space-y-10 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-slate-200/60'}`}>
            <h3 className={`text-2xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Express Portal</h3>
            <div className="space-y-4">
               {[
                 { label: 'Create Campaign', icon: <Target />, color: 'bg-indigo-600', path: '/create-task' },
                 { label: 'Manage Domains', icon: <Globe />, color: 'bg-emerald-600', path: '/websites' },
                 { label: 'Network Settings', icon: <Zap />, color: 'bg-purple-600', path: '/settings' }
               ].map((action, i) => (
                 <button 
                  key={i}
                  onClick={() => navigate(action.path)} 
                  className={`w-full flex items-center justify-between p-6 rounded-[32px] border transition-all duration-300 hover:translate-x-3 ${theme === 'dark' ? 'bg-slate-950 border-slate-800 hover:border-slate-600' : 'bg-slate-50 border-slate-100 hover:border-indigo-200 shadow-md shadow-slate-200/20'}`}
                 >
                    <div className="flex items-center gap-6">
                       <div className={`w-12 h-12 ${action.color} rounded-[18px] flex items-center justify-center text-white shadow-xl`}>
                          {React.cloneElement(action.icon as React.ReactElement, { size: 24 })}
                       </div>
                       <span className={`text-base font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{action.label}</span>
                    </div>
                    <ChevronRight size={20} className="text-slate-400 opacity-40" />
                 </button>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
