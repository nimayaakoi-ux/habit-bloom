import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Save, Plus, Clock, Sparkles, X, ChevronRight } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: string;
}

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('growth_journal_v1');
    return saved ? JSON.parse(saved) : [];
  });
  const [isAdding, setIsAdding] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [selectedMood, setSelectedMood] = useState('Focused');

  useEffect(() => {
    localStorage.setItem('growth_journal_v1', JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (!newContent.trim()) return;
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      content: newContent,
      mood: selectedMood
    };
    setEntries([entry, ...entries]);
    setNewContent('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Neuro-Journal</h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Reflecting on Protocol Execution</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="w-12 h-12 bg-cyan-500 text-slate-950 rounded-2xl shadow-xl shadow-cyan-900/40 hover:scale-110 transition-all flex items-center justify-center"
        >
          <Plus size={24} />
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white/5 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-cyan-500/20 shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-white uppercase italic tracking-widest">New Entry</h3>
              <button onClick={() => setIsAdding(false)} className="text-slate-500 hover:text-white"><X size={18} /></button>
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
              {['Focused', 'Grateful', 'Challenged', 'Success'].map(mood => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                    selectedMood === mood ? 'bg-cyan-500 border-cyan-500 text-slate-950' : 'bg-white/5 border-white/10 text-slate-500'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>

            <textarea
              autoFocus
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Record your thoughts, data points, or reflections..."
              className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-4 text-xs font-medium text-slate-200 min-h-[150px] outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />

            <button 
              onClick={addEntry}
              className="w-full bg-cyan-500 text-slate-950 font-black uppercase tracking-widest py-4 rounded-2xl flex items-center justify-center space-x-2"
            >
              <Save size={18} />
              <span>SECURE ENTRY</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {entries.map(entry => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white/5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock size={14} className="text-slate-500" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{entry.date}</span>
              </div>
              <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-2 py-1 rounded-full border border-cyan-500/20">
                {entry.mood}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">{entry.content}</p>
          </motion.div>
        ))}
        {entries.length === 0 && !isAdding && (
          <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10">
            <Book size={40} className="mx-auto text-slate-700 mb-4" />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">NO DATA ENTRIES FOUND</p>
          </div>
        )}
      </div>
    </div>
  );
}