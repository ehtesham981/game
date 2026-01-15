
import React from 'react';
import { useApp } from '../store/AppContext';
import { STAT_CARDS } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Copy, Share2, ExternalLink, ArrowRight, ChevronRight } from 'lucide-react';

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

  if (!currentUser) return null;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(`https://adspredia.site/signup?ref=${currentUser.referralCode}`);
    alert("Referral link copied!");
  };

  return (
    <div className="space-y-10 pb-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className={`text-4xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
            Network Pulse
          </h1>
          <p className={`font-bold mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
            Hello, {currentUser.username}. Here is your live performance overview.
          </p>
        </div>
        <div className={`flex items-center gap-4 p-2.5 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'}`}>
           <div className="px-5 py-2.5 bg-indigo-600 rounded-xl font-black text-xs text-white shadow-xl shadow-indigo-600/30">PREMIUM ACCOUNT</div>
           <div className={`px-5 py-2.5 rounded-xl font-black text-xs ${theme === 'dark' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>VERIFIED</div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STAT_CARDS.map((stat) => (
          <div key={stat.label} className={`p-8 rounded-[40px] border relative overflow-hidden group transition-all hover:translate-y-[-8px] duration-500 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/40'}`}>
            <div className={`absolute top-0 right-0 p-6 ${stat.color} opacity-10 transition-all duration-500 group-hover:scale-150`}>
              {React.cloneElement(stat.icon as React.ReactElement, { size: 80 })}
            </div>
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{stat.label}</p>
            <div className="flex items-end gap-2">
              <span className={`text-4xl font-black ${stat.color} tracking-tighter`}>
                {stat.key === 'revenue' ? `$${currentUser.revenue.toFixed(2)}` : (currentUser as any)[stat.key]}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Main Chart */}
        <div className={`lg:col-span-8 p-10 rounded-[50px] border space-y-10 shadow-2xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-slate-200/50'}`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-2xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Performance Analytics</h3>
            <select className={`rounded-2xl px-6 py-3 text-sm font-black outline-none border transition-all ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-900 shadow-inner'}`}>
              <option>Real-time (Live)</option>
              <option>Last 7 Days</option>
              <option>Monthly Peak</option>
            </select>
          </div>
          
          <div className="h-[400px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorImp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={theme === 'dark' ? 0.3 : 0.6}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'} vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke={theme === 'dark' ? '#475569' : '#94a3b8'} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 11, fontWeight: 900}} 
                  dy={15} 
                />
                <YAxis 
                  stroke={theme === 'dark' ? '#475569' : '#94a3b8'} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 11, fontWeight: 900}} 
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', 
                    border: 'none',
                    borderRadius: '24px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    padding: '20px'
                  }} 
                  itemStyle={{fontSize: '12px', fontWeight: '900', textTransform: 'uppercase'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="impressions" 
                  stroke="#6366f1" 
                  fillOpacity={1} 
                  fill="url(#colorImp)" 
                  strokeWidth={5} 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-10">
          <div className="p-10 rounded-[50px] bg-gradient-to-br from-indigo-600 to-indigo-800 relative overflow-hidden group shadow-2xl shadow-indigo-600/40 transition-transform hover:scale-[1.02] duration-500">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform duration-700">
              <Share2 size={100} className="text-white" />
            </div>
            <h3 className="text-2xl font-black mb-3 text-white">Viral Referrals</h3>
            <p className="text-indigo-100 text-sm mb-8 font-bold leading-relaxed">
              Unlock the multi-tier referral program. Earn $5.00 for every active partner.
            </p>
            <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 mb-6">
               <span className="flex-1 truncate text-xs font-black text-white/90 ml-3 uppercase tracking-tighter">REF-{currentUser.referralCode}</span>
               <button onClick={handleCopyReferral} className="p-3.5 bg-white text-indigo-700 rounded-xl hover:bg-indigo-50 transition-all shadow-xl active:scale-95">
                  <Copy size={20} />
               </button>
            </div>
            <button className="w-full py-4 bg-white/20 text-white font-black rounded-2xl hover:bg-white/30 transition-all border border-white/30 text-sm tracking-widest">
              MY PARTNERS
            </button>
          </div>

          <div className={`p-10 rounded-[50px] border shadow-2xl space-y-8 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-slate-200/60'}`}>
            <h3 className={`text-2xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Express Setup</h3>
            <div className="space-y-4">
               {[
                 { label: 'Create Campaign', icon: <ArrowRight />, color: 'bg-indigo-600', path: '/create-task' },
                 { label: 'Add Web Domain', icon: <ExternalLink />, color: 'bg-emerald-600', path: '/websites' }
               ].map((action, i) => (
                 <button 
                  key={i}
                  onClick={() => navigate(action.path)} 
                  className={`w-full flex items-center justify-between p-5 rounded-3xl border transition-all duration-300 hover:translate-x-2 ${theme === 'dark' ? 'bg-slate-950 border-slate-800 hover:border-slate-600' : 'bg-slate-50 border-slate-100 hover:border-indigo-200 shadow-md shadow-slate-200/30'}`}
                 >
                    <div className="flex items-center gap-5">
                       <div className={`w-12 h-12 ${action.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                          {React.cloneElement(action.icon as React.ReactElement, { size: 24 })}
                       </div>
                       <span className={`text-base font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{action.label}</span>
                    </div>
                    <ChevronRight size={20} className="text-slate-400" />
                 </button>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const navigate = (path: string) => {
   window.location.hash = path;
};

export default Dashboard;
