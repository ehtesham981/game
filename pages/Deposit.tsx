
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { PAYMENT_METHODS } from '../constants';
import { Check, Upload, DollarSign, Loader2 } from 'lucide-react';

const Deposit: React.FC = () => {
  const { currentUser, addTransaction } = useApp();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [txId, setTxId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setLoading(true);
    
    setTimeout(() => {
      const newTx = {
        id: Math.random().toString(36).substr(2, 9),
        userId: currentUser.id,
        type: 'DEPOSIT' as const,
        amount: parseInt(amount),
        method: selectedMethod,
        status: 'PENDING' as const,
        date: new Date().toISOString()
      };
      addTransaction(newTx);
      setLoading(false);
      alert("Deposit request submitted! Once verified by our team, coins will be added.");
      setSelectedMethod('');
      setAmount('');
      setTxId('');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <header>
        <h1 className="text-3xl font-black">Add Funds</h1>
        <p className="text-slate-400">Increase your advertising budget instantly.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Methods */}
        <div className="md:col-span-1 space-y-4">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest px-2">Select Method</p>
          <div className="space-y-3">
            {PAYMENT_METHODS.map(method => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${selectedMethod === method.id ? 'bg-indigo-600/10 border-indigo-600 text-indigo-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}`}
              >
                <div className="flex items-center gap-3">
                  <img src={method.icon} className="w-8 h-8 object-contain" alt={method.name} />
                  <span className="font-bold">{method.name}</span>
                </div>
                {selectedMethod === method.id && <Check size={20} />}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="p-8 rounded-[32px] bg-slate-900 border border-slate-800 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400">Amount (Coins)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    required 
                    type="number" 
                    placeholder="Min. 5000" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 ring-indigo-600"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Conversion: 5000 Coins = $1.00 USD</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400">Transaction ID</label>
                <input 
                  required 
                  type="text" 
                  placeholder="Paste Hash/ID here" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-4 outline-none focus:ring-2 ring-indigo-600"
                  value={txId}
                  onChange={(e) => setTxId(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400">Screenshot Proof</label>
              <div className="border-2 border-dashed border-slate-800 rounded-3xl p-8 text-center space-y-2 hover:border-indigo-600/50 transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-slate-800 rounded-full mx-auto flex items-center justify-center text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Upload size={20} />
                </div>
                <p className="font-bold">Drop your image here or click to browse</p>
                <p className="text-xs text-slate-500">Max file size: 5MB (JPG, PNG)</p>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading || !selectedMethod}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-black text-lg transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Confirm Deposit"}
            </button>
          </form>

          {/* Payment Instructions */}
          {selectedMethod && (
            <div className="mt-8 p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
               <h4 className="font-bold text-indigo-400 mb-2">Instructions for {selectedMethod.toUpperCase()}</h4>
               <p className="text-sm text-indigo-100/70 leading-relaxed">
                 1. Transfer the exact amount of USDT/PKR to the address: <br />
                 <span className="font-mono bg-slate-950 px-2 py-1 rounded mt-1 inline-block">AP_NETWORK_129X03LK_DEPOSIT</span> <br />
                 2. Take a screenshot of the successful transaction. <br />
                 3. Paste the Transaction ID/Hash above and click confirm.
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Deposit;
