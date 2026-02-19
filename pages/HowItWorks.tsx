
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  UserPlus, 
  CheckCircle2, 
  Wallet, 
  Globe, 
  Code, 
  TrendingUp, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useApp } from '../store/AppContext';

const HowItWorks: React.FC = () => {
  const { theme } = useApp();

  const earnerSteps = [
    { icon: <UserPlus />, title: 'Create Profile', desc: 'Sign up in 30 seconds and secure your 50-coin welcome bonus instantly.' },
    { icon: <CheckCircle2 />, title: 'Complete Tasks', desc: 'Browse hundreds of micro-tasks like social follows, video reviews, and app testing.' },
    { icon: <Zap />, title: 'Earn Coins', desc: 'Get rewarded immediately upon task verification. No waiting periods for your coins.' },
    { icon: <Wallet />, title: 'Instant Payout', desc: 'Withdraw your earnings to Binance, Payeer, or local wallets starting from just $0.10.' }
  ];

  const publisherSteps = [
    { icon: <Globe />, title: 'Add Domain', desc: 'Submit your website or blog for our 24-hour express verification process.' },
    { icon: <Code />, title: 'Integrate SDK', desc: 'Copy and paste our lightweight 2025 Native SDK into your site header.' },
    { icon: <ShieldCheck />, title: 'Quality Traffic', desc: 'Our AI filters every impression to ensure premium advertiser compliance.' },
    { icon: <TrendingUp />, title: 'Scale Revenue', desc: 'Watch your RPM grow as our engine optimizes ad placement for your audience.' }
  ];

  return (
    <div className="space-y-32 pb-24 animate-in fade-in duration-700">
      <section className="text-center space-y-6 max-w-4xl mx-auto pt-10">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-black tracking-widest ${theme === 'dark' ? 'bg-indigo-600/10 border-indigo-600/20 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600'}`}>
          THE BLUEPRINT
        </div>
        <h1 className={`text-5xl md:text-7xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
          Simple. Transparent. <br />
          <span className="text-indigo-600">Built for Growth.</span>
        </h1>
        <p className={`text-xl font-medium max-w-2xl mx-auto ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
          Whether you're looking to earn extra income or monetize your global traffic, Ads Predia provides the high-performance infrastructure you need.
        </p>
      </section>

      {/* Earner Path */}
      <section className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="flex items-center gap-4">
           <div className="h-px flex-1 bg-slate-800/20"></div>
           <h2 className={`text-2xl font-black uppercase tracking-[0.3em] ${theme === 'dark' ? 'text-slate-700' : 'text-slate-300'}`}>For Micro-Freelancers</h2>
           <div className="h-px flex-1 bg-slate-800/20"></div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
           {earnerSteps.map((step, i) => (
             <div key={i} className="relative group">
                <div className={`p-10 rounded-[40px] border h-full space-y-6 transition-all duration-500 hover:translate-y-[-10px] ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl'}`}>
                   <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${theme === 'dark' ? 'bg-indigo-600/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600 shadow-inner'}`}>
                      {React.cloneElement(step.icon as React.ReactElement, { size: 32 })}
                   </div>
                   <h3 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{step.title}</h3>
                   <p className={`text-sm font-medium leading-relaxed ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>{step.desc}</p>
                </div>
                {i < 3 && (
                   <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-10 text-slate-800/20">
                      <ArrowRight size={32} />
                   </div>
                )}
             </div>
           ))}
        </div>
      </section>

      {/* Publisher Path */}
      <section className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="flex items-center gap-4">
           <div className="h-px flex-1 bg-slate-800/20"></div>
           <h2 className={`text-2xl font-black uppercase tracking-[0.3em] ${theme === 'dark' ? 'text-slate-700' : 'text-slate-300'}`}>For Web Publishers</h2>
           <div className="h-px flex-1 bg-slate-800/20"></div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
           {publisherSteps.map((step, i) => (
             <div key={i} className="relative group">
                <div className={`p-10 rounded-[40px] border h-full space-y-6 transition-all duration-500 hover:translate-y-[-10px] ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl'}`}>
                   <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${theme === 'dark' ? 'bg-emerald-600/10 text-emerald-500' : 'bg-emerald-50 text-emerald-600 shadow-inner'}`}>
                      {React.cloneElement(step.icon as React.ReactElement, { size: 32 })}
                   </div>
                   <h3 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{step.title}</h3>
                   <p className={`text-sm font-medium leading-relaxed ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>{step.desc}</p>
                </div>
                {i < 3 && (
                   <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-10 text-slate-800/20">
                      <ArrowRight size={32} />
                   </div>
                )}
             </div>
           ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-10">
         <h2 className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Ready to join the 2025 network?</h2>
         <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <NavLink to="/signup" className="px-12 py-5 bg-indigo-600 text-white rounded-3xl font-black text-xl shadow-2xl shadow-indigo-600/30 hover:scale-105 transition-all">
               Start Earning Today
            </NavLink>
            <NavLink to="/login" className={`px-12 py-5 border-2 rounded-3xl font-black text-xl hover:bg-slate-900/5 transition-all ${theme === 'dark' ? 'border-slate-800 text-white' : 'border-slate-200 text-slate-950'}`}>
               Monetize My Site
            </NavLink>
         </div>
      </section>
    </div>
  );
};

export default HowItWorks;
