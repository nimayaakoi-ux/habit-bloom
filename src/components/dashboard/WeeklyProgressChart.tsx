import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface WeeklyProgressChartProps {
  data?: number[]; // Array of completion percentages for the last 7 days
}

const WeeklyProgressChart: React.FC<WeeklyProgressChartProps> = ({ data = [40, 60, 80, 50, 90, 70, 100] }) => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="bg-white/5 backdrop-blur-2xl p-7 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <Calendar size={16} className="text-cyan-400" />
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Weekly Performance Report</h3>
        </div>
        <div className="bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">Growth +12%</span>
        </div>
      </div>

      <div className="flex items-end justify-between h-40 px-2 space-x-2 md:space-x-4">
        {data.map((percent, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className="w-full relative group">
              {/* Bar */}
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${percent}%` }}
                transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                className={`w-full rounded-t-xl relative overflow-hidden ${
                  percent >= 80 ? 'bg-gradient-to-t from-cyan-600 to-cyan-400' : 'bg-slate-800'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
              
              {/* Tooltip on hover */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-white/10 px-2 py-1 rounded-lg pointer-events-none">
                <span className="text-[9px] font-black text-white">{percent}%</span>
              </div>
            </div>
            <span className="text-[10px] font-black text-slate-500 mt-4 uppercase">{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyProgressChart;