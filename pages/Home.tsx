
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Zap, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  Coins, 
  MousePointer2, 
  Layers, 
  Smartphone,
  Video,
  PlayCircle,
  Layout as LayoutIcon,
  Star,
  Globe2,
  BarChart3,
  Cpu,
  Handshake,
  Search,
  Activity,
  DollarSign,
  Rocket
} from 'lucide-react';
import { useApp } from '../store/AppContext';

const Home: React.FC = () => {
  const { theme } = useApp();

  return (
    <div className="space-y-32 -mt-10 pb-32 overflow-hidden">
      {/* --- HERO SECTION: THE "HEADER" OF CONTENT --- */}
      <section className="relative pt-32 pb-20">
        {/* Ambient background glows */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[800px] blur-[160px] -z-10 rounded-full opacity-40 animate-pulse ${theme === 'dark' ? 'bg-indigo-600/20' : 'bg-indigo-400/10'}`}></div>
        <div className={`absolute -top-20 -right-20 w-[600px] h-[600px] blur-[120px] -z-10 rounded-full opacity-20 ${theme === 'dark' ? 'bg-purple-600/20' : 'bg-purple-400/10'}`}></div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 animate-in fade-in slide-in-from-left-12 duration-1000">
            <div className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-full border text-[10px] font-black tracking-[0.3em] ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600 shadow-sm'}`}>
              <span className="flex h-3 w-3 rounded-full bg-indigo-500 animate-ping"></span>
              ADS PREDIA NETWORK V3.0 • 2025
            </div>
            
            <h1 className={`text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
              Where Traffic <br />
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent italic">Becomes Capital.</span>
            </h1>
            
            <p className={`text-xl md:text-2xl font-medium leading-relaxed max-w-xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              The global hub for micro-task earners and website publishers. Earn coins through engagement or scale your revenue with premium ad-tech.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <NavLink to="/signup" className="group relative w-full sm:w-auto px-12 py-6 rounded-[32px] bg-indigo-600 hover:bg-indigo-500 text-white text-xl font-black transition-all shadow-2xl shadow-indigo-600/40 hover:-translate-y-1 overflow-hidden text-center">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Start Earning <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </NavLink>
              <NavLink to="/login" className={`w-full sm:w-auto px-12 py-6 rounded-[32px] border font-black text-xl transition-all flex items-center justify-center gap-3 hover:scale-[1.02] ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-950 shadow-xl shadow-slate-200/50'}`}>
                Monetize Traffic
              </NavLink>
            </div>

            <div className="flex items-center gap-8 pt-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`w-12 h-12 rounded-full border-4 ${theme === 'dark' ? 'border-slate-950 bg-slate-800' : 'border-white bg-slate-100'} overflow-hidden shadow-lg flex items-center justify-center font-black text-xs`}>
                    {i === 5 ? '50k+' : <img src={`https://i.pravatar.cc/150?u=ap-${i}`} alt="user" />}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className={`text-sm font-black ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                  <span className={`${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>52,400+</span> ACTIVE PARTNERS
                </p>
              </div>
            </div>
          </div>

          {/* Feature Bento Card */}
          <div className="relative hidden lg:block animate-in fade-in zoom-in duration-1000 delay-300">
            <div className={`p-10 rounded-[60px] border relative z-20 transform rotate-1 hover:rotate-0 transition-transform duration-700 ${theme === 'dark' ? 'bg-slate-900/90 border-slate-800 backdrop-blur-2xl shadow-2xl' : 'bg-white/95 border-slate-100 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.15)] backdrop-blur-md'}`}>
               <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/30">
                        <Activity size={24} />
                     </div>
                     <div>
                        <h4 className={`font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Global Earning Pulse</h4>
                        <p className="text-[10px] text-emerald-500 font-black tracking-widest uppercase">Verified Payouts Live</p>
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  {[
                    { u: 'Alex_Vortex', t: 'Task Completed', a: '+150 Coins', c: 'text-indigo-500', time: '12s ago' },
                    { u: 'Sarah_Work', t: 'Ad Impression', a: '+$0.42 USD', c: 'text-emerald-500', time: '45s ago' },
                    { u: 'Pro_Publisher', t: 'Withdrawal Success', a: '+$42.00', c: 'text-emerald-500', time: '2m ago' }
                  ].map((item, i) => (
                    <div key={i} className={`p-5 rounded-[28px] border flex items-center justify-between ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100 shadow-sm'}`}>
                       <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'} flex items-center justify-center text-xs font-black`}>{item.u[0]}</div>
                          <div>
                             <p className={`text-xs font-black ${theme === 'dark' ? 'text-slate-200' : 'text-slate-900'}`}>{item.u}</p>
                             <p className="text-[9px] text-slate-500 font-bold uppercase">{item.t}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <span className={`font-black text-sm block ${item.c}`}>{item.a}</span>
                          <span className="text-[8px] text-slate-400 font-black uppercase">{item.time}</span>
                       </div>
                    </div>
                  ))}
               </div>
               
               <div className={`mt-8 p-6 rounded-[32px] border ${theme === 'dark' ? 'bg-indigo-600/10 border-indigo-600/20' : 'bg-indigo-50 border-indigo-200'}`}>
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">Network Capital</span>
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  </div>
                  <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>$14.2M+ <span className="text-xs font-medium text-slate-500">Paid to Partners</span></h3>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BODY: EARNING OPPORTUNITIES --- */}
      <section className="max-w-7xl mx-auto px-6 space-y-24">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
           <h2 className={`text-5xl md:text-6xl font-black tracking-tighter leading-[1.1] ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
             The Multi-Channel <br />
             <span className="text-indigo-600">Earning Ecosystem.</span>
           </h2>
           <p className={`text-xl font-medium ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
             Ads Predia connects brands with real human engagement. No bots, just high-value tasks and elite ad placements.
           </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
           {/* Earn Channel 1 */}
           <div className={`p-10 rounded-[50px] border space-y-8 group transition-all duration-500 hover:-translate-y-4 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-2xl'}`}>
              <div className="w-16 h-16 rounded-[24px] bg-indigo-600/10 text-indigo-600 flex items-center justify-center border border-indigo-600/20 group-hover:scale-110 transition-transform">
                 <Users size={32} />
              </div>
              <div className="space-y-4">
                 <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Social Tasks</h3>
                 <p className={`font-medium leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Follow, share, and engage with verified creators. High volume tasks available 24/7.
                 </p>
              </div>
              <ul className="space-y-3">
                 {['Verified Followers', 'Telegram Engagement', 'Content Amplification'].map(item => (
                   <li key={item} className="flex items-center gap-3 text-xs font-black text-slate-500 uppercase tracking-widest">
                      <CheckCircle2 size={14} className="text-emerald-500" /> {item}
                   </li>
                 ))}
              </ul>
              <div className="pt-6 border-t border-slate-800/10 flex justify-between items-center">
                 <span className="text-xs font-black text-emerald-500 uppercase">Yield: High</span>
                 <NavLink to="/signup" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 hover:text-indigo-600 transition-colors">
                    <ArrowRight size={20} />
                 </NavLink>
              </div>
           </div>

           {/* Earn Channel 2 */}
           <div className={`p-10 rounded-[50px] border space-y-8 group transition-all duration-500 hover:-translate-y-4 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-2xl'}`}>
              <div className="w-16 h-16 rounded-[24px] bg-purple-600/10 text-purple-600 flex items-center justify-center border border-purple-600/20 group-hover:scale-110 transition-transform">
                 <Video size={32} />
              </div>
              <div className="space-y-4">
                 <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Media Stream</h3>
                 <p className={`font-medium leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Watch sponsored content and provide reviews. Earn passively while staying updated.
                 </p>
              </div>
              <ul className="space-y-3">
                 {['Pass-thru Monetization', 'Focus Tracking', 'Instant Coin Credit'].map(item => (
                   <li key={item} className="flex items-center gap-3 text-xs font-black text-slate-500 uppercase tracking-widest">
                      <CheckCircle2 size={14} className="text-emerald-500" /> {item}
                   </li>
                 ))}
              </ul>
              <div className="pt-6 border-t border-slate-800/10 flex justify-between items-center">
                 <span className="text-xs font-black text-emerald-500 uppercase">Yield: Consistent</span>
                 <NavLink to="/signup" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 hover:text-indigo-600 transition-colors">
                    <ArrowRight size={20} />
                 </NavLink>
              </div>
           </div>

           {/* Earn Channel 3 */}
           <div className={`p-10 rounded-[50px] border space-y-8 group transition-all duration-500 hover:-translate-y-4 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-2xl'}`}>
              <div className="w-16 h-16 rounded-[24px] bg-emerald-600/10 text-emerald-600 flex items-center justify-center border border-emerald-600/20 group-hover:scale-110 transition-transform">
                 <LayoutIcon size={32} />
              </div>
              <div className="space-y-4">
                 <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Ad Monetization</h3>
                 <p className={`font-medium leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Monetize your web traffic with our Native SDK. High-fill rates and premium CPMs.
                 </p>
              </div>
              <ul className="space-y-3">
                 {['99.9% Fill Rate', 'Native Integration', 'Universal Geographies'].map(item => (
                   <li key={item} className="flex items-center gap-3 text-xs font-black text-slate-500 uppercase tracking-widest">
                      <CheckCircle2 size={14} className="text-emerald-500" /> {item}
                   </li>
                 ))}
              </ul>
              <div className="pt-6 border-t border-slate-800/10 flex justify-between items-center">
                 <span className="text-xs font-black text-emerald-500 uppercase">Yield: Massive</span>
                 <NavLink to="/signup" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 hover:text-indigo-600 transition-colors">
                    <ArrowRight size={20} />
                 </NavLink>
              </div>
           </div>
        </div>
      </section>

      {/* --- REVENUE SHOWCASE: PUBLISHER TIERS --- */}
      <section className={`py-32 ${theme === 'dark' ? 'bg-slate-900/40 border-y border-slate-800/50' : 'bg-slate-50'}`}>
         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
               <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20">
                  <BarChart3 size={16} /> 2025 YIELD REPORT
               </div>
               <h2 className={`text-6xl font-black tracking-tighter leading-[1.05] ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                  Scaling Revenue <br />
                  <span className="text-indigo-600">Without Limits.</span>
               </h2>
               <p className={`text-xl font-medium leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Whether you have 100 or 1,000,000 visitors, our AI mediation layer optimizes every auction to fetch the highest possible bid for your inventory.
               </p>

               <div className="grid grid-cols-2 gap-8">
                  {[
                    { label: 'Avg. CPM (Tier 1)', val: '$4.12' },
                    { label: 'Instant Approval', val: '< 24H' },
                    { label: 'Minimum Payout', val: '$0.10' },
                    { label: 'Integration Time', val: '5 Mins' },
                  ].map((stat, i) => (
                    <div key={i} className="space-y-1">
                       <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">{stat.label}</p>
                       <p className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{stat.val}</p>
                    </div>
                  ))}
               </div>

               <div className="pt-8">
                  <NavLink to="/signup" className="px-12 py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[32px] font-black text-2xl transition-all shadow-2xl shadow-indigo-600/30 inline-flex items-center gap-4">
                     Add My Domain <Globe2 size={24} />
                  </NavLink>
               </div>
            </div>

            <div className="relative">
               <div className={`p-12 rounded-[60px] border shadow-2xl relative overflow-hidden ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-100'}`}>
                  <div className="flex items-center justify-between mb-12">
                     <h4 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Native Ad Formats</h4>
                     <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                     </div>
                  </div>
                  
                  <div className="space-y-8">
                     <div className="p-6 rounded-3xl bg-indigo-600/5 border border-indigo-600/10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
                              <Layers size={24} />
                           </div>
                           <div>
                              <p className={`font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Native Banners</p>
                              <p className="text-[10px] text-slate-500 uppercase font-black">Contextual Integration</p>
                           </div>
                        </div>
                        <span className="text-emerald-500 font-black text-xs">TOP ROI</span>
                     </div>

                     <div className="p-6 rounded-3xl bg-purple-600/5 border border-purple-600/10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white">
                              <MousePointer2 size={24} />
                           </div>
                           <div>
                              <p className={`font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Social Bars</p>
                              <p className="text-[10px] text-slate-500 uppercase font-black">High CTR Engagement</p>
                           </div>
                        </div>
                        <span className="text-emerald-500 font-black text-xs">POPULAR</span>
                     </div>

                     <div className="p-6 rounded-3xl bg-emerald-600/5 border border-emerald-600/10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white">
                              <Smartphone size={24} />
                           </div>
                           <div>
                              <p className={`font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>In-App Bidding</p>
                              <p className="text-[10px] text-slate-500 uppercase font-black">Mobile Focused</p>
                           </div>
                        </div>
                        <span className="text-emerald-500 font-black text-xs">ELITE</span>
                     </div>
                  </div>
               </div>
               {/* Decorative floating label */}
               <div className="absolute -bottom-10 -right-10 p-10 rounded-[40px] bg-slate-950 border border-slate-800 shadow-2xl text-white space-y-2 animate-bounce duration-[5000ms]">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Network Peak RPM</p>
                  <p className="text-4xl font-black text-indigo-400">$6.12</p>
               </div>
            </div>
         </div>
      </section>

      {/* --- EARNER MARKETPLACE: "THE FOOTER BODY" --- */}
      <section className="max-w-7xl mx-auto px-6 space-y-16">
         <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-b border-slate-800/10 pb-8">
            <div className="space-y-4">
               <h2 className={`text-5xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Campaign Catalog</h2>
               <p className={`text-xl font-medium ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Join thousands of earners completing tasks globally.</p>
            </div>
            <div className="flex gap-4">
               <div className={`px-5 py-2.5 rounded-2xl border text-xs font-black uppercase tracking-widest ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                  LIVE: 420+ Jobs
               </div>
            </div>
         </div>

         <div className="grid md:grid-cols-4 gap-8">
            {[
              { t: 'Sub & Like', v: '15 Coins', i: <Users />, c: 'bg-red-500/10 text-red-500' },
              { t: 'App Testing', v: '250 Coins', i: <Smartphone />, c: 'bg-indigo-500/10 text-indigo-500' },
              { t: 'Site Audit', v: '40 Coins', i: <Search />, c: 'bg-emerald-500/10 text-emerald-500' },
              { t: 'Survey Flow', v: '100 Coins', i: <CheckCircle2 />, c: 'bg-purple-500/10 text-purple-500' },
            ].map((task, i) => (
              <div key={i} className={`p-8 rounded-[40px] border space-y-6 group transition-all hover:border-indigo-500/30 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/40'}`}>
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${task.c}`}>
                    {React.cloneElement(task.i as React.ReactElement, { size: 28 })}
                 </div>
                 <div>
                    <h4 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{task.t}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Verification Req.</p>
                 </div>
                 <div className="flex items-center justify-between pt-6 border-t border-slate-800/10">
                    <span className="text-xl font-black text-indigo-500">{task.v}</span>
                    <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <ArrowRight size={14} />
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* --- FINAL CONVERSION FOOTER --- */}
      <section className="max-w-7xl mx-auto px-6">
         <div className={`p-20 md:p-32 rounded-[80px] relative overflow-hidden text-center space-y-12 ${theme === 'dark' ? 'bg-indigo-600' : 'bg-slate-950 shadow-2xl'}`}>
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
                  Scale your <br />
                  <span className="opacity-40 italic">Revenue Hub.</span>
               </h2>
               <p className="text-indigo-100 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                  Join 52,000+ creators and publishers who trust Ads Predia for high-performance micro-freelancing and monetization.
               </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-8">
               <NavLink to="/signup" className="w-full sm:w-auto px-16 py-7 bg-white text-indigo-600 rounded-[32px] font-black text-2xl shadow-2xl hover:scale-105 transition-all active:scale-95">
                  JOIN FOR FREE
               </NavLink>
               <NavLink to="/login" className="w-full sm:w-auto px-16 py-7 bg-transparent border-2 border-white/20 text-white rounded-[32px] font-black text-2xl hover:bg-white/5 transition-all">
                  LOGIN PARTNER
               </NavLink>
            </div>
            
            <p className="relative z-10 text-[10px] font-black uppercase tracking-[0.6em] text-indigo-200/40">24/7 SUPPORT • GLOBAL REACH • VERIFIED PAYOUTS</p>
         </div>
      </section>
    </div>
  );
};

export default Home;
