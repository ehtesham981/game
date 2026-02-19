
import React, { useState, useEffect } from 'react';
import { useApp } from '../store/AppContext';
import { 
  Play, 
  RefreshCw, 
  ChevronRight, 
  CheckCircle2, 
  Trophy,
  Video,
  Camera,
  Upload,
  X,
  ShieldCheck,
  ExternalLink,
  History,
  PlayCircle,
  Users,
  Search,
  Zap,
  Star,
  Smartphone,
  Coins
} from 'lucide-react';
import { Task } from '../types';

const Tasks: React.FC = () => {
  const { 
    tasks, 
    completeDailySpin, 
    completeDailyVideo, 
    completeDailyTask, 
    currentUser,
    theme
  } = useApp();
  
  const [activeTab, setActiveTab] = useState<'TASKS' | 'SPIN' | 'VIDEO'>('TASKS');
  const [spinLoading, setSpinLoading] = useState(false);
  const [videoTimer, setVideoTimer] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [timeLeftToReset, setTimeLeftToReset] = useState<string>('');
  const [wheelRotation, setWheelRotation] = useState(0);
  
  // Proof Submission state
  const [submittingProof, setSubmittingProof] = useState<Task | null>(null);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Spin Wheel configuration
  const spinPrizes = [3, 4, 7, 1, 4, 2, 0, 5];
  const DAILY_SPIN_LIMIT = 5;
  const VIDEO_REWARD = 5;

  useEffect(() => {
    const updateCountdown = () => {
      if (!currentUser?.lastDailyReset) return;
      const resetTime = new Date(currentUser.lastDailyReset).getTime() + (24 * 60 * 60 * 1000);
      const diff = resetTime - Date.now();
      
      if (diff <= 0) {
        setTimeLeftToReset('00:00:00');
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeftToReset(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();
    return () => clearInterval(interval);
  }, [currentUser?.lastDailyReset]);

  const handleSpin = () => {
    if (spinLoading || !currentUser) return;
    
    if (currentUser.dailySpinCount >= DAILY_SPIN_LIMIT) {
      alert(`Daily limit reached! Please come back in ${timeLeftToReset}`);
      return;
    }

    setSpinLoading(true);
    const randomIndex = Math.floor(Math.random() * spinPrizes.length);
    const win = spinPrizes[randomIndex];
    const segmentAngle = 360 / spinPrizes.length;
    const extraSpins = 5 * 360; 
    const finalRotation = wheelRotation + extraSpins + (360 - (randomIndex * segmentAngle));
    
    setWheelRotation(finalRotation);

    setTimeout(() => {
      completeDailySpin(win);
      setSpinLoading(false);
    }, 4000);
  };

  useEffect(() => {
    let interval: any;
    if (videoTimer > 0) {
      interval = setInterval(() => setVideoTimer(t => t - 1), 1000);
    } else if (isVideoPlaying) {
      completeDailyVideo(VIDEO_REWARD);
      setIsVideoPlaying(false);
    }
    return () => clearInterval(interval);
  }, [videoTimer, isVideoPlaying]);

  const startVideo = () => {
    if (currentUser?.dailyVideoWatched) {
      alert(`Daily video limit reached! Please come back in ${timeLeftToReset}`);
      return;
    }
    setIsVideoPlaying(true);
    setVideoTimer(15);
  };

  const handleTaskSubmit = () => {
    if (!submittingProof || !currentUser) return;
    setIsSubmitting(true);
    
    setTimeout(() => {
      completeDailyTask(submittingProof.id, submittingProof.reward);
      setSubmittingProof(null);
      setHasUploaded(false);
      setIsSubmitting(false);
    }, 1500);
  };

  if (!currentUser) return null;

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className={`text-5xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Earning Hub</h1>
          <p className={`text-lg font-bold ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>The global 2025 micro-task marketplace.</p>
        </div>
        <div className={`flex items-center gap-4 px-6 py-3 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'}`}>
           <History size={18} className="text-indigo-500" />
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Reset In</span>
              <span className={`text-sm font-black font-mono ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{timeLeftToReset}</span>
           </div>
        </div>
      </header>

      {/* Navigation Hub */}
      <div className={`flex flex-wrap gap-2 p-2 rounded-[32px] border w-fit ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
        {[
          { id: 'TASKS', label: 'Marketplace', icon: <CheckCircle2 size={18} /> },
          { id: 'SPIN', label: 'Lucky Wheel', icon: <RefreshCw size={18} /> },
          { id: 'VIDEO', label: 'Media Stream', icon: <Video size={18} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-3 px-8 py-4 rounded-[24px] font-black text-sm transition-all duration-300 ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30' : 'text-slate-500 hover:text-indigo-400 hover:bg-white/5'}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'TASKS' && (
        <div className="grid md:grid-cols-2 gap-8">
          {tasks.length === 0 ? (
            <div className={`md:col-span-2 p-20 rounded-[50px] border border-dashed text-center space-y-4 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
               <Zap size={48} className="mx-auto text-slate-700 opacity-20" />
               <h3 className="text-2xl font-black text-slate-500">No active tasks right now.</h3>
               <p className="text-slate-400">New campaigns are added every hour. Check back soon!</p>
            </div>
          ) : (
            tasks.map(task => {
              const isCompleted = currentUser.dailyTasksCompleted.includes(task.id);
              return (
                <div key={task.id} className={`p-10 rounded-[40px] border flex flex-col justify-between group transition-all duration-500 hover:-translate-y-2 ${theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/30' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/40'} ${isCompleted ? 'opacity-50 grayscale' : ''}`}>
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'}`}>
                          {isCompleted ? 'Completed' : 'Micro Task'}
                        </div>
                        {task.requireScreenshot && !isCompleted && (
                          <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${theme === 'dark' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                            <Camera size={12} /> PROOF REQ.
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Coins size={18} className="text-yellow-500" />
                        <span className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>+{task.reward}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className={`text-2xl font-black mb-3 group-hover:text-indigo-600 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{task.title}</h3>
                      <p className={`text-sm font-medium leading-relaxed ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>{task.description}</p>
                    </div>
                  </div>
                  
                  <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                    <button 
                      disabled={isCompleted}
                      onClick={() => setSubmittingProof(task)}
                      className={`flex-1 w-full py-5 rounded-[24px] font-black text-sm transition-all shadow-xl flex items-center justify-center gap-3 ${isCompleted ? 'bg-slate-800 text-slate-500' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'}`}
                    >
                      {isCompleted ? 'REPEAT IN 24H' : <><PlayCircle size={18} /> START ENGAGEMENT</>}
                    </button>
                    
                    {task.requireScreenshot && !isCompleted && (
                      <button 
                        onClick={() => setSubmittingProof(task)}
                        className={`flex-1 w-full py-5 rounded-[24px] border font-black text-sm transition-all flex items-center justify-center gap-3 ${theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white shadow-lg shadow-emerald-500/10' : 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white shadow-xl shadow-emerald-200/50'}`}
                      >
                        <Camera size={18} /> UPLOAD PROOF
                      </button>
                    )}
                    
                    <button className={`p-5 hidden sm:block rounded-[24px] border transition-colors ${theme === 'dark' ? 'bg-slate-950 border-slate-800 hover:bg-slate-800 text-slate-600' : 'bg-slate-50 border-slate-100 hover:bg-slate-100 text-slate-400'}`}>
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Proof Submission Modal */}
      {submittingProof && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={() => setSubmittingProof(null)}></div>
          <div className={`relative rounded-[50px] border p-12 w-full max-w-xl shadow-2xl animate-in zoom-in duration-300 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
             <div className="flex justify-between items-start mb-8">
                <div className="space-y-2">
                   <h2 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Submit Evidence</h2>
                   <p className="text-sm text-slate-500 font-medium">Follow the protocol to claim your {submittingProof.reward} coins.</p>
                </div>
                <button onClick={() => setSubmittingProof(null)} className="p-3 hover:bg-slate-800 rounded-full transition-colors text-slate-500">
                   <X size={24} />
                </button>
             </div>

             <div className="space-y-8">
                <div className={`p-8 rounded-[32px] border space-y-6 ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black">1</div>
                      <p className={`text-sm font-black ${theme === 'dark' ? 'text-slate-200' : 'text-slate-950'}`}>Perform Engagement</p>
                   </div>
                   <a 
                    href={submittingProof.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-5 bg-indigo-600/10 text-indigo-600 rounded-[20px] font-black hover:bg-indigo-600 hover:text-white transition-all border border-indigo-600/20"
                   >
                     Launch Campaign URL <ExternalLink size={18} />
                   </a>
                </div>

                <div className={`p-8 rounded-[32px] border space-y-6 ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black">2</div>
                      <p className={`text-sm font-black ${theme === 'dark' ? 'text-slate-200' : 'text-slate-950'}`}>
                        {submittingProof.requireScreenshot ? "Upload Visual Proof" : "Confirm Completion"}
                      </p>
                   </div>
                   
                   {submittingProof.requireScreenshot && (
                     <div 
                      onClick={() => setHasUploaded(true)}
                      className={`border-4 border-dashed rounded-[32px] p-10 text-center space-y-4 cursor-pointer transition-all ${hasUploaded ? 'bg-emerald-500/5 border-emerald-500/50' : 'bg-slate-900 border-slate-800 hover:border-indigo-500/50'}`}
                     >
                        {hasUploaded ? (
                          <div className="space-y-3">
                             <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto text-white shadow-xl shadow-emerald-500/30">
                                <CheckCircle2 size={32} />
                             </div>
                             <p className="text-sm font-black text-emerald-500 uppercase tracking-widest">Evidence Captured</p>
                          </div>
                        ) : (
                          <>
                            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-500 shadow-inner">
                               <Upload size={32} />
                            </div>
                            <div className="space-y-1">
                               <p className="text-sm font-black text-white">Select Proof Image</p>
                               <p className="text-[10px] text-slate-500 uppercase font-black">JPG / PNG / WEBP</p>
                            </div>
                          </>
                        )}
                     </div>
                   )}
                </div>

                <button 
                  onClick={handleTaskSubmit}
                  disabled={isSubmitting || (submittingProof.requireScreenshot && !hasUploaded)}
                  className={`w-full py-6 rounded-[28px] font-black text-lg transition-all flex items-center justify-center gap-3 ${isSubmitting || (submittingProof.requireScreenshot && !hasUploaded) ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-2xl shadow-indigo-600/40'}`}
                >
                  {isSubmitting ? <RefreshCw className="animate-spin" /> : <><ShieldCheck size={24} /> SECURE CLAIM REWARD</>}
                </button>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'SPIN' && (
        <div className={`max-w-xl mx-auto p-16 rounded-[60px] border text-center space-y-12 shadow-2xl relative overflow-hidden ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-slate-200/50'}`}>
           <div className="absolute top-0 right-0 p-10 opacity-5">
              <Trophy size={200} />
           </div>

           <div className="relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-8 w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-t-[36px] border-t-indigo-500 z-20 drop-shadow-2xl"></div>
              
              <div className={`w-80 h-80 mx-auto rounded-full border-[10px] p-3 shadow-inner ${theme === 'dark' ? 'border-slate-800' : 'border-slate-50 shadow-slate-300/50'}`}>
                 <div 
                  className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-500 flex items-center justify-center relative shadow-2xl overflow-hidden"
                  style={{ 
                    transform: `rotate(${wheelRotation}deg)`, 
                    transition: 'transform 4s cubic-bezier(0.15, 0, 0.15, 1)' 
                  }}
                 >
                    {spinPrizes.map((num, i) => {
                      const angle = 360 / spinPrizes.length;
                      return (
                        <div 
                          key={i} 
                          className="absolute inset-0 flex items-start justify-center pt-6" 
                          style={{ transform: `rotate(${i * angle}deg)` }}
                        >
                           <div className="absolute top-0 h-full w-[1px] bg-white/20 left-1/2 -translate-x-1/2"></div>
                           <div 
                            className="font-black text-3xl text-white drop-shadow-xl select-none italic"
                            style={{ transform: `rotate(${-i * angle}deg)` }}
                           >
                            {num}
                          </div>
                        </div>
                      );
                    })}
                    <div className="w-16 h-16 bg-white rounded-full z-10 shadow-2xl flex items-center justify-center text-indigo-600 border-4 border-white/50">
                       <Star size={32} className="fill-indigo-600" />
                    </div>
                 </div>
              </div>
           </div>

           <div className="space-y-8 relative z-10">
              <div className="space-y-3">
                 <h2 className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Lucky Wheel</h2>
                 <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Win up to 7 coins every spin.</p>
              </div>

              <div className={`p-6 rounded-[32px] border flex justify-between items-center max-w-[340px] mx-auto ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                 <div className="text-left">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Available Spins</p>
                    <p className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{DAILY_SPIN_LIMIT - currentUser.dailySpinCount} / {DAILY_SPIN_LIMIT}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Daily Reset In</p>
                    <p className="text-sm font-black font-mono text-indigo-500">{timeLeftToReset}</p>
                 </div>
              </div>

              <button 
                onClick={handleSpin}
                disabled={spinLoading || currentUser.dailySpinCount >= DAILY_SPIN_LIMIT}
                className={`w-full py-6 rounded-[28px] font-black text-xl shadow-2xl transition-all flex items-center justify-center gap-4 text-white ${spinLoading || currentUser.dailySpinCount >= DAILY_SPIN_LIMIT ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/40'}`}
              >
                {spinLoading ? <><RefreshCw className="animate-spin" /> SPINNING...</> : "ACTIVATE WHEEL"}
              </button>
           </div>
        </div>
      )}

      {activeTab === 'VIDEO' && (
        <div className="max-w-2xl mx-auto space-y-12 animate-in slide-in-from-bottom-8 duration-500">
          <div className={`aspect-video rounded-[60px] border flex items-center justify-center overflow-hidden relative group ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-2xl'} ${currentUser.dailyVideoWatched && !isVideoPlaying ? 'opacity-50' : ''}`}>
             {isVideoPlaying ? (
               <div className="text-center space-y-8 relative z-10">
                 <div className="text-9xl font-black text-indigo-500 animate-pulse tracking-tighter">{videoTimer}s</div>
                 <div className="flex items-center justify-center gap-3">
                    <RefreshCw className="animate-spin text-emerald-500" size={20} />
                    <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">Authenticating Engagement...</p>
                 </div>
               </div>
             ) : currentUser.dailyVideoWatched ? (
                <div className="text-center space-y-6">
                   <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                      <CheckCircle2 size={48} />
                   </div>
                   <div className="space-y-2">
                      <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Media Quota Reached</h3>
                      <p className="text-slate-500 font-bold">Your daily bonus resets in {timeLeftToReset}</p>
                   </div>
                </div>
             ) : (
               <>
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10"></div>
                 <img src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=1280&h=720" className="absolute inset-0 object-cover opacity-20 scale-110 group-hover:scale-100 transition-transform duration-[4000ms]" alt="Video Preview" />
                 
                 <div className="relative z-20 text-center space-y-8">
                    <div className="p-6 bg-indigo-600/20 border border-indigo-500/20 rounded-[32px] inline-block backdrop-blur-xl shadow-2xl">
                      <PlayCircle size={80} className="text-white fill-indigo-600/30" />
                    </div>
                    <div className="space-y-3">
                       <h3 className="text-4xl font-black text-white tracking-tighter">Daily Media Stream</h3>
                       <div className="flex items-center justify-center gap-4">
                          <span className="px-5 py-2 bg-yellow-400 text-slate-950 text-xs font-black rounded-full shadow-lg">+{VIDEO_REWARD} COINS</span>
                          <span className="px-5 py-2 bg-white/10 text-white text-xs font-black rounded-full backdrop-blur-md border border-white/20">15 SECONDS</span>
                       </div>
                    </div>
                    <button 
                      onClick={startVideo}
                      className="px-12 py-5 bg-white text-indigo-700 rounded-[24px] font-black text-xl shadow-2xl hover:scale-105 transition-all hover:bg-indigo-50 active:scale-95"
                    >
                      BEGIN STREAM
                    </button>
                 </div>
               </>
             )}
          </div>
          
          <div className={`p-10 rounded-[50px] border space-y-10 relative overflow-hidden ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <ShieldCheck size={120} />
            </div>
            <div className="flex items-center gap-4">
               <div className="p-3 rounded-2xl bg-indigo-600/10 text-indigo-500 border border-indigo-600/20">
                  <ShieldCheck size={28} />
               </div>
               <h3 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Stream Security Protocol</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
               {[
                 { t: 'Active Monitoring', d: 'The window must remain active and focused for rewards to verify.' },
                 { t: 'VPN Restriction', d: 'Using proxy or VPN services will trigger an automatic account freeze.' },
                 { t: 'Daily Quota', d: 'Limit 1 sponsored stream per user every 24-hour cycle.' },
                 { t: 'Instant Credit', d: 'Coins are settled to your wallet immediately after timer completion.' }
               ].map((item, i) => (
                 <div key={i} className="space-y-2">
                    <p className={`font-black text-sm ${theme === 'dark' ? 'text-slate-200' : 'text-slate-900'}`}>{item.t}</p>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed">{item.d}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
