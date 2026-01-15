
import React from 'react';
import { useApp } from '../store/AppContext';
import { Check, X, ShieldAlert, Globe, DollarSign, ClipboardCheck } from 'lucide-react';

const AdminHub: React.FC = () => {
  const { transactions, websites, approveTransaction, approveWebsite, currentUser } = useApp();

  if (currentUser?.role !== 'ADMIN') {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
        <ShieldAlert size={64} className="text-red-500" />
        <h1 className="text-3xl font-black">Access Denied</h1>
        <p className="text-slate-400 max-w-md">You do not have administrative privileges to access this section.</p>
      </div>
    );
  }

  const pendingTransactions = transactions.filter(t => t.status === 'PENDING');
  const pendingWebsites = websites.filter(w => w.status === 'PENDING');

  return (
    <div className="space-y-12 pb-12">
      <header>
        <h1 className="text-4xl font-black bg-gradient-to-r from-red-500 to-indigo-500 bg-clip-text text-transparent">Admin Command Center</h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest">System Management & Approval Hub</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Pending Deposits/Withdrawals */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <DollarSign className="text-emerald-500" />
            <h2 className="text-2xl font-bold">Transaction Requests</h2>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-black">{pendingTransactions.length}</span>
          </div>
          
          <div className="space-y-4">
            {pendingTransactions.length === 0 ? (
              <p className="text-slate-500 italic p-8 bg-slate-900 rounded-3xl border border-slate-800 text-center">No pending transactions</p>
            ) : (
              pendingTransactions.map(tx => (
                <div key={tx.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold">{tx.type} request from {tx.userId.substr(0, 6)}...</h4>
                    <p className="text-sm text-slate-400">{tx.amount} coins via {tx.method}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => approveTransaction(tx.id)} className="p-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all">
                      <Check size={20} />
                    </button>
                    <button className="p-3 bg-red-600 hover:bg-red-500 rounded-xl transition-all">
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Website Approvals */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Globe className="text-indigo-500" />
            <h2 className="text-2xl font-bold">Website Approvals</h2>
            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 rounded-full text-xs font-black">{pendingWebsites.length}</span>
          </div>

          <div className="space-y-4">
            {pendingWebsites.length === 0 ? (
              <p className="text-slate-500 italic p-8 bg-slate-900 rounded-3xl border border-slate-800 text-center">No pending websites</p>
            ) : (
              pendingWebsites.map(ws => (
                <div key={ws.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold truncate max-w-[200px]">{ws.url}</h4>
                    <p className="text-sm text-slate-400">Category: {ws.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => approveWebsite(ws.id)} className="p-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all">
                      <Check size={20} />
                    </button>
                    <button className="p-3 bg-red-600 hover:bg-red-500 rounded-xl transition-all">
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminHub;
