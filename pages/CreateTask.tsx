
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { 
  PlusSquare, 
  Link as LinkIcon, 
  Type, 
  AlignLeft, 
  Coins, 
  Users, 
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Camera,
  Info
} from 'lucide-react';

const CreateTask: React.FC = () => {
  const { currentUser, addTask, updateUserBalance } = useApp();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    reward: 100,
    target: 10,
    requireScreenshot: false
  });

  const totalCost = formData.reward * formData.target;
  const canAfford = currentUser ? currentUser.coins >= totalCost : false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    if (!canAfford) {
      alert("Insufficient coin balance. Please deposit more coins.");
      return;
    }

    const newTask = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      description: formData.description,
      link: formData.link,
      reward: formData.reward,
      ownerId: currentUser.id,
      status: 'ACTIVE' as const,
      requireScreenshot: formData.requireScreenshot
    };

    // Deduct coins and add task
    updateUserBalance(-totalCost);
    addTask(newTask);

    alert(`Success! "${formData.title}" has been created. ${totalCost} coins deducted.`);
    navigate('/tasks');
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <header>
        <h1 className="text-3xl font-black text-white">Promote Your Content</h1>
        <p className="text-slate-400">Create a micro-task and get real engagement from our community.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="p-8 rounded-[40px] bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 ml-1">Task Title</label>
                <div className="relative">
                  <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g., Subscribe to my YouTube Channel"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 ring-indigo-600 transition-all font-medium text-white"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 ml-1">Target Link</label>
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    required 
                    type="url" 
                    placeholder="https://youtube.com/c/yourchannel"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 ring-indigo-600 transition-all font-medium text-white"
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 ml-1">Description / Instructions</label>
                <div className="relative">
                  <AlignLeft className="absolute left-4 top-4 text-slate-500" size={18} />
                  <textarea 
                    required 
                    rows={3}
                    placeholder="Provide clear steps for the users to follow..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 ring-indigo-600 transition-all font-medium text-white"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>

              {/* Requirement Toggles */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className={`p-2 rounded-xl ${formData.requireScreenshot ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                          <Camera size={18} />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-white">Require Screenshot Proof</p>
                          <p className="text-[10px] text-slate-500">Users must upload a screenshot for approval</p>
                       </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, requireScreenshot: !formData.requireScreenshot})}
                      className={`w-12 h-6 rounded-full transition-colors relative ${formData.requireScreenshot ? 'bg-indigo-600' : 'bg-slate-700'}`}
                    >
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.requireScreenshot ? 'translate-x-6' : ''}`}></div>
                    </button>
                 </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 ml-1">Reward per User (Coins)</label>
                  <div className="relative">
                    <Coins className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      required 
                      type="number" 
                      min="50"
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 ring-indigo-600 transition-all font-medium text-white"
                      value={formData.reward}
                      onChange={(e) => setFormData({...formData, reward: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 ml-1">Total Target Users</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      required 
                      type="number" 
                      min="1"
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 ring-indigo-600 transition-all font-medium text-white"
                      value={formData.target}
                      onChange={(e) => setFormData({...formData, target: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={!canAfford}
              className={`w-full py-4 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-2 ${canAfford ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
            >
              {canAfford ? (
                <>Create Task & Deduct Coins <ArrowRight size={20} /></>
              ) : (
                <>Insufficient Balance</>
              )}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="p-8 rounded-[40px] bg-slate-900 border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white">Campaign Summary</h3>
            <div className="space-y-4">
               <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Available Balance</span>
                  <span className="font-bold text-white">{currentUser.coins} Coins</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Total Campaign Cost</span>
                  <span className={`font-bold ${canAfford ? 'text-indigo-400' : 'text-red-400'}`}>{totalCost} Coins</span>
               </div>
               <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                  <span className="font-bold text-white">Remaining After</span>
                  <span className="font-black text-xl text-emerald-400">{currentUser.coins - totalCost}</span>
               </div>
            </div>

            {!canAfford && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex gap-3">
                 <AlertTriangle className="text-red-500 shrink-0" size={20} />
                 <p className="text-xs text-red-200 leading-relaxed">
                   You need {totalCost - currentUser.coins} more coins to launch this campaign. <button onClick={() => navigate('/deposit')} className="text-white font-bold underline">Deposit Now</button>
                 </p>
              </div>
            )}
          </div>

          <div className="p-8 rounded-[40px] bg-indigo-600/10 border border-indigo-600/20 space-y-4">
             <h4 className="font-bold text-indigo-400 flex items-center gap-2">
                <CheckCircle2 size={18} /> Proof Guidelines
             </h4>
             <ul className="space-y-3 text-xs text-indigo-200/70 leading-relaxed">
                <li>• {formData.requireScreenshot ? "Users WILL be required to upload a screenshot proof." : "This task only requires a visit verification."}</li>
                <li>• Screenshot proof increases quality but might slow down completions.</li>
                <li>• You can manually reject tasks with invalid proofs in your dashboard.</li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
