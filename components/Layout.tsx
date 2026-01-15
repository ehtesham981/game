
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// Added missing icons: Rocket, Globe, Star, CheckCircle2
import { Menu, X, LogOut, ChevronRight, User as UserIcon, Moon, Sun, Rocket, Globe, Star, CheckCircle2 } from 'lucide-react';
import { NAV_ITEMS, ADMIN_NAV_ITEMS } from '../constants';
import { useApp } from '../store/AppContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, logout, theme, toggleTheme } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  const navLinks = currentUser?.role === 'ADMIN' 
    ? [...NAV_ITEMS, ...ADMIN_NAV_ITEMS] 
    : NAV_ITEMS;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 text-slate-200' : 'bg-white text-slate-900'} overflow-x-hidden font-inter`}>
      {/* Navbar - 2025 Style */}
      <nav className={`sticky top-0 z-[60] border-b h-20 transition-all duration-500 ${theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white/95 border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)]'} backdrop-blur-xl`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between h-full items-center">
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => { navigate('/'); setIsMenuOpen(false); }}
            >
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-indigo-500/30 text-white group-hover:scale-110 transition-transform duration-300">A</div>
              <span className={`text-2xl font-black tracking-tighter transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Ads Predia</span>
            </div>

            {/* Desktop Navigation for Public/Auth */}
            {!currentUser && (
               <div className="hidden lg:flex items-center gap-10">
                  <NavLink to="/" className={`text-sm font-black uppercase tracking-widest ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>Network</NavLink>
                  <NavLink to="/tasks" className={`text-sm font-black uppercase tracking-widest ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>Earnings</NavLink>
                  <NavLink to="/websites" className={`text-sm font-black uppercase tracking-widest ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>Publishers</NavLink>
               </div>
            )}

            {/* Controls */}
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={toggleTheme}
                className={`p-3 rounded-2xl border transition-all duration-300 transform hover:scale-110 ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700 shadow-lg' : 'bg-slate-50 border-slate-200 text-indigo-600 hover:bg-slate-100 shadow-md'}`}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {currentUser ? (
                <>
                  <div className={`flex items-center gap-4 px-5 py-2 rounded-2xl border transition-all cursor-pointer group ${theme === 'dark' ? 'border-slate-800 hover:border-slate-700' : 'border-slate-100 hover:border-indigo-100 bg-slate-50/50'}`} onClick={() => navigate('/settings')}>
                    <div className="flex flex-col items-end">
                      <span className={`text-sm font-black transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{currentUser.username}</span>
                      <span className="text-xs text-yellow-500 font-black tracking-wider">{currentUser.coins} COINS</span>
                    </div>
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all group-hover:rotate-6 ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-950 shadow-inner'}`}>
                      <UserIcon size={20} />
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all text-sm font-black shadow-lg shadow-red-500/5"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-4">
                  <NavLink to="/login" className={`px-6 py-3 text-sm font-black transition-colors ${theme === 'dark' ? 'text-slate-300 hover:text-indigo-400' : 'text-slate-600 hover:text-indigo-600'}`}>Login</NavLink>
                  <NavLink to="/signup" className="px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-black transition-all shadow-xl shadow-indigo-600/20 active:scale-95">Get Started</NavLink>
                </div>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-4">
               {!currentUser && <NavLink to="/signup" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black shadow-lg">JOIN</NavLink>}
              <button 
                onClick={toggleMenu} 
                className={`p-2 transition-colors focus:outline-none z-[70] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-950'}`}
              >
                {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className={`md:hidden fixed inset-0 top-20 z-[55] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300 ${theme === 'dark' ? 'bg-slate-950/98' : 'bg-white/98'} backdrop-blur-xl`}
        >
          <div className="p-8 space-y-6 max-w-lg mx-auto">
             <div className="flex justify-center mb-8">
                <button 
                  onClick={toggleTheme}
                  className={`p-4 rounded-3xl border flex items-center gap-4 w-full justify-center ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-yellow-400' : 'bg-slate-50 border-slate-200 text-indigo-600'}`}
                >
                  {theme === 'dark' ? <><Sun size={24} /> LIGHT MODE</> : <><Moon size={24} /> DARK MODE</>}
                </button>
             </div>

            {currentUser ? (
              <div className={`p-6 rounded-3xl border mb-8 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200 shadow-xl'}`}>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-2xl">
                    {currentUser.username[0].toUpperCase()}
                  </div>
                  <div>
                    <h4 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{currentUser.username}</h4>
                    <p className="text-sm text-yellow-500 font-black tracking-widest">{currentUser.coins} COINS</p>
                  </div>
                </div>
              </div>
            ) : null}
            
            <div className="space-y-2">
              <p className={`text-xs font-black uppercase tracking-[0.3em] px-4 mb-4 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Navigation Hub</p>
              {(currentUser ? navLinks : [
                { name: 'Home', path: '/', icon: <Rocket /> },
                { name: 'Tasks', path: '/tasks', icon: <ChevronRight /> },
                { name: 'Publishers', path: '/websites', icon: <Globe /> }
              ]).map((item) => (
                <NavLink 
                  key={item.path} 
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({isActive}) => `flex items-center justify-between p-5 rounded-2xl transition-all ${isActive ? 'bg-indigo-600 text-white shadow-2xl' : theme === 'dark' ? 'hover:bg-slate-900 text-slate-300' : 'hover:bg-slate-100 text-slate-700'}`}
                >
                  <div className="flex items-center gap-4">
                    {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
                    <span className="font-black text-lg">{item.name}</span>
                  </div>
                  <ChevronRight size={20} className="opacity-30" />
                </NavLink>
              ))}
            </div>

            {currentUser ? (
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-4 p-5 rounded-2xl text-red-500 hover:bg-red-500 hover:text-white transition-all font-black border border-red-500/20 mt-8"
              >
                <LogOut size={24} /> Logout Securely
              </button>
            ) : (
              <div className="pt-8 space-y-4">
                <NavLink to="/login" onClick={() => setIsMenuOpen(false)} className={`block w-full text-center py-5 rounded-2xl border font-black text-lg ${theme === 'dark' ? 'border-slate-800 text-slate-200 hover:bg-slate-900' : 'border-slate-200 text-slate-900 hover:bg-slate-50 shadow-md'}`}>Login Partner</NavLink>
                <NavLink to="/signup" onClick={() => setIsMenuOpen(false)} className="block w-full text-center py-5 rounded-2xl bg-indigo-600 font-black text-white text-lg shadow-2xl shadow-indigo-600/30">Claim 50 Coins Bonus</NavLink>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar (Desktop Only) */}
        {currentUser && (
          <aside className={`hidden md:flex flex-col w-72 border-r sticky top-20 h-[calc(100vh-80px)] overflow-y-auto p-8 space-y-3 transition-all duration-500 ${theme === 'dark' ? 'border-slate-900 bg-slate-950/50' : 'border-slate-100 bg-slate-50/30'}`}>
            <p className={`text-[10px] font-black uppercase tracking-[0.4em] px-4 mb-4 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>Navigation</p>
            {navLinks.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path}
                className={({isActive}) => `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${isActive ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40' : theme === 'dark' ? 'text-slate-400 hover:bg-slate-900 hover:text-white' : 'text-slate-500 hover:bg-white hover:text-slate-950 hover:shadow-xl hover:shadow-slate-200/50'}`}
              >
                <span className="transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
                <span className="font-black tracking-tight">{item.name}</span>
              </NavLink>
            ))}
          </aside>
        )}

        {/* Content Wrapper */}
        <main className={`flex-1 min-w-0 transition-all duration-500 ${!currentUser ? 'pt-10' : 'p-6 sm:p-10 lg:p-12 max-w-7xl mx-auto'}`}>
          {children}
        </main>
      </div>

      {/* Footer 2025 Style */}
      <footer className={`border-t py-24 px-8 transition-all duration-500 ${theme === 'dark' ? 'bg-slate-950 border-slate-900' : 'bg-slate-50 border-slate-100'}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-white shadow-xl">A</div>
              <span className={`text-3xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Ads Predia</span>
            </div>
            <p className={`text-lg leading-relaxed font-medium max-w-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              The 2025 micro-freelancing and monetization hub. High CPM ad rates and verified engagement for a global community of 50,000+ partners.
            </p>
            <div className="flex gap-4">
               {[1,2,3,4].map(i => (
                  <div key={i} className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all cursor-pointer ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-600' : 'bg-white border-slate-200 text-slate-500 hover:bg-indigo-600 hover:text-white shadow-sm'}`}>
                     <Star size={20} />
                  </div>
               ))}
            </div>
          </div>

          <div>
            <h4 className={`font-black mb-8 uppercase tracking-[0.2em] text-xs ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Network Hub</h4>
            <ul className={`space-y-4 text-sm font-bold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              <li><NavLink to="/" className="hover:text-indigo-600 transition-colors">Digital Pulse</NavLink></li>
              <li><NavLink to="/tasks" className="hover:text-indigo-600 transition-colors">Earning Zone</NavLink></li>
              <li><NavLink to="/websites" className="hover:text-indigo-600 transition-colors">Monetization V2</NavLink></li>
              <li><NavLink to="/wallet" className="hover:text-indigo-600 transition-colors">Secure Wallet</NavLink></li>
            </ul>
          </div>

          <div>
            <h4 className={`font-black mb-8 uppercase tracking-[0.2em] text-xs ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Compliance</h4>
            <ul className={`space-y-4 text-sm font-bold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Shield</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Partner Agreement</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Anti-Fraud Policy</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className={`font-black uppercase tracking-[0.2em] text-xs ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Partner Support</h4>
            <div className={`p-6 rounded-3xl border font-mono text-sm font-black transition-all group cursor-pointer ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-indigo-400' : 'bg-white border-slate-200 text-indigo-600 shadow-xl shadow-indigo-600/5'}`}>
              <span className="block text-[10px] text-slate-500 mb-1 font-sans uppercase">Priority Support</span>
              support@adspredia.site
            </div>
            <div className={`p-6 rounded-3xl border font-bold text-xs ${theme === 'dark' ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-500' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
               <span className="flex items-center gap-2"><CheckCircle2 size={14} /> SECURE CLOUD GATEWAY</span>
            </div>
          </div>
        </div>
        
        <div className={`max-w-7xl mx-auto border-t mt-24 pt-12 flex flex-col md:flex-row items-center justify-between gap-6 ${theme === 'dark' ? 'border-slate-900' : 'border-slate-100'}`}>
           <p className={`text-[11px] font-black uppercase tracking-[0.4em] ${theme === 'dark' ? 'text-slate-700' : 'text-slate-400'}`}>
              &copy; 2025 ADS PREDIA NETWORK &bull; GLOBAL DISTRIBUTED HUB
           </p>
           <div className="flex gap-8">
              {['SERVER_STABLE', 'PAYMENTS_ONLINE', 'TASKS_ACTIVE'].map(status => (
                 <div key={status} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className={`text-[10px] font-black tracking-widest ${theme === 'dark' ? 'text-slate-800' : 'text-slate-300'}`}>{status}</span>
                 </div>
              ))}
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
