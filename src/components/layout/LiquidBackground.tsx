import React from 'react';
import { motion } from 'framer-motion';

const LiquidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#020617]">
      {/* Primary Liquid Blobs */}
      <motion.div
        animate={{
          x: [0, 100, -100, 0],
          y: [0, -150, 150, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-cyan-600/20 rounded-full blur-[120px]"
      />
      
      <motion.div
        animate={{
          x: [0, -120, 120, 0],
          y: [0, 100, -100, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[100px]"
      />

      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 200, -200, 0],
          scale: [1, 1.5, 0.7, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-10%] left-[20%] w-[70%] h-[70%] bg-indigo-900/20 rounded-full blur-[140px]"
      />

      {/* Grid Overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617] opacity-80" />
    </div>
  );
};

export default LiquidBackground;