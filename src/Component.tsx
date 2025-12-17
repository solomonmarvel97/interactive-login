/**
 * Main Interactive Login Page
 * Combines the character scene and login form.
 * Handles global mouse tracking and state orchestration.
 */
import { useState, useRef, useEffect } from 'react';
import { CharacterScene } from './components/CharacterScene';
import { LoginForm } from './components/LoginForm';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export function InteractiveLogin() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [focusState, setFocusState] = useState<'email' | 'password' | 'none'>('none');
  const [loginStatus, setLoginStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to the window or container
      // Using client coordinates for global tracking across the split screen
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div 
      ref={containerRef}
      className={`relative flex flex-col md:flex-row w-full min-h-[600px] h-screen overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
    >
      {/* Theme Toggle Button */}
      <motion.button
        className={`absolute top-6 right-6 z-50 p-2 rounded-full shadow-lg transition-colors duration-300 
          ${theme === 'dark' ? 'bg-[#111] text-white border border-[#333]' : 'bg-white text-black border border-gray-200'}`}
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
      </motion.button>

      {/* Left Side: Character Scene (Hidden on mobile usually, but let's keep it responsive) */}
      <div className={`w-full md:w-1/2 h-1/3 md:h-full relative order-1 md:order-1 transition-colors duration-500 ${theme === 'dark' ? 'bg-[#111]' : 'bg-[#f3f4f6]'}`}>
        <CharacterScene 
          mouseX={mousePos.x} 
          mouseY={mousePos.y} 
          focusState={focusState}
          loginStatus={loginStatus}
          theme={theme}
        />
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full md:w-1/2 h-2/3 md:h-full flex items-center justify-center order-2 md:order-2">
        <LoginForm 
          onFocusChange={setFocusState} 
          onLoginStatusChange={setLoginStatus}
          theme={theme}
        />
      </div>
    </div>
  );
}

export default InteractiveLogin;