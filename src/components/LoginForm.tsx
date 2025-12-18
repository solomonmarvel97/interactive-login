/**
 * Login form component handling user input and focus states.
 * Communicates focus state back to parent for character animation.
 */
import { useState, useEffect } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginFormProps {
  onFocusChange: (field: 'email' | 'password' | 'none') => void;
  onLoginStatusChange: (status: 'idle' | 'loading' | 'success' | 'error') => void;
  theme: 'light' | 'dark';
}

export function LoginForm({ onFocusChange, onLoginStatusChange, theme }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  // Watch showPassword to control character shy behavior
  useEffect(() => {
    // Characters turn away only when password is visible
    if (showPassword) {
      onFocusChange('password');
    } else {
      onFocusChange('none');
    }
  }, [showPassword, onFocusChange]);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const isDark = theme === 'dark';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    onLoginStatusChange('loading');

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      
      // Random success/error for demo purposes
      // If email contains "error", force error
      const isSuccess = !email.includes('error') && Math.random() > 0.3;
      
      if (isSuccess) {
        onLoginStatusChange('success');
      } else {
        onLoginStatusChange('error');
        // Reset to idle after a bit so they can try again
        setTimeout(() => onLoginStatusChange('idle'), 3000);
      }
    }, 2000);
  };

  return (
    <div className={`w-full max-w-md px-8 py-12 flex flex-col justify-center h-full transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8 text-center"
      >
        <div className={`w-10 h-10 rounded-full mx-auto mb-4 flex items-center justify-center transition-colors duration-300 ${isDark ? 'bg-white' : 'bg-black'}`}>
            {/* Simple Logo Placeholder */}
            <div className={`w-4 h-4 rounded-sm rotate-45 transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-white'}`} />
        </div>
        <h2 className={`text-2xl font-bold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>Welcome back</h2>
        <p className={`text-sm mt-2 transition-colors duration-300 ${isDark ? 'text-[#888]' : 'text-[#666]'}`}>Please enter your details</p>
      </motion.div>

      <motion.form 
        onSubmit={handleSubmit}
        className="space-y-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="space-y-1.5">
          <label htmlFor="email" className={`text-sm font-medium transition-colors duration-300 ${isDark ? 'text-[#888]' : 'text-gray-700'}`}>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="anna@gmail.com"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 transition-all duration-200
              ${isDark 
                ? 'bg-[#111] border-[#333] text-white placeholder-[#444] hover:border-[#555] focus:border-white focus:ring-white' 
                : 'bg-white border-[#eaeaea] text-gray-900 placeholder-gray-400 hover:border-[#666] focus:border-black focus:ring-black'
              }`}
            onFocus={() => !showPassword && onFocusChange('email')}
            onBlur={() => !showPassword && onFocusChange('none')}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className={`text-sm font-medium transition-colors duration-300 ${isDark ? 'text-[#888]' : 'text-gray-700'}`}>Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 transition-all duration-200 pr-10
                ${isDark 
                  ? 'bg-[#111] border-[#333] text-white placeholder-[#444] hover:border-[#555] focus:border-white focus:ring-white' 
                  : 'bg-white border-[#eaeaea] text-gray-900 placeholder-gray-400 hover:border-[#666] focus:border-black focus:ring-black'
                }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none transition-colors duration-300 ${isDark ? 'text-[#666] hover:text-white' : 'text-[#999] hover:text-black'}`}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className={`flex items-center cursor-pointer transition-colors duration-300 ${isDark ? 'text-[#888] hover:text-white' : 'text-[#666] hover:text-black'}`}>
            <input 
              type="checkbox" 
              className={`w-4 h-4 rounded border mr-2 transition-colors duration-200 
                ${isDark ? 'bg-[#111] border-[#333] checked:bg-white checked:border-white' : 'bg-white border-[#eaeaea] checked:bg-black checked:border-black'}`} 
            />
            Remember for 30 days
          </label>
          <a href="#" className={`hover:underline transition-colors duration-300 ${isDark ? 'text-[#888] hover:text-white' : 'text-[#666] hover:text-black'}`}>Forgot password?</a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2.5 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center
            ${isDark 
              ? 'bg-white text-black hover:bg-[#eaeaea] focus:ring-white ring-offset-black' 
              : 'bg-black text-white hover:bg-[#333] focus:ring-black ring-offset-white'
            }`}
        >
          {isLoading ? <Loader2 className="animate-spin mr-2" size={20} /> : "Log In"}
        </button>

        <button
          type="button"
          className={`w-full py-2.5 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center border
            ${isDark 
              ? 'bg-black border-[#333] text-white hover:bg-[#111] focus:ring-[#333] ring-offset-black' 
              : 'bg-white border-[#eaeaea] text-gray-900 hover:bg-[#fafafa] focus:ring-[#eaeaea] ring-offset-white'
            }`}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.033s2.701-6.033,6.033-6.033c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
            />
          </svg>
          Log in with Google
        </button>
      </motion.form>

      <motion.p 
        className={`text-center text-sm mt-8 transition-colors duration-300 ${isDark ? 'text-[#888]' : 'text-[#666]'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Don't have an account? <a href="#" className={`font-medium hover:underline transition-colors duration-300 ${isDark ? 'text-white' : 'text-black'}`}>Sign Up</a>
      </motion.p>
    </div>
  );
}
