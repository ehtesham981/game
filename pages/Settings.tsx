
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { 
  User as UserIcon, 
  Mail, 
  ShieldCheck, 
  Moon, 
  Sun, 
  Bell, 
  Lock,
  Save,
  Loader2,
  AlertCircle
} from 'lucide-react';

const Settings: React.FC = () => {
  const { currentUser, updateProfile, theme, toggleTheme } = useApp();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || ''
  });
  const [success, setSuccess] = useState(false);

  if (!currentUser) return null;

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    setTimeout(() => {
      updateProfile(formData.username, formData.email);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header>
        <h1 className={`text-5xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Preferences</h1>
        <p className={`font-bold mt-2 text-xl ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Customize your ADS PREDIA experience.</p>
      </header>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Profile Card */}
        <div className="lg:col-span-8 space-y-10">
           <form onSubmit={handleUpdate} className={`p-12 rounded-[50px] border shadow-2xl space-y-10 relative overflow-hidden transition-all ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-slate-200/50'}`}>
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-indigo-600 rounded-[24px] flex items-center justify-center text-white shadow-2xl shadow-indigo-600/30">
                    <UserIcon size={32} />
                 </div>
                 <h3 className={`text-3xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Identity</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                 <div className="space-y-4">
                    <label className={`text-xs font-black uppercase tracking-[0.4em] ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>Public Name</label>
                    <div className="relative group">
                       <UserIcon className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${theme === 'dark' ? 'text-slate-600 group-focus-within:text-indigo-500' : 'text-slate-300 group-focus-within:text-indigo-600'}`} size={24} />
                       <input 
                         required
                         type="text"
                         className={`w-full py-6 pl-14 pr-6 rounded-[24px] border outline-none transition-all font-black text-lg ${theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white focus:ring-2 ring-indigo-600/30' : 'bg-slate-50 border-slate-200 text-slate-950 focus:bg-white focus:ring-4 ring-indigo-500/10'}`}
                         value={formData.username}
                         onChange={(e) => setFormData({...formData, username: e.target.value})}
                       />
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className={`text-xs font-black uppercase tracking-[0.4em] ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>System Email</label>
                    <div className="relative group">
                       <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${theme === 'dark' ? 'text-slate-600 group-focus-within:text-indigo-500' : 'text-slate-300 group-focus-within:text-indigo-600'}`} size={24} />
                       <input 
                         required
                         type="email"
                         className={`w-full py-6 pl-14 pr-6 rounded-[24px] border outline-none transition-all font-black text-lg ${theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white focus:ring-2 ring-indigo-600/30' : 'bg-slate-50 border-slate-200 text-slate-950 focus:bg-white focus:ring-4 ring-indigo-500/10'}`}
                         value={formData.email}
                         onChange={(e) => setFormData({...formData, email: e.target.value})}
                       />
                    </div>
                 </div>
              </div>

              <div className="flex items-center justify-between pt-6">
                 <div className="flex items-center gap-3 text-emerald-500 font-black text-sm">
                    {success && (
                       <span className="flex items-center gap-3 animate-in zoom-in duration-500">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white"><ShieldCheck size={18} /></div>
                          Profile synced to network!
                       </span>
                    )}
                 </div>
                 <button 
                  type="submit"
                  disabled={loading}
                  className="px-12 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[24px] font-black text-lg transition-all shadow-2xl shadow-indigo-600/40 flex items-center gap-4 active:scale-95 disabled:opacity-50"
                 >
                   {loading ? <Loader2 className="animate-spin" /> : <><Save size={24} /> PUBLISH CHANGES</>}
                 </button>
              </div>
           </form>

           {/* Security */}
           <div className={`p-12 rounded-[50px] border shadow-2xl space-y-10 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-slate-200/50'}`}>
              <div className="flex items-center gap-6">
                 <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center border transition-colors ${theme === 'dark' ? 'bg-emerald-600/10 text-emerald-600 border-emerald-600/20' : 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-inner'}`}>
                    <Lock size={32} />
                 </div>
                 <h3 className={`text-3xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Security Protocol</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                 {[
                   { title: 'Passphrase', desc: 'Secure your login access', label: 'UPDATE', color: 'bg-slate-800' },
                   { title: 'Double Shield', desc: 'Two-factor authentication', label: 'ENABLE', color: 'bg-emerald-600' }
                 ].map((box, i) => (
                   <div key={i} className={`flex items-center justify-between p-8 rounded-[32px] border transition-all hover:scale-[1.03] ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100 shadow-md'}`}>
                      <div>
                         <p className={`font-black text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{box.title}</p>
                         <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-tighter">{box.desc}</p>
                      </div>
                      <button className={`px-6 py-3 rounded-2xl font-black text-xs transition-all shadow-xl shadow-slate-200/10 ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-white hover:bg-indigo-600 hover:text-white border border-slate-200 text-slate-900'}`}>
                        {box.label}
                      </button>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Preferences Sidebar */}
        <div className="lg:col-span-4 space-y-10">
           <div className={`p-10 rounded-[50px] border shadow-2xl space-y-10 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-slate-200/50'}`}>
              <div className="flex items-center gap-4">
                 <div className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-indigo-600/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600 shadow-inner'}`}>
                    <Bell size={24} />
                 </div>
                 <h3 className={`text-2xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Live Settings</h3>
              </div>

              <div className="space-y-8">
                 <div className="space-y-5">
                    <p className={`text-xs font-black uppercase tracking-[0.4em] ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>Visual Mode</p>
                    <div className={`p-2.5 rounded-[28px] flex gap-3 border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200 shadow-inner'}`}>
                       <button 
                        onClick={() => theme === 'light' && toggleTheme()}
                        className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-[20px] font-black text-sm transition-all duration-300 ${theme === 'dark' ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40' : 'text-slate-400 hover:text-slate-600'}`}
                       >
                          <Moon size={20} /> DARK
                       </button>
                       <button 
                        onClick={() => theme === 'dark' && toggleTheme()}
                        className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-[20px] font-black text-sm transition-all duration-300 ${theme === 'light' ? 'bg-white border border-slate-100 text-indigo-700 shadow-2xl shadow-slate-300/30 scale-105' : 'text-slate-600 hover:text-slate-300'}`}
                       >
                          <Sun size={20} /> LIGHT
                       </button>
                    </div>
                 </div>

                 <div className="space-y-5">
                    <p className={`text-xs font-black uppercase tracking-[0.4em] ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>Engagement Alerts</p>
                    <div className="space-y-4">
                       {['Payout Ready', 'Task Completed', 'New Campaign'].map(pref => (
                          <div key={pref} className="flex items-center justify-between group cursor-pointer">
                             <span className={`text-sm font-black transition-colors ${theme === 'dark' ? 'text-slate-400 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-950'}`}>{pref}</span>
                             <div className={`w-12 h-6 rounded-full relative transition-all shadow-inner ${theme === 'dark' ? 'bg-indigo-600/40' : 'bg-indigo-100'}`}>
                                <div className="absolute top-1 right-1 w-4 h-4 bg-indigo-600 rounded-full shadow-lg"></div>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           {/* Partner Badge */}
           <div className={`p-10 rounded-[50px] border shadow-2xl space-y-6 transition-transform hover:scale-[1.02] duration-500 ${theme === 'dark' ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-emerald-50 border-emerald-200 shadow-emerald-500/5'}`}>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/30">
                    <ShieldCheck size={28} />
                 </div>
                 <h4 className="text-xl font-black text-emerald-600">Verified</h4>
              </div>
              <p className="text-sm text-emerald-900/60 font-black leading-relaxed">
                 Express payouts are active. Your account reputation is excellent.
              </p>
              <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-emerald-600/50">
                 <AlertCircle size={16} /> SINCE {new Date(currentUser.joinedDate).getFullYear()}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
