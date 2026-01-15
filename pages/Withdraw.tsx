
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { PAYMENT_METHODS } from '../constants';
import { 
  ArrowUpCircle, 
  Wallet, 
  Info, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  CreditCard
} from 'lucide-react';

const mockRecentWithdrawals = [
  { user: 'user_92x', amount: 1500, method: 'Binance', time: '2m ago' },
  { user: 'pro_trader', amount: 5000, method: 'Payeer', time: '15m ago' },
  { user: 'ads_king', amount: 500, method: 'JazzCash', time: '45m ago' },
];

const Withdraw: React.FC = () => {
  const { currentUser, addTransaction, updateUserBalance } = useApp();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  if (!currentUser) return null;

  const minWithdraw = 500;
  const conversionRate = 5000; // 5000 coins = $1
  const withdrawAmount = parseInt(amount) || 0;
  const usdValue = (withdrawAmount / conversionRate).toFixed(2);
  const canWithdraw = withdrawAmount >= minWithdraw && withdrawAmount <= currentUser.coins;

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canWithdraw || !selectedMethod || !address) return;

    setLoading(true);
    setTimeout(() => {
      // Add transaction
      const newTx = {
        id: Math.random().toString(36).substr(2, 9),
        userId: currentUser.id,
        type: 'WITHDRAW' as const,
        amount: withdrawAmount,
        method: selectedMethod,
        status: 'PENDING' as const,
        date: new Date().toISOString()
      };
      
      addTransaction(newTx);
      updateUserBalance(-withdrawAmount);
      
      setLoading(false);
      alert(`Withdrawal request of ${withdrawAmount} coins ($${usdValue}) submitted successfully! It will be processed within 12-48 hours.`);
      setAmount('');
      setAddress('');
      setSelectedMethod('');
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white">Cash Out Earnings</h1>
          <p className="text-slate-400">Convert your hard-earned coins into real-world currency.</p>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
           <ShieldCheck size={20} className="text-emerald-500" />
           <span className="text-emerald-500 font-bold text-sm">Secure Payout Network</span>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Form Column */}
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={handleWithdraw} className="p-8 rounded-[40px] bg-slate-900 border border-slate-800 space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
            
            <div className="grid md:grid-cols-2 gap-8">
               {/* Amount Input */}
               <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-400 ml-1">Withdrawal Amount (Coins)</label>
                  <div className="relative">
                    <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      required 
                      type="number" 
                      min={minWithdraw}
                      placeholder={`Min. ${minWithdraw}`}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-5 pl-12 pr-4 outline-none focus:ring-2 ring-indigo-600 transition-all font-black text-xl text-white placeholder:text-slate-700"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-end">
                       <span className="text-[10px] font-black text-slate-500 uppercase">Estimated Value</span>
                       <span className="text-emerald-400 font-black">${usdValue}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-1">
                     <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Balance: <span className="text-white">{currentUser.coins}</span></p>
                     <button type="button" onClick={() => setAmount(currentUser.coins.toString())} className="text-[10px] text-indigo-400 font-black uppercase hover:underline">Max Amount</button>
                  </div>
               </div>

               {/* Address Input */}
               <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-400 ml-1">Receiving Address / Account</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g., Wallet ID or Phone No."
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-5 pl-12 pr-4 outline-none focus:ring-2 ring-indigo-600 transition-all font-medium text-white placeholder:text-slate-700"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 italic ml-1">Double check your details before submitting.</p>
               </div>
            </div>

            {/* Method Selection */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-400 ml-1">Select Disbursement Method</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {PAYMENT_METHODS.map(method => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedMethod(method.id)}
                    className={`flex flex-col items-center gap-3 p-4 rounded-3xl border transition-all ${selectedMethod === method.id ? 'bg-indigo-600/10 border-indigo-600 ring-2 ring-indigo-600/20' : 'bg-slate-950 border-slate-800 opacity-60 hover:opacity-100'}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center p-2 border border-slate-800">
                       <img src={method.icon} className="w-full h-full object-contain" alt={method.name} />
                    </div>
                    <span className="text-[9px] font-black text-white uppercase text-center tracking-tighter">{method.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading || !canWithdraw || !selectedMethod || !address}
              className={`w-full py-5 rounded-3xl font-black text-xl transition-all shadow-2xl flex items-center justify-center gap-3 ${canWithdraw && selectedMethod && address ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/40' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
            >
              {loading ? <Loader2 className="animate-spin" /> : <>EXECUTE PAYOUT <ArrowUpCircle size={24} /></>}
            </button>
          </form>

          {/* Recent Payouts Ticker */}
          <div className="p-8 rounded-[40px] bg-slate-900/50 border border-slate-800 space-y-6">
             <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                   <TrendingUp size={20} className="text-indigo-400" /> Recent Live Payouts
                </h3>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] animate-pulse">Live Tracking</span>
             </div>
             <div className="grid md:grid-cols-3 gap-4">
                {mockRecentWithdrawals.map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 flex items-center justify-between hover:bg-slate-900 transition-colors">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-600/10 text-indigo-400 flex items-center justify-center text-xs font-bold">{item.user[0].toUpperCase()}</div>
                        <div className="flex flex-col">
                           <span className="text-xs font-bold text-white">{item.user}</span>
                           <span className="text-[9px] text-slate-500">{item.method}</span>
                        </div>
                     </div>
                     <div className="text-right">
                        <span className="text-xs font-black text-emerald-400">+{item.amount}</span>
                        <p className="text-[8px] text-slate-600 uppercase font-black">{item.time}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-8 rounded-[40px] bg-indigo-600/5 border border-indigo-600/20 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Info className="text-indigo-400" size={20} /> Withdrawal Metrics
            </h3>
            <div className="space-y-4">
               <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Minimum Limit</span>
                  <span className="font-bold text-white">{minWithdraw} Coins</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Fixed Rate</span>
                  <span className="font-bold text-emerald-400">5000 = $1.00 USD</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Processing Time</span>
                  <span className="font-bold text-indigo-400">12 - 48 Hours</span>
               </div>
               <div className="pt-6 border-t border-slate-800/50 space-y-2">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Network Fees</p>
                  <p className="text-sm text-white font-bold flex items-center gap-2">
                     <CheckCircle2 size={16} className="text-emerald-500" /> FREE - $0.00
                  </p>
               </div>
            </div>

            {withdrawAmount > 0 && withdrawAmount < minWithdraw && (
              <div className="p-4 rounded-3xl bg-red-500/10 border border-red-500/20 flex gap-3 animate-bounce">
                 <AlertCircle className="text-red-500 shrink-0" size={20} />
                 <p className="text-xs text-red-200 leading-relaxed font-bold">
                   You need {minWithdraw - withdrawAmount} more coins to reach the payout threshold.
                 </p>
              </div>
            )}
          </div>

          <div className="p-8 rounded-[40px] bg-slate-900 border border-slate-800 space-y-4">
             <h4 className="font-bold text-slate-300 flex items-center gap-2">
                <ShieldCheck size={18} className="text-indigo-400" /> Compliance
             </h4>
             <ul className="space-y-3 text-[11px] text-slate-500 leading-relaxed">
                <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-indigo-500 mt-1.5 shrink-0"></div> Multiple account abuse will result in withdrawal rejection.</li>
                <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-indigo-500 mt-1.5 shrink-0"></div> Ensure KYC verification is complete for large withdrawals.</li>
                <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-indigo-500 mt-1.5 shrink-0"></div> Cryptocurrency payments are subject to network confirmations.</li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
