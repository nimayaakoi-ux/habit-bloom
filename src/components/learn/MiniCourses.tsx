import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, BookOpen, Star, Sparkles } from 'lucide-react';

export default function MiniCourses() {
  const courses = [
    { 
      id: '1', 
      title: 'Neural Rewiring: Focus', 
      lessons: 5, 
      duration: '45m', 
      rating: 4.9, 
      tag: 'COGNITIVE',
      image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/fd81e7c0-dca3-480f-8f6b-cec7e6b323a4/course-thumbnail-1-207c3d20-1779230455305.webp' 
    },
    { 
      id: '2', 
      title: 'Discipline Architecture', 
      lessons: 8, 
      duration: '1h 20m', 
      rating: 5.0, 
      tag: 'LIFESTYLE',
      image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=600' 
    },
    { 
      id: '3', 
      title: 'Sleep Optimization V2', 
      lessons: 4, 
      duration: '30m', 
      rating: 4.8, 
      tag: 'RECOVERY',
      image: 'https://images.unsplash.com/photo-1541480601022-23057d163484?auto=format&fit=crop&q=80&w=600' 
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Mini-Courses</h2>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">High-Impact Protocol Training</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            whileHover={{ x: 5 }}
            className="flex flex-col md:flex-row bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 overflow-hidden group cursor-pointer shadow-2xl"
          >
            <div className="w-full md:w-48 h-48 relative overflow-hidden">
              <img src={course.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-slate-950/20" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-950 shadow-xl">
                  <Play size={24} className="ml-1" />
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-8 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                  {course.tag}
                </span>
                <div className="flex items-center space-x-1 text-amber-400">
                  <Star size={12} fill="currentColor" />
                  <span className="text-xs font-bold">{course.rating}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-4 group-hover:text-cyan-400 transition-colors">{course.title}</h3>
              
              <div className="flex items-center space-x-6 mt-auto">
                <div className="flex items-center space-x-2 text-slate-500">
                  <BookOpen size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{course.lessons} MODULES</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-500">
                  <Clock size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{course.duration}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-cyan-600/20 to-indigo-600/20 p-10 rounded-[2.5rem] border border-cyan-500/20 relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">Success Story: Commander Alex</h4>
          <p className="text-slate-300 text-sm leading-relaxed mb-8 max-w-2xl font-medium italic">
            "I used to struggle with consistency. After completing the Discipline Architecture course and using the AI Coach daily, I've hit a 45-day streak and secured a promotion. The system works if you deploy it."
          </p>
          <div className="flex items-center space-x-4">
            <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/fd81e7c0-dca3-480f-8f6b-cec7e6b323a4/success-story-1-97b5f539-1779230455554.webp" className="w-12 h-12 rounded-xl object-cover border border-white/20" />
            <div>
              <p className="text-xs font-black text-white uppercase tracking-widest">ALEX RIVERS</p>
              <p className="text-[9px] text-cyan-400 font-bold uppercase tracking-[0.2em]">45 DAY STREAK secured</p>
            </div>
          </div>
        </div>
        <Sparkles className="absolute right-[-20px] top-[-20px] text-white/5" size={200} />
      </div>
    </div>
  );
}