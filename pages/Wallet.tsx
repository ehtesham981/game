
import React from 'react';
import { useApp } from '../store/AppContext';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Download,
  Filter
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Wallet: React.FC = () => {
  const { currentUser, transactions } = useApp();

  if (!currentUser) return null;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'COMPLETED': return 'bg-emerald-500/10 text-emerald-500';
      case 'PENDING': return 'bg-yellow-500/10 text-yellow-500';
      case 'FAILED': return 'bg-red-500/10 text-red-500';
      default: return 'bg-slate-500/10 text-slate-500';
    }
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'DEPOSIT': return <ArrowDownLeft className="text-emerald-500" />;
      case 'WITHDRAW': return <ArrowUpRight className="text-red-500" />;
      default: return <CheckCircle2 className="text-indigo-500" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black">Financial Wallet</h1>
          <p className="text-slate-400">Manage your earnings and network budget.</p>
        </div>
        <div className="flex gap-3">
           <NavLink to="/deposit" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold flex items-center gap-2 transition-all">
             <ArrowDownLeft size={18} /> Deposit
           </NavLink>
           <NavLink to="/withdraw" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold flex items-center gap-2 transition-all">
             <ArrowUpRight size={18} /> Withdraw
           </NavLink>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Balance Overview */}
        <div className="lg:col-span-1 space-y-6">
           <div className="p-8 rounded-[40px] bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Download size={120} />
              </div>
              <p className="text-indigo-100 text-sm font-bold uppercase tracking-widest mb-2">Available Coins</p>
              <h2 className="text-5xl font-black mb-1">{currentUser.coins}</h2>
              <p className="text-indigo-200 text-sm font-medium">≈ ${(currentUser.coins * 0.0002).toFixed(2)} USD</p>
              
              <div className="mt-12 pt-8 border-t border-white/10 space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-indigo-200 text-sm">Ad Revenue</span>
                    <span className="font-bold text-xl">${currentUser.revenue.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-indigo-200 text-sm">Referral Bonus</span>
                    <span className="font-bold text-xl">${(currentUser.referralsCount * 5).toFixed(2)}</span>
                 </div>
              </div>
           </div>

           <div className="p-8 rounded-[32px] bg-slate-900 border border-slate-800">
              <h3 className="text-lg font-bold mb-4">Currency Conversion</h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-sm p-3 rounded-xl bg-slate-950">
                    <span className="text-slate-400">5000 Coins</span>
                    <span className="font-bold text-emerald-400">$1.00 USD</span>
                 </div>
                 <div className="flex justify-between items-center text-sm p-3 rounded-xl bg-slate-950">
                    <span className="text-slate-400">Min. Withdraw</span>
                    <span className="font-bold text-indigo-400">500 Coins ($0.10)</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Transaction History */}
        <div className="lg:col-span-2 space-y-6">
           <div className="p-8 rounded-[32px] bg-slate-900 border border-slate-800 flex flex-col min-h-[400px]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold">Transaction History</h3>
                <button className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all">
                  <Filter size={20} />
                </button>
              </div>

              {transactions.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                   <Clock size={64} className="mb-4" />
                   <p className="text-xl font-bold">No transactions found</p>
                   <p className="text-sm">Start earning coins to see your history here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.filter(t => t.userId === currentUser.id).map(tx => (
                    <div key={tx.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800/50 flex items-center justify-between group hover:bg-slate-900 transition-all">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center">
                             {getIcon(tx.type)}
                          </div>
                          <div>
                             <h4 className="font-bold">{tx.type}</h4>
                             <p className="text-xs text-slate-500">{new Date(tx.date).toLocaleDateString()} • {tx.method || 'System'}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className={`font-bold ${tx.type === 'DEPOSIT' || tx.type === 'EARN' ? 'text-emerald-400' : 'text-red-400'}`}>
                            {tx.type === 'DEPOSIT' || tx.type === 'EARN' ? '+' : '-'}{tx.amount}
                          </p>
                          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${getStatusColor(tx.status)}`}>
                             {tx.status}
                          </span>
                       </div>
                    </div>
                  ))}
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
