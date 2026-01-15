
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Rocket, 
  Target, 
  Shield, 
  Zap, 
  TrendingUp, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Coins, 
  MousePointer2,
  ShieldCheck,
  Star,
  Users,
  Search,
  Briefcase,
  Layers,
  Cpu,
  Handshake,
  Layout as LayoutIcon,
  PlayCircle,
  Video,
  Smartphone,
  BarChart3,
  Globe2
} from 'lucide-react';
import { useApp } from '../store/AppContext';

const Home: React.FC = () => {
  const { theme } = useApp();

  return (
    <div className={`space-y-32 -mt-10 pb-24 overflow-hidden`}>
      {/* --- HERO SECTION: 2025 IMMERSIVE --- */}
      <section className="relative pt-24 pb-20">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] blur-[150px] -z-10 rounded-full opacity-30 ${theme === 'dark' ? 'bg-indigo-600/20' : 'bg-indigo-400/10'}`}></div>
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border text-[10px] font-black tracking-[0.3em] ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600 shadow-sm'}`}>
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping"></span>
              ADS PREDIA NETWORK V3.0
            </div>
            
            <h1 className={`text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
              Micro-Freelancing <br />
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">Reimagined.</span>
            </h1>
            
            <p className={`text-xl md:text-2xl font-medium leading-relaxed max-w-xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              The global 2025 hub for micro-task earners and website publishers. Complete premium tasks or monetize your traffic with elite ad-tech.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <NavLink to="/signup" className="group relative w-full sm:w-auto px-12 py-6 rounded-3xl bg-indigo-600 hover:bg-indigo-500 text-white text-xl font-black transition-all shadow-2xl shadow-indigo-600/40 hover:-translate-y-1 overflow-hidden text-center">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Join as Earner <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </NavLink>
              <NavLink to="/login" className={`w-full sm:w-auto px-12 py-6 rounded-3xl border font-black text-xl transition-all flex items-center justify-center gap-3 hover:bg-slate-900/5 ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-950 shadow-xl shadow-slate-200/50'}`}>
                Monetize Site
              </NavLink>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`w-11 h-11 rounded-full border-2 ${theme === 'dark' ? 'border-slate-950 bg-slate-800' : 'border-white bg-slate-100'} flex items-center justify-center font-bold text-xs`}>U{i}</div>
                ))}
              </div>
              <p className={`text-sm font-black ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                <span className={`${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>52,000+</span> ACTIVE PARTNERS
              </p>
            </div>
          </div>

          <div className="relative hidden lg:block animate-in fade-in zoom-in duration-1000 delay-200">
             <div className={`p-10 rounded-[60px] border relative z-20 ${theme === 'dark' ? 'bg-slate-900/80 border-slate-800 backdrop-blur-xl shadow-2xl' : 'bg-white/90 border-slate-100 backdrop-blur-xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)]'}`}>
                <div className="flex items-center justify-between mb-10">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
                         <BarChart3 size={24} />
                      </div>
                      <div>
                         <h4 className={`font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Live Network Pulse</h4>
                         <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Global Payouts Active</p>
                      </div>
                   </div>
                   <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                      <TrendingUp size={20} className="text-indigo-600" />
                   </div>
                </div>

                <div className="space-y-4">
                   {[
                     { user: 'Sarah_X', task: 'App Testing', coin: '+1,500', time: '1m ago', color: 'text-emerald-500' },
                     { user: 'Mike_Pro', task: 'Ad Revenue', coin: '+$42.50', time: '5m ago', color: 'text-indigo-500' },
                     { user: 'Alex_Ad', task: 'Social Share', coin: '+250', time: '12m ago', color: 'text-emerald-500' }
                   ].map((item, i) => (
                      <div key={i} className={`flex items-center justify-between p-5 rounded-[28px] border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100 shadow-sm'}`}>
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-xs">{item.user[0]}</div>
                            <div>
                               <p className={`text-xs font-black ${theme === 'dark' ? 'text-slate-200' : 'text-slate-900'}`}>{item.user}</p>
                               <p className="text-[10px] text-slate-500 font-bold uppercase">{item.task}</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className={`font-black ${item.color}`}>{item.coin}</p>
                            <p className="text-[9px] text-slate-400 font-bold">{item.time}</p>
                         </div>
                      </div>
                   ))}
                </div>

                <div className={`mt-10 p-6 rounded-[32px] border ${theme === 'dark' ? 'bg-indigo-600/10 border-indigo-600/20' : 'bg-indigo-50 border-indigo-200'}`}>
                   <div className="flex justify-between items-center text-xs font-black text-indigo-500 uppercase tracking-widest mb-2">
                      <span>Daily Distributed</span>
                      <span>2025 Goal: 98%</span>
                   </div>
                   <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>$42,490.00 <span className="text-xs font-medium text-slate-400 italic">USD</span></h3>
                </div>
             </div>
             {/* Decorative Blobs */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl -z-10"></div>
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* --- FOR FREELANCERS: THE EARNING HUB --- */}
      <section className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6">
           <div className="space-y-4">
              <h2 className={`text-5xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Freelancer Opportunities</h2>
              <p className={`text-xl font-medium max-w-xl ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Simple tasks. Instant verification. Real payouts to your preferred wallet.</p>
           </div>
           <NavLink to="/tasks" className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-colors">
              Browse All Tasks
           </NavLink>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
           {[
             { title: 'Social Boost', icon: <Users />, desc: 'Follow, like, and share content for verified creators.', reward: '10-50 Coins' },
             { title: 'Content Review', icon: <Video />, desc: 'Watch premium videos and provide quality feedback.', reward: '50-100 Coins' },
             { title: 'Mobile Testing', icon: <Smartphone />, desc: 'Install and test the latest 2025 digital products.', reward: '500+ Coins' },
             { title: 'Surveys', icon: <Search />, desc: 'Share your expert opinion on emerging market trends.', reward: '200+ Coins' }
           ].map((card, i) => (
             <div key={i} className={`p-8 rounded-[40px] border group hover:translate-y-[-10px] transition-all duration-500 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl'}`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${theme === 'dark' ? 'bg-indigo-600/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600 shadow-inner'}`}>
                   {React.cloneElement(card.icon as React.ReactElement, { size: 28 })}
                </div>
                <h3 className={`text-xl font-black mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{card.title}</h3>
                <p className={`text-sm font-medium mb-8 leading-relaxed ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{card.desc}</p>
                <div className="pt-6 border-t border-slate-800/20 flex items-center justify-between">
                   <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">{card.reward}</span>
                   <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                      <ArrowRight size={14} />
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* --- FOR PUBLISHERS: MONETIZATION ENGINE --- */}
      <section className={`py-32 ${theme === 'dark' ? 'bg-slate-900/40' : 'bg-slate-50'}`}>
         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
               <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20">
                  <LayoutIcon size={16} /> 2025 PUBLISHER SUITE
               </div>
               <h2 className={`text-5xl md:text-6xl font-black tracking-tighter leading-[1.1] ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                  Monetize Any Traffic. <br />
                  <span className="text-indigo-600">Maximize Every Click.</span>
               </h2>
               <p className={`text-xl font-medium leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Integrate our AI-driven native ad SDK into your website or blog. High-fill rates, premium advertisers, and instant domain approval.
               </p>

               <div className="grid sm:grid-cols-2 gap-8">
                  {[
                    { t: '99.9% Fill Rate', d: 'Global inventory ensures no lost revenue.' },
                    { t: 'Instant Approval', d: 'Add your domain and start earning in 1 hour.' },
                    { t: 'Clean & Safe Ads', d: 'No malware, no redirections, purely native.' },
                    { t: 'Express Payouts', d: 'Withdraw as low as $0.10 instantly.' }
                  ].map((feat, i) => (
                    <div key={i} className="flex gap-4">
                       <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center mt-1">
                          <CheckCircle2 size={14} />
                       </div>
                       <div>
                          <h5 className={`font-black mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{feat.t}</h5>
                          <p className="text-sm font-medium text-slate-500 leading-snug">{feat.d}</p>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="pt-6">
                  <NavLink to="/signup" className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-3xl font-black text-lg transition-all shadow-2xl shadow-indigo-600/30 inline-flex items-center gap-3">
                     Add Your Site <Globe2 size={20} />
                  </NavLink>
               </div>
            </div>

            <div className="relative">
               <div className={`aspect-square rounded-[60px] border p-12 relative overflow-hidden ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-2xl'}`}>
                  <div className="space-y-8">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                              <LayoutIcon size={20} />
                           </div>
                           <h4 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Ad Zone Preview</h4>
                        </div>
                        <div className="px-4 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">Active Widget</div>
                     </div>

                     <div className="grid grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map(i => (
                           <div key={i} className={`p-4 rounded-3xl border border-dashed ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                              <div className="w-full aspect-video bg-indigo-600/10 rounded-2xl mb-3 flex items-center justify-center text-indigo-400 font-black text-[10px] tracking-widest">NATIVE AD</div>
                              <div className="h-2 w-full bg-slate-400/20 rounded-full mb-2"></div>
                              <div className="h-2 w-2/3 bg-slate-400/20 rounded-full"></div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
               {/* Accent decoration */}
               <div className="absolute -bottom-10 -right-10 p-8 rounded-[40px] bg-slate-950 text-white shadow-2xl border border-slate-800 space-y-2 animate-bounce duration-[5000ms]">
                  <p className="text-[10px] font-black uppercase text-slate-500">Live CPM Rate</p>
                  <p className="text-4xl font-black text-emerald-400">$4.12+</p>
                  <p className="text-[9px] font-bold text-slate-600 italic">Target: Tier 1 Traffic</p>
               </div>
            </div>
         </div>
      </section>

      {/* --- NETWORK STATS: GLOBAL SCALE --- */}
      <section className={`py-32 relative ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-indigo-600 shadow-[0_40px_100px_-20px_rgba(79,70,229,0.3)]'}`}>
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Total Payouts', val: '$14.2M+', icon: <Coins />, color: 'text-white' },
              { label: 'Active Partners', val: '52,000+', icon: <Users />, color: 'text-white' },
              { label: 'Ad Impressions', val: '2.4B+', icon: <MousePointer2 />, color: 'text-white' },
              { label: 'Network Uptime', val: '99.98%', icon: <Zap />, color: 'text-white' },
            ].map((stat, i) => (
              <div key={i} className="space-y-4">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto text-white backdrop-blur-md">
                   {stat.icon}
                 </div>
                 <h4 className="text-4xl md:text-5xl font-black text-white">{stat.val}</h4>
                 <p className="text-sm font-black uppercase tracking-[0.2em] text-white/60">{stat.label}</p>
              </div>
            ))}
         </div>
      </section>

      {/* --- TRUST & COMPLIANCE --- */}
      <section className="max-w-7xl mx-auto px-6 space-y-20">
         <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className={`text-5xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Trusted Infrastructure</h2>
            <p className={`text-xl font-medium ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Every task and every ad impression is filtered through our proprietary "Shield v3" anti-fraud engine.</p>
         </div>

         <div className="grid md:grid-cols-3 gap-8">
            <div className={`p-10 rounded-[50px] border space-y-8 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl'}`}>
               <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-3xl flex items-center justify-center border border-emerald-500/20">
                  <ShieldCheck size={32} />
               </div>
               <h3 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Anti-Bot Protection</h3>
               <p className={`font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>We filter 99.9% of bot traffic to ensure real advertisers get real human engagement from real earners.</p>
            </div>
            <div className={`p-10 rounded-[50px] border space-y-8 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl'}`}>
               <div className="w-16 h-16 bg-indigo-600/10 text-indigo-600 rounded-3xl flex items-center justify-center border border-indigo-600/20">
                  <Handshake size={32} />
               </div>
               <h3 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Fair Share Model</h3>
               <p className={`font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Transparent revenue split. We take a minimal 5% network fee, ensuring earners keep the lion's share of rewards.</p>
            </div>
            {/* Fix: Corrected syntax for card div className and fixed structural errors that were causing cascading failures */}
            <div className={`p-10 rounded-[50px] border space-y-8 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl'}`}>
               <div className="w-16 h-16 bg-purple-600/10 text-purple-600 rounded-3xl flex items-center justify-center border border-purple-600/20">
                  <Layers size={32} />
               </div>
               <h3 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Multi-Format Ads</h3>
               <p className={`font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Choose from Banners, Pop-unders, Social Bars, and Native widgets that blend perfectly with your content.</p>
            </div>
         </div>
      </section>

      {/* --- FINAL CALL TO ACTION --- */}
      <section className="max-w-7xl mx-auto px-6">
         <div className={`p-20 md:p-32 rounded-[70px] relative overflow-hidden text-center space-y-12 ${theme === 'dark' ? 'bg-indigo-600' : 'bg-slate-950 shadow-2xl shadow-slate-200'}`}>
            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <div className="grid grid-cols-12 h-full">
                  {[...Array(12)].map((_, i) => <div key={i} className="border-r border-white/20"></div>)}
               </div>
            </div>
            
            <div className="relative z-10 space-y-8">
               <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />)}
               </div>
               <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">
                  Launch your <br /> revenue engine.
               </h2>
               <p className="text-indigo-100 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                  Join 52,000+ creators who trust Ads Predia for micro-freelancing and monetization. No registration fees. No hidden costs.
               </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-8">
               <NavLink to="/signup" className="w-full sm:w-auto px-16 py-7 bg-white text-indigo-600 rounded-[32px] font-black text-2xl shadow-2xl hover:scale-105 transition-all active:scale-95">
                  GET STARTED FREE
               </NavLink>
               <NavLink to="/login" className="w-full sm:w-auto px-16 py-7 bg-transparent border-2 border-white/20 text-white rounded-[32px] font-black text-2xl hover:bg-white/5 transition-all">
                  LOGIN PARTNER
               </NavLink>
            </div>
            
            <p className="relative z-10 text-[10px] font-black uppercase tracking-[0.5em] text-indigo-200/50">INSTANT ACCESS &bull; VERIFIED PAYOUTS &bull; 24/7 SUPPORT</p>
         </div>
      </section>
    </div>
  );
};

export default Home;
