import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Play, BookOpen } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  category: string;
  image: string;
}

interface LessonCardProps {
  lesson: Lesson;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-slate-900/40 backdrop-blur-md rounded-[2rem] overflow-hidden border border-slate-800/50 group cursor-pointer shadow-2xl transition-all duration-500"
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img 
          src={lesson.image} 
          alt={lesson.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.8]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
        
        <div className="absolute top-4 left-4 bg-cyan-500 text-slate-950 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-cyan-400/50">
          {lesson.category}
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-500">
            <Play size={24} className="fill-white ml-1" />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-black text-slate-100 text-lg leading-tight mb-4 group-hover:text-cyan-400 transition-colors italic uppercase tracking-tighter">
          {lesson.title}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <Clock size={14} className="mr-1.5 text-cyan-500" />
            <span>{lesson.duration} INTEL</span>
          </div>
          <div className="flex items-center text-[10px] font-bold text-cyan-400 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
            Study <BookOpen size={12} className="ml-1" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LessonCard;