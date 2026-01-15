
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../store/AppContext';
import { 
  Play, 
  RefreshCw, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Trophy,
  Video,
  Camera,
  Upload,
  X,
  ShieldCheck,
  ExternalLink,
  History,
  PlayCircle
} from 'lucide-react';
import { Task } from '../types';

const Tasks: React.FC = () => {
  const { 
    tasks, 
    completeDailySpin, 
    completeDailyVideo, 
    completeDailyTask, 
    currentUser 
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

  // Countdown logic for the 24h reset
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

  // Spin Wheel logic
  const handleSpin = () => {
    if (spinLoading || !currentUser) return;
    
    if (currentUser.dailySpinCount >= DAILY_SPIN_LIMIT) {
      alert(`Daily limit reached! Please come back in ${timeLeftToReset}`);
      return;
    }

    setSpinLoading(true);
    
    // Choose a random index
    const randomIndex = Math.floor(Math.random() * spinPrizes.length);
    const win = spinPrizes[randomIndex];

    // Calculate rotation: 
    // 5 full circles (1800 deg) + offset to align segment with the top pointer
    // Each segment is 45 degrees. Segment 0 is at 0 deg, segment 1 at 45, etc.
    // To make segment 'i' stop at the top, we rotate the wheel by - (i * 45) degrees.
    const segmentAngle = 360 / spinPrizes.length;
    const extraSpins = 5 * 360; 
    const finalRotation = wheelRotation + extraSpins + (360 - (randomIndex * segmentAngle));
    
    setWheelRotation(finalRotation);

    setTimeout(() => {
      completeDailySpin(win);
      alert(`The wheel stopped on ${win}! You won ${win} coins!`);
      setSpinLoading(false);
    }, 4000); // Match transition duration
  };

  // Video logic
  useEffect(() => {
    let interval: any;
    if (videoTimer > 0) {
      interval = setInterval(() => setVideoTimer(t => t - 1), 1000);
    } else if (isVideoPlaying) {
      completeDailyVideo(VIDEO_REWARD);
      setIsVideoPlaying(false);
      alert(`${VIDEO_REWARD} coins credited for watching the video!`);
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
      alert(`Task submitted! ${submittingProof.reward} coins have been added to your balance.`);
      setSubmittingProof(null);
      setHasUploaded(false);
      setIsSubmitting(false);
    }, 1500);
  };

  if (!currentUser) return null;

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Earn Coins</h1>
          <p className="text-slate-400">Complete tasks and activities to grow your balance.</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-slate-900 border border-slate-800 rounded-2xl">
           <History size={16} className="text-indigo-400" />
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Reset</span>
              <span className="text-xs font-mono font-bold text-white">{timeLeftToReset}</span>
           </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-4 p-2 bg-slate-900 border border-slate-800 rounded-3xl w-fit mx-auto md:mx-0">
        {[
          { id: 'TASKS', label: 'Micro Tasks', icon: <CheckCircle2 size={18} /> },
          { id: 'SPIN', label: 'Lucky Spin', icon: <RefreshCw size={18} /> },
          { id: 'VIDEO', label: 'Watch & Earn', icon: <Video size={18} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'TASKS' && (
        <div className="grid md:grid-cols-2 gap-6">
          {tasks.map(task => {
            const isCompleted = currentUser.dailyTasksCompleted.includes(task.id);
            return (
              <div key={task.id} className={`p-6 rounded-[32px] bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-indigo-500/50 transition-all group ${isCompleted ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest border border-indigo-500/20">
                        {isCompleted ? 'Done for Today' : 'Social'}
                      </div>
                      {task.requireScreenshot && !isCompleted && (
                        <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-tighter border border-emerald-500/20 flex items-center gap-1">
                          <Camera size={10} /> Screenshot Required
                        </div>
                      )}
                    </div>
                    <span className="text-yellow-400 font-bold flex items-center gap-1">
                      +{task.reward} Coins
                    </span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-indigo-400 transition-colors">{task.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{task.description}</p>
                </div>
                
                <div className="mt-8 flex items-center justify-between gap-4">
                  <button 
                    disabled={isCompleted}
                    onClick={() => setSubmittingProof(task)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold transition-all shadow-lg ${isCompleted ? 'bg-slate-800 text-slate-500' : 'bg-indigo-600 hover:bg-indigo-50 text-white shadow-indigo-600/20'}`}
                  >
                    {isCompleted ? 'Wait 24h to repeat' : <><Play size={18} fill="currentColor" /> Start Task</>}
                  </button>
                  <button className="p-3 rounded-2xl border border-slate-800 hover:bg-slate-800 transition-colors text-slate-400">
                    <ChevronRight />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Proof Submission Modal */}
      {submittingProof && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setSubmittingProof(null)}></div>
          <div className="relative bg-slate-900 border border-slate-800 rounded-[40px] p-8 w-full max-w-xl shadow-2xl animate-in zoom-in duration-200">
             <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                   <h2 className="text-2xl font-black text-white">{submittingProof.title}</h2>
                   <p className="text-sm text-slate-400">Complete the steps below to claim {submittingProof.reward} coins.</p>
                </div>
                <button onClick={() => setSubmittingProof(null)} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                   <X size={24} className="text-slate-500" />
                </button>
             </div>

             <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">1</div>
                      <p className="text-sm font-medium text-slate-300">Visit the target link and complete the action.</p>
                   </div>
                   <a 
                    href={submittingProof.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600/10 text-indigo-400 rounded-2xl font-bold hover:bg-indigo-600 hover:text-white transition-all border border-indigo-600/20"
                   >
                     Go to Link <ExternalLink size={16} />
                   </a>
                </div>

                <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">2</div>
                      <p className="text-sm font-medium text-slate-300">
                        {submittingProof.requireScreenshot 
                          ? "Upload a screenshot showing completion." 
                          : "Verify completion to claim reward."}
                      </p>
                   </div>
                   
                   {submittingProof.requireScreenshot && (
                     <div 
                      onClick={() => setHasUploaded(true)}
                      className={`border-2 border-dashed rounded-[32px] p-8 text-center space-y-3 cursor-pointer transition-all ${hasUploaded ? 'bg-emerald-500/5 border-emerald-500/50' : 'bg-slate-900 border-slate-800 hover:border-indigo-500/50'}`}
                     >
                        {hasUploaded ? (
                          <div className="space-y-2">
                             <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-emerald-500/20">
                                <CheckCircle2 size={24} />
                             </div>
                             <p className="text-sm font-bold text-emerald-400">Screenshot Attached!</p>
                             <button onClick={(e) => { e.stopPropagation(); setHasUploaded(false); }} className="text-[10px] text-slate-500 hover:text-white underline font-bold uppercase tracking-widest">Change Proof</button>
                          </div>
                        ) : (
                          <>
                            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-500">
                               <Upload size={24} />
                            </div>
                            <div className="space-y-1">
                               <p className="text-sm font-bold text-white">Click to upload screenshot</p>
                               <p className="text-xs text-slate-500">JPG, PNG, WEBP (Max 2MB)</p>
                            </div>
                          </>
                        )}
                     </div>
                   )}
                </div>

                <button 
                  onClick={handleTaskSubmit}
                  disabled={isSubmitting || (submittingProof.requireScreenshot && !hasUploaded)}
                  className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 ${isSubmitting || (submittingProof.requireScreenshot && !hasUploaded) ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/30'}`}
                >
                  {isSubmitting ? <RefreshCw className="animate-spin" /> : <><ShieldCheck size={20} /> Claim {submittingProof.reward} Coins</>}
                </button>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'SPIN' && (
        <div className="max-w-xl mx-auto p-12 rounded-[40px] bg-slate-900 border border-slate-800 text-center space-y-10 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <Trophy size={160} />
           </div>

           <div className="relative">
              {/* Top pointer indicator */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-6 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-yellow-400 z-20 drop-shadow-lg"></div>
              
              <div className="w-72 h-72 mx-auto rounded-full border-8 border-indigo-600/20 p-2 shadow-inner">
                 <div 
                  className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-500 flex items-center justify-center relative shadow-2xl overflow-hidden"
                  style={{ 
                    transform: `rotate(${wheelRotation}deg)`, 
                    transition: 'transform 4s cubic-bezier(0.15, 0, 0.15, 1)' 
                  }}
                 >
                    {/* Draw the segments with colors for better visibility */}
                    {spinPrizes.map((num, i) => {
                      const angle = 360 / spinPrizes.length;
                      return (
                        <div 
                          key={i} 
                          className="absolute inset-0 flex items-start justify-center pt-4" 
                          style={{ transform: `rotate(${i * angle}deg)` }}
                        >
                           {/* Divider line */}
                           <div className="absolute top-0 h-full w-[1px] bg-white/10 left-1/2 -translate-x-1/2"></div>
                           
                           <div 
                            className="font-black text-2xl text-white drop-shadow-md select-none"
                            style={{ transform: `rotate(${-i * angle}deg)` }}
                           >
                            {num}
                          </div>
                        </div>
                      );
                    })}
                    <div className="w-12 h-12 bg-white rounded-full z-10 shadow-lg flex items-center justify-center text-indigo-600">
                       <Trophy size={20} />
                    </div>
                 </div>
              </div>
           </div>

           <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                 <h2 className="text-3xl font-black text-white">Lucky Coin Spin</h2>
                 <p className="text-slate-400 text-sm">Experience the thrill! Spin to win between 0-7 coins. Limit 5 per day.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center max-w-[300px] mx-auto">
                 <div className="text-left">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Spins Left Today</p>
                    <p className="text-xl font-black text-white">{DAILY_SPIN_LIMIT - currentUser.dailySpinCount} / {DAILY_SPIN_LIMIT}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Next Refresh</p>
                    <p className="text-sm font-mono font-bold text-indigo-400">{timeLeftToReset}</p>
                 </div>
              </div>

              <button 
                onClick={handleSpin}
                disabled={spinLoading || currentUser.dailySpinCount >= DAILY_SPIN_LIMIT}
                className={`w-full py-5 rounded-2xl font-black text-xl shadow-xl transition-all flex items-center justify-center gap-3 text-white ${spinLoading || currentUser.dailySpinCount >= DAILY_SPIN_LIMIT ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30'}`}
              >
                {spinLoading ? <><RefreshCw className="animate-spin" /> Spinning...</> : currentUser.dailySpinCount >= DAILY_SPIN_LIMIT ? "Limit Reached" : "SPIN TO WIN"}
              </button>
           </div>
        </div>
      )}

      {activeTab === 'VIDEO' && (
        <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className={`aspect-video rounded-[40px] bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden relative group ${currentUser.dailyVideoWatched && !isVideoPlaying ? 'opacity-50 grayscale' : 'shadow-2xl shadow-indigo-600/10'}`}>
             {isVideoPlaying ? (
               <div className="text-center space-y-6 relative z-10">
                 <div className="text-7xl font-black text-indigo-400 animate-pulse">{videoTimer}s</div>
                 <p className="text-slate-200 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    <RefreshCw className="animate-spin" size={18} /> Verification in progress...
                 </p>
               </div>
             ) : currentUser.dailyVideoWatched ? (
                <div className="text-center space-y-4">
                   <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                      <CheckCircle2 size={40} />
                   </div>
                   <h3 className="text-2xl font-black text-white">Reward Already Claimed</h3>
                   <p className="text-slate-400 font-medium">Your daily video bonus resets in {timeLeftToReset}</p>
                </div>
             ) : (
               <>
                 <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1280&h=720" className="absolute inset-0 object-cover opacity-20 group-hover:scale-110 transition-transform duration-[2000ms]" alt="Video Preview" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                 <div className="relative z-10 text-center space-y-6">
                    <div className="p-4 bg-indigo-600/20 border border-indigo-500/20 rounded-full inline-block backdrop-blur-sm">
                      <PlayCircle size={64} className="text-white fill-indigo-600/40" />
                    </div>
                    <div className="space-y-2">
                       <h3 className="text-2xl font-black text-white">Daily Sponsored Video</h3>
                       <div className="flex items-center justify-center gap-2">
                          <span className="px-3 py-1 bg-yellow-400/10 text-yellow-400 text-xs font-black rounded-full border border-yellow-400/20">REWARD: {VIDEO_REWARD} COINS</span>
                          <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded-full">DURATION: 15S</span>
                       </div>
                    </div>
                    <button 
                      onClick={startVideo}
                      className="px-10 py-4 bg-white text-indigo-600 rounded-2xl font-black text-lg shadow-2xl hover:scale-105 transition-all hover:bg-indigo-50"
                    >
                      WATCH & EARN
                    </button>
                 </div>
               </>
             )}
          </div>
          
          <div className="p-8 rounded-[32px] bg-slate-900/50 border border-slate-800 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
               <Video size={80} />
            </div>
            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
              <AlertCircle className="text-yellow-500" />
              Watch Guidelines
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
               {[
                 { id: '01', text: 'Daily video rewards refresh every 24 hours globally.' },
                 { id: '02', text: 'Coins are automatically added once the timer hits zero.' },
                 { id: '03', text: 'VPN usage is strictly prohibited and leads to a permanent ban.' },
                 { id: '04', text: 'Keep the window active to ensure verification succeeds.' }
               ].map(item => (
                 <div key={item.id} className="flex gap-3 text-sm">
                    <span className="text-indigo-500 font-black">{item.id}.</span>
                    <span className="text-slate-400 leading-relaxed">{item.text}</span>
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
