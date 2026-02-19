
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Layout, 
  ExternalLink, 
  MousePointer2, 
  Smartphone, 
  ShieldCheck, 
  Zap,
  CheckCircle2,
  TrendingUp,
  Monitor
} from 'lucide-react';
import { useApp } from '../store/AppContext';

const AdFormats: React.FC = () => {
  const { theme } = useApp();

  const formats = [
    {
      title: 'Native Banners',
      desc: 'Blends seamlessly with your content. Highest engagement rates for blogs and news portals.',
      cpm: 'High',
      icon: <Layout />,
      color: 'bg-indigo-600'
    },
    {
      title: 'Pop-Under',
      desc: 'Maximizes revenue without interrupting user flow. Perfect for entertainment sites.',
      cpm: 'Aggressive',
      icon: <ExternalLink />,
      color: 'bg-purple-600'
    },
    {
      title: 'Social Bar',
      desc: 'Interactive notifications that drive massive CTR. Great for mobile-first audiences.',
      cpm: 'Premium',
      icon: <MousePointer2 />,
      color: 'bg-emerald-600'
    },
    {
      title: 'Interstitials',
      desc: 'Full-screen ads for natural transitions. Premium rates for quality inventory.',
      cpm: 'Maximum',
      icon: <Smartphone />,
      color: 'bg-orange-600'
    }
  ];

  return (
    <div className="space-y-32 pb-24 animate-in fade-in duration-700">
      <section className="text-center space-y-6 max-w-4xl mx-auto pt-10">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-black tracking-widest ${theme === 'dark' ? 'bg-indigo-600/10 border-indigo-600/20 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600'}`}>
          MONETIZATION SUITE
        </div>
        <h1 className={`text-5xl md:text-7xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
          High-Fill Ad Formats. <br />
          <span className="text-emerald-500">Global Reach.</span>
        </h1>
        <p className={`text-xl font-medium max-w-2xl mx-auto ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
          Choose from our suite of 2025 ad formats designed to maximize your RPM while respecting your users' experience.
        </p>
      </section>

      {/* Formats Grid */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
         {formats.map((format, i) => (
           <div key={i} className={`p-10 rounded-[50px] border flex flex-col md:flex-row gap-10 group transition-all duration-500 hover:border-indigo-500/30 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-2xl'}`}>
              <div className="flex-1 space-y-6">
                 <div className={`w-16 h-16 ${format.color} rounded-3xl flex items-center justify-center text-white shadow-xl shadow-slate-900/10`}>
                    {React.cloneElement(format.icon as React.ReactElement, { size: 32 })}
                 </div>
                 <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{format.title}</h3>
                 <p className={`font-medium leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{format.desc}</p>
                 <div className="flex items-center gap-3">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-500">Revenue Potential:</span>
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-500/20">{format.cpm}</span>
                 </div>
              </div>
              
              <div className="flex-1">
                 {/* Live Preview Mockup */}
                 <div className={`aspect-video rounded-3xl border border-dashed relative overflow-hidden flex items-center justify-center ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-center space-y-2">
                       <Monitor size={48} className="mx-auto text-slate-700 opacity-20" />
                       <p className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Preview Mode</p>
                    </div>
                    {/* Simulated Floating Ad Element */}
                    <div className={`absolute bottom-4 right-4 p-4 rounded-2xl shadow-2xl border animate-bounce ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-100'}`}>
                       <div className="w-12 h-2 bg-indigo-500/20 rounded-full mb-2"></div>
                       <div className="w-8 h-2 bg-indigo-500/20 rounded-full"></div>
                    </div>
                 </div>
              </div>
           </div>
         ))}
      </section>

      {/* Benefits Table */}
      <section className="max-w-7xl mx-auto px-6">
         <div className={`p-12 md:p-20 rounded-[60px] border ${theme === 'dark' ? 'bg-slate-900 border-slate-800 shadow-2xl' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50'}`}>
            <div className="text-center space-y-4 mb-16">
               <h2 className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Network Benefits</h2>
               <p className="text-slate-500 font-medium">Why top publishers choose Ads Predia in 2025.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
               {[
                 { title: 'Anti-Adblock', icon: <ShieldCheck />, desc: 'Our scripts bypass common ad-blockers to reclaim lost revenue.' },
                 { title: 'Global Fill', icon: <Zap />, desc: '100% fill rates across all geographies with premium tier-1 inventory.' },
                 { title: 'Smart AI Pacing', icon: <TrendingUp />, desc: 'Dynamic frequency capping to protect user retention rates.' }
               ].map((benefit, i) => (
                 <div key={i} className="space-y-4 text-center">
                    <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                       {React.cloneElement(benefit.icon as React.ReactElement, { size: 32 })}
                    </div>
                    <h4 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{benefit.title}</h4>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed">{benefit.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 text-center">
         <NavLink to="/signup" className="px-16 py-6 bg-emerald-600 text-white rounded-[32px] font-black text-2xl shadow-2xl shadow-emerald-600/30 hover:scale-105 transition-all inline-block">
            Start Monetizing Now
         </NavLink>
      </section>
    </div>
  );
};

export default AdFormats;
