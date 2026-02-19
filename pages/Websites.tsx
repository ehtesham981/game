
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { 
  Globe, 
  Plus, 
  ExternalLink, 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Copy,
  Layout as LayoutIcon,
  ShieldCheck,
  TrendingUp,
  X
} from 'lucide-react';

const Websites: React.FC = () => {
  const { websites, addWebsite, currentUser, theme } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSite, setNewSite] = useState({ url: '', category: 'Blog' });

  const categories = ['Blog', 'Entertainment', 'E-commerce', 'Forum', 'News', 'Tools', 'SaaS', 'Other'];

  const handleAddWebsite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const domain = newSite.url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
    
    addWebsite({
      id: Math.random().toString(36).substr(2, 9),
      url: domain,
      category: newSite.category,
      status: 'PENDING',
      ownerId: currentUser.id,
      stats: {
        impressions: 0,
        clicks: 0,
        earnings: 0
      }
    });

    setNewSite({ url: '', category: 'Blog' });
    setShowAddForm(false);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'APPROVED':
        return <span className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20"><CheckCircle2 size={12} /> Live Network</span>;
      case 'PENDING':
        return <span className="flex items-center gap-1.5 px-4 py-1.5 bg-yellow-500/10 text-yellow-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-yellow-500/20"><Clock size={12} /> Auditing</span>;
      case 'REJECTED':
        return <span className="flex items-center gap-1.5 px-4 py-1.5 bg-red-500/10 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-500/20"><XCircle size={12} /> Compliance Fail</span>;
      default:
        return null;
    }
  };

  const userWebsites = websites.filter(w => w.ownerId === currentUser?.id);

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className={`text-5xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Monetization Control</h1>
          <p className={`text-lg font-bold ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Integrate premium ad technology into your domains.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center gap-3 px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[24px] font-black text-sm transition-all shadow-2xl shadow-indigo-600/30 active:scale-95"
        >
          <Plus size={20} /> New Web Domain
        </button>
      </header>

      {/* Add Website Modal Overlay */}
      {showAddForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={() => setShowAddForm(false)}></div>
          <div className={`relative rounded-[50px] border p-12 w-full max-w-xl shadow-2xl animate-in zoom-in duration-300 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
             <div className="flex justify-between items-start mb-10">
                <div className="space-y-2">
                   <h2 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Register Domain</h2>
                   <p className="text-sm text-slate-500 font-medium italic">All sites are reviewed within 24 hours.</p>
                </div>
                <button onClick={() => setShowAddForm(false)} className="p-3 hover:bg-slate-800 rounded-full text-slate-500 transition-colors">
                   <X size={24} />
                </button>
             </div>
             
             <form onSubmit={handleAddWebsite} className="space-y-8">
                <div className="space-y-4">
                  <label className={`text-xs font-black uppercase tracking-[0.4em] ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>Domain Endpoint</label>
                  <div className="relative">
                    <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={24} />
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g., mysite.com"
                      className={`w-full py-6 pl-14 pr-6 rounded-[24px] border outline-none transition-all font-black text-lg ${theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white focus:ring-2 ring-indigo-600/30' : 'bg-slate-50 border-slate-200 text-slate-950 focus:bg-white shadow-inner'}`}
                      value={newSite.url}
                      onChange={(e) => setNewSite({...newSite, url: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className={`text-xs font-black uppercase tracking-[0.4em] ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>Content Vertical</label>
                  <select 
                    className={`w-full py-6 px-6 rounded-[24px] border outline-none transition-all font-black text-lg appearance-none ${theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white focus:ring-2 ring-indigo-600/30' : 'bg-slate-50 border-slate-200 text-slate-950 focus:bg-white shadow-inner'}`}
                    value={newSite.category}
                    onChange={(e) => setNewSite({...newSite, category: e.target.value})}
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                <div className="flex gap-4 pt-6">
                  <button 
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className={`flex-1 py-5 rounded-[24px] font-black text-sm transition-all ${theme === 'dark' ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                  >
                    CANCEL
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[24px] font-black text-sm transition-all shadow-2xl shadow-indigo-600/40"
                  >
                    INITIATE AUDIT
                  </button>
                </div>
             </form>
          </div>
        </div>
      )}

      {userWebsites.length === 0 ? (
        <div className={`p-24 text-center rounded-[60px] border border-dashed space-y-8 ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
           <div className="w-24 h-24 bg-slate-900 rounded-[32px] flex items-center justify-center mx-auto text-slate-700 shadow-inner">
              <Globe size={48} />
           </div>
           <div className="space-y-3">
              <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-slate-300' : 'text-slate-950'}`}>Deploy Your First Zone</h3>
              <p className="text-slate-500 max-w-md mx-auto font-medium">Submit your domain to unlock premium native ad CPMs and real-time yield optimization.</p>
           </div>
           <button 
             onClick={() => setShowAddForm(true)}
             className="px-12 py-5 bg-indigo-600/10 text-indigo-600 border border-indigo-600/20 rounded-[24px] font-black text-sm hover:bg-indigo-600 hover:text-white transition-all active:scale-95"
           >
             ADD DOMAIN NOW
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           {userWebsites.map((site) => (
             <div key={site.id} className={`p-10 rounded-[50px] border flex flex-col gap-8 group transition-all duration-500 hover:border-indigo-500/40 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/40'}`}>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                       <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{site.url}</h3>
                       <a href={`http://${site.url}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 hover:text-indigo-400 transition-colors">
                          <ExternalLink size={18} />
                       </a>
                    </div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{site.category}</p>
                  </div>
                  {getStatusBadge(site.status)}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { l: 'Traffic Units', v: site.stats.impressions.toLocaleString(), i: <BarChart3 size={12} /> },
                    { l: 'Conversion', v: site.stats.clicks.toLocaleString(), i: <TrendingUp size={12} /> },
                    { l: 'Network Yield', v: `$${site.stats.earnings.toFixed(2)}`, i: <ShieldCheck size={12} />, c: 'text-emerald-500' }
                  ].map((s, i) => (
                    <div key={i} className={`p-6 rounded-[28px] border space-y-2 ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                       <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">{s.i} {s.l}</p>
                       <p className={`text-2xl font-black ${s.c || (theme === 'dark' ? 'text-white' : 'text-slate-950')}`}>{s.v}</p>
                    </div>
                  ))}
                </div>

                {site.status === 'APPROVED' ? (
                  <div className="space-y-6">
                     <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500 flex items-center gap-2">
                           <LayoutIcon size={16} /> Native SDK Implementation
                        </h4>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(`<script src="https://adspredia.site/v1/sdk.js" data-zone="zp-${site.id}" async></script>`);
                            alert("Ad script copied to clipboard!");
                          }}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${theme === 'dark' ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white'}`}
                        >
                          <Copy size={12} /> Copy Protocol
                        </button>
                     </div>
                     <div className={`p-6 rounded-[28px] border font-mono text-xs leading-relaxed break-all ${theme === 'dark' ? 'bg-slate-950 border-slate-800 text-indigo-300' : 'bg-slate-950 text-indigo-400'}`}>
                       &lt;script src="https://adspredia.site/v1/sdk.js" data-zone="zp-{site.id}" async&gt;&lt;/script&gt;
                     </div>
                  </div>
                ) : (
                  <div className={`p-10 rounded-[32px] border border-dashed text-center space-y-3 ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <Clock className="mx-auto text-slate-700 opacity-20" size={32} />
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Awaiting Verification Result</p>
                  </div>
                )}
             </div>
           ))}
        </div>
      )}
    </div>
  );
};

export default Websites;
