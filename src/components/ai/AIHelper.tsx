import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Sparkles, X, Send, Zap, Brain, Mic, MicOff, Volume2, VolumeX,
  Target, Award, Calendar, Star, Save, AlertTriangle, FastForward
} from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  role: 'ai' | 'user';
  content: string;
  type?: 'checkin' | 'reflection' | 'solution' | 'challenge' | 'support' | 'coaching' | 'emergency' | 'win' | 'plan';
  isSaved?: boolean;
}

interface AIHelperProps {
  userName: string;
  onReward: (xp: number, badge?: string) => void;
  userStats: { habitsCompleted: number; totalHabits: number };
  pendingStory?: string | null;
  onStoryProcessed?: () => void;
  characterStyle?: string;
}

export default function AIHelper({ userName, onReward, userStats, pendingStory, onStoryProcessed, characterStyle = 'Disciplined' }: AIHelperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('growth_ai_messages_v5');
    return saved ? JSON.parse(saved) : [
      { role: 'ai', content: `Protocol Initialized. Welcome back, ${userName}. I am your ${characterStyle} coach. Ready for today's deployment?`, type: 'support' }
    ];
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [muteVoice, setMuteVoice] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [memory, setMemory] = useState(() => {
    const saved = localStorage.getItem('growth_ai_memory_v5');
    return saved ? JSON.parse(saved) : {
      interactionCount: 0,
      stories: [],
      longTermGoals: ['Become a Master of Discipline'],
      lastCheckIn: Date.now()
    };
  });

  useEffect(() => {
    localStorage.setItem('growth_ai_memory_v5', JSON.stringify(memory));
    localStorage.setItem('growth_ai_messages_v5', JSON.stringify(messages));
  }, [memory, messages]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    if (pendingStory) {
      setIsOpen(true);
      setTimeout(() => { handleSendMessage(pendingStory); if (onStoryProcessed) onStoryProcessed(); }, 500);
    }
  }, [pendingStory]);

  useEffect(() => {
    const lastCheck = new Date(memory.lastCheckIn).toDateString();
    const today = new Date().toDateString();
    if (lastCheck !== today) {
      setTimeout(() => {
        setIsOpen(true);
        handleSendMessage("Initiate daily accountability protocol.");
        setMemory(m => ({ ...m, lastCheckIn: Date.now() }));
      }, 3000);
    }
  }, []);

  const speak = (text: string) => {
    if (muteVoice || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = (text?: string) => {
    const content = text || inputValue;
    if (!content.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content }]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = "";
      let type: Message['type'] = 'coaching';
      const lower = content.toLowerCase();

      if (lower.includes('daily plan') || lower.includes('organize my day')) {
        aiResponse = `Analyzing habits... 

06:00 - Deployment (Routine)
09:00 - High Performance (Deep Work)
13:00 - Recalibration
16:00 - Habit Execution
21:00 - Recovery.

Optimized for maximum momentum.`;
        type = 'plan';
        onReward(25, 'AI:Strategic Planner');
      } else if (lower.includes('win') || lower.includes('did it')) {
        aiResponse = `VICTORY DETECTED! \ud83d\ude80 Securing small wins builds empires, ${userName}. Momentum spike logged. +30 XP.`;
        type = 'win';
        onReward(30);
      } else if (lower.includes('give up') || lower.includes('discouraged')) {
        aiResponse = `EMERGENCY PROTOCOL. Failure is temporary. You are in resistance. Breathe. What is the SMALLEST thing you can do now to regain control?`;
        type = 'emergency';
      } else if (lower.includes('future self')) {
        aiResponse = `Projecting... In 12 months, you are '${memory.longTermGoals[0]}'. Every habit is a vote for that person. Choose wisely.`;
      } else {
        aiResponse = `Data received. Calibration in progress. How can we make this a 1% improvement?`;
      }

      setMessages(prev => [...prev, { role: 'ai', content: aiResponse, type }]);
      setIsTyping(false);
      speak(aiResponse);
      onReward(5);
    }, 1500);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl shadow-xl shadow-cyan-500/30 flex items-center justify-center text-white border border-cyan-300/30 hover:shadow-cyan-500/50"
      >
        <Bot size={28} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-40 right-6 left-6 md:left-auto md:bottom-24 md:right-8 z-50 md:w-[400px] h-[75vh] max-h-[650px] flex flex-col bg-slate-950/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/20"><Brain size={24} className="text-cyan-400" /></div>
                <div><h3 className="text-sm font-black text-white uppercase italic">AI Coach V5</h3><p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">{characterStyle} MODE ACTIVE</p></div>
              </div>
              <button onClick={() => setIsOpen(false)}><X size={18} className="text-slate-500" /></button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-none">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`p-4 rounded-3xl text-[13px] leading-relaxed font-medium shadow-lg ${msg.role === 'ai' ? 'bg-white/5 text-slate-200 rounded-tl-none border border-white/10' : 'bg-cyan-600 text-white rounded-tr-none'}`}>
                    {msg.content}
                    {msg.role === 'ai' && <button onClick={() => toast.success("Advice Saved.")} className="ml-2 opacity-50 hover:opacity-100"><Save size={12} /></button>}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-cyan-400 animate-pulse text-[10px] font-black uppercase">Coach is thinking...</div>}
            </div>

            <div className="px-6 pb-4 flex space-x-2 overflow-x-auto no-scrollbar">
              <button onClick={() => handleSendMessage("Generate daily plan")} className="flex-shrink-0 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-cyan-400 uppercase tracking-widest">DAILY PLAN</button>
              <button onClick={() => handleSendMessage("Future Self")} className="flex-shrink-0 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-amber-500 uppercase tracking-widest">FUTURE SELF</button>
            </div>

            <div className="p-6 bg-white/5 border-t border-white/5">
              <div className="relative flex items-center space-x-3">
                <button onClick={() => setIsListening(!isListening)} className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isListening ? 'bg-rose-500' : 'bg-white/5'}`}>{isListening ? <Mic size={20} /> : <MicOff size={20} />}</button>
                <div className="relative flex-1">
                  <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Brief your coach..." className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3.5 pl-5 pr-12 text-xs font-bold text-slate-100 outline-none" />
                  <button onClick={() => handleSendMessage()} className="absolute right-1.5 top-1.5 w-10 h-10 bg-cyan-500 text-slate-950 rounded-xl flex items-center justify-center"><Send size={16} /></button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}