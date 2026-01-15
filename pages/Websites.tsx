
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { 
  Globe, 
  Plus, 
  Search, 
  ExternalLink, 
  TrendingUp, 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Copy,
  Layout
} from 'lucide-react';

const Websites: React.FC = () => {
  const { websites, addWebsite, currentUser } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSite, setNewSite] = useState({ url: '', category: 'Blog' });

  const categories = ['Blog', 'Entertainment', 'E-commerce', 'Forum', 'News', 'Tools', 'Other'];

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
    alert("Website submitted for review! Our team will verify it within 24 hours.");
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'APPROVED':
        return <span className="flex items-center gap-1 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20"><CheckCircle2 size={12} /> Approved</span>;
      case 'PENDING':
        return <span className="flex items-center gap-1 px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-yellow-500/20"><Clock size={12} /> Pending Review</span>;
      case 'REJECTED':
        return <span className="flex items-center gap-1 px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-500/20"><XCircle size={12} /> Rejected</span>;
      default:
        return null;
    }
  };

  const userWebsites = websites.filter(w => w.ownerId === currentUser?.id);

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Website Monetization</h1>
          <p className="text-slate-400">Add your domains and turn your traffic into revenue.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all shadow-xl shadow-indigo-600/20"
        >
          <Plus size={20} /> Add New Website
        </button>
      </header>

      {/* Add Website Modal Overlay */}
      {showAddForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowAddForm(false)}></div>
          <div className="relative bg-slate-900 border border-slate-800 rounded-[40px] p-8 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
             <h2 className="text-2xl font-black mb-6">Submit Website</h2>
             <form onSubmit={handleAddWebsite} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 ml-1">Domain URL</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      required 
                      type="text" 
                      placeholder="example.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 ring-indigo-600 transition-all font-medium text-white"
                      value={newSite.url}
                      onChange={(e) => setNewSite({...newSite, url: e.target.value})}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 ml-1">Example: myawesomeblog.com (No http/https needed)</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 ml-1">Content Category</label>
                  <select 
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-4 outline-none focus:ring-2 ring-indigo-600 transition-all font-medium text-white appearance-none"
                    value={newSite.category}
                    onChange={(e) => setNewSite({...newSite, category: e.target.value})}
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/20"
                  >
                    Submit for Review
                  </button>
                </div>
             </form>
          </div>
        </div>
      )}

      {userWebsites.length === 0 ? (
        <div className="p-16 text-center bg-slate-900/50 border border-dashed border-slate-800 rounded-[40px] space-y-4">
           <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto text-slate-700">
              <Globe size={40} />
           </div>
           <h3 className="text-2xl font-bold text-slate-300">No websites added yet</h3>
           <p className="text-slate-500 max-w-md mx-auto">Submit your first website to start displaying premium ads and earning revenue based on your traffic quality.</p>
           <button 
             onClick={() => setShowAddForm(true)}
             className="px-8 py-3 bg-indigo-600/10 text-indigo-400 border border-indigo-600/20 rounded-2xl font-bold hover:bg-indigo-600 hover:text-white transition-all"
           >
             Get Started
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {userWebsites.map((site) => (
             <div key={site.id} className="p-8 rounded-[32px] bg-slate-900 border border-slate-800 flex flex-col gap-6 group hover:border-indigo-500/30 transition-all">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                       <h3 className="text-2xl font-black text-white">{site.url}</h3>
                       <a href={`http://${site.url}`} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-indigo-400 transition-colors">
                          <ExternalLink size={16} />
                       </a>
                    </div>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{site.category}</p>
                  </div>
                  {getStatusBadge(site.status)}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/50 space-y-1">
                     <p className="text-[10px] font-black text-slate-500 uppercase">Impressions</p>
                     <p className="text-xl font-bold text-white">{site.stats.impressions.toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/50 space-y-1">
                     <p className="text-[10px] font-black text-slate-500 uppercase">Clicks</p>
                     <p className="text-xl font-bold text-white">{site.stats.clicks.toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/50 space-y-1">
                     <p className="text-[10px] font-black text-emerald-500 uppercase tracking-wider">Earnings</p>
                     <p className="text-xl font-bold text-emerald-400">${site.stats.earnings.toFixed(2)}</p>
                  </div>
                </div>

                {site.status === 'APPROVED' ? (
                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white">Integration Script</h4>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(`<script src="https://adspredia.site/v1/sdk.js" data-zone="zp-${site.id}" async></script>`);
                            alert("Ad script copied to clipboard!");
                          }}
                          className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                          <Copy size={14} /> Copy Script
                        </button>
                     </div>
                     <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-indigo-300 leading-relaxed break-all">
                       &lt;script src="https://adspredia.site/v1/sdk.js" data-zone="zp-{site.id}" async&gt;&lt;/script&gt;
                     </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/50 text-center">
                    <p className="text-xs text-slate-500 italic">Ads integration will be available once the domain is approved.</p>
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
