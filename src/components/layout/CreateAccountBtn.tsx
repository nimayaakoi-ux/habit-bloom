import React from 'react';
import { UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface CreateAccountBtnProps {
  className?: string;
}

const CreateAccountBtn: React.FC<CreateAccountBtnProps> = ({ className = "" }) => {
  const handleClick = () => {
    toast.info("Secure your progress.", {
      description: "Redirecting to account creation protocol...",
      style: { 
        background: 'rgba(2, 6, 23, 0.8)', 
        backdropFilter: 'blur(20px)', 
        color: '#fff', 
        border: '1px solid rgba(6, 182, 212, 0.2)' 
      }
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            className={`relative w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:border-cyan-500/30 transition-all duration-300 group ${className}`}
          >
            <div className="absolute inset-0 rounded-full bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <UserPlus size={20} className="relative z-10" />
            
            {/* Liquid Ripple Effect Decoration */}
            <span className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 animate-pulse pointer-events-none" />
          </motion.button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-slate-900 border-white/10 text-slate-200 text-[10px] font-black uppercase tracking-widest">
          Create Account
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CreateAccountBtn;