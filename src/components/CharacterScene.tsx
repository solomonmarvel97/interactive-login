/**
 * The main character scene component.
 * Renders the geometric characters that animate and react to input.
 */
import { motion, useAnimation } from 'framer-motion';
import { Eye } from './Eye';
import { useState, useEffect } from 'react';

interface CharacterSceneProps {
  mouseX: number;
  mouseY: number;
  focusState: 'email' | 'password' | 'none';
  loginStatus: 'idle' | 'loading' | 'success' | 'error';
  theme: 'light' | 'dark';
}

type Emotion = 'neutral' | 'happy' | 'sad' | 'surprised' | 'dizzy' | 'suspicious';

export function CharacterScene({ mouseX, mouseY, focusState, loginStatus, theme }: CharacterSceneProps) {
  const isShy = focusState === 'password';
  
  const [clickedCharacter, setClickedCharacter] = useState<string | null>(null);

  // Determine global emotion based on login status
  const getEmotion = (charId: string): Emotion => {
    if (clickedCharacter === charId) return 'surprised'; // Or random emotion
    if (loginStatus === 'success') return 'happy';
    if (loginStatus === 'error') return 'sad';
    if (isShy) return 'neutral'; // Eyes look away but emotion is neutral/shy
    return 'neutral';
  };

  // Mouth paths
  const mouthPaths = {
    neutral: "M 0 0 Q 10 5 20 0", // Gentle curve
    happy: "M 0 0 Q 10 15 20 0", // Smile
    sad: "M 0 10 Q 10 -5 20 10", // Frown
    surprised: "M 5 0 Q 10 10 15 0 Q 10 -10 5 0", // O shape (roughly)
    small: "M 2 2 L 8 2" // Tiny line
  };

  const handleCharacterClick = (id: string) => {
    setClickedCharacter(id);
    setTimeout(() => setClickedCharacter(null), 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  // Variants for face turning animation
  const faceVariants = {
    normal: { x: 0, rotateY: 0 },
    shy: { x: -25, rotateY: -20, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <motion.div 
      className={`relative w-full h-full min-h-[500px] flex items-center justify-center overflow-hidden md:rounded-l-3xl cursor-default transition-colors duration-500 ${theme === 'dark' ? 'bg-[#111]' : 'bg-[#f3f4f6]'}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Container for the character group - Scale up 1.5x roughly */}
      <div className="relative w-[450px] h-[450px] scale-110">
        
        {/* ================= PURPLE BLOCK ================= */}
        <motion.div 
          className="absolute left-[80px] bottom-0 w-[140px] h-[380px] bg-[#6366f1] shadow-xl flex flex-col items-center pt-12 cursor-pointer z-10 origin-bottom"
          // Revert: Standard rounded corners, no morphing
          style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
          initial={{ y: -800, x: -100, rotate: -45, opacity: 0 }}
          animate={{ 
            y: 0, 
            x: 0,
            opacity: 1,
            scale: clickedCharacter === 'purple' ? 1.1 : 1,
            rotate: clickedCharacter === 'purple' ? [0, -5, 5, 0] : 0,
            // Revert: No special bending props here
          }}
          transition={{ 
            type: "spring", 
            bounce: 0.2, 
            duration: 1.5,
            delay: 0.1 
          }}
          whileHover={{ scale: 1.02 }}
          onClick={() => handleCharacterClick('purple')}
        >
          <motion.div 
            className="flex flex-col items-center"
            variants={faceVariants}
            animate={isShy ? 'shy' : 'normal'}
          >
            <div className="flex space-x-4 relative">
                <Eye mouseX={mouseX} mouseY={mouseY} isShy={isShy} size={32} pupilSize={12} />
                <Eye mouseX={mouseX} mouseY={mouseY} isShy={isShy} size={32} pupilSize={12} />
                {/* Eyebrows */}
                {(getEmotion('purple') === 'sad' || loginStatus === 'error') && (
                <>
                    <div className="absolute -top-4 left-0 w-8 h-2 bg-black/20 rounded-full rotate-12" />
                    <div className="absolute -top-4 right-0 w-8 h-2 bg-black/20 rounded-full -rotate-12" />
                </>
                )}
            </div>
            
            {/* Nose */}
            <div className="w-4 h-8 bg-black/10 rounded-full mt-4 mb-2" />

            {/* Mouth */}
            <svg width="20" height="20" viewBox="0 0 20 20" className="mt-2 overflow-visible">
                <motion.path 
                d={getEmotion('purple') === 'happy' ? mouthPaths.happy : getEmotion('purple') === 'sad' ? mouthPaths.sad : clickedCharacter === 'purple' ? mouthPaths.surprised : mouthPaths.neutral}
                stroke="rgba(0,0,0,0.3)"
                strokeWidth="3"
                fill="transparent"
                strokeLinecap="round"
                animate={{ d: getEmotion('purple') === 'happy' ? mouthPaths.happy : getEmotion('purple') === 'sad' ? mouthPaths.sad : clickedCharacter === 'purple' ? mouthPaths.surprised : mouthPaths.neutral }}
                />
            </svg>
          </motion.div>
        </motion.div>

        {/* ================= BLACK BLOCK ================= */}
        {/* Overlapping purple slightly */}
        <motion.div 
          className="absolute left-[200px] bottom-0 w-[110px] h-[220px] bg-[#1f2937] shadow-xl flex flex-col items-center pt-8 cursor-pointer z-30 origin-bottom rounded-t-3xl"
          initial={{ y: -800, x: 50, rotate: 90, opacity: 0 }}
          animate={{ 
            y: clickedCharacter === 'black' ? -20 : 0,
            x: 0,
            opacity: 1,
            rotate: clickedCharacter === 'black' ? 10 : 0
          }}
          transition={{ 
            type: "spring", 
            bounce: 0.2, 
            duration: 1.6,
            delay: 0.2
          }}
          whileHover={{ scale: 1.05 }}
          onClick={() => handleCharacterClick('black')}
        >
          <motion.div 
             className="flex flex-col items-center"
             variants={faceVariants}
             animate={isShy ? 'shy' : 'normal'}
          >
            <div className="flex space-x-3 relative">
                <Eye mouseX={mouseX} mouseY={mouseY} isShy={isShy} size={24} pupilSize={8} />
                <Eye mouseX={mouseX} mouseY={mouseY} isShy={isShy} size={24} pupilSize={8} />
            </div>
            
            {/* Nose */}
            <div className="w-3 h-3 bg-white/20 rounded-full mt-5" />

            {/* Mouth - Simple line for this stoic character unless happy */}
            <motion.div 
                className="w-6 h-1 bg-white/30 rounded-full mt-4"
                animate={{ 
                width: getEmotion('black') === 'surprised' ? 10 : 24,
                height: getEmotion('black') === 'surprised' ? 10 : 4,
                borderRadius: getEmotion('black') === 'surprised' ? '100%' : '9999px',
                backgroundColor: loginStatus === 'success' ? '#10b981' : 'rgba(255,255,255,0.3)'
                }}
            />
          </motion.div>
        </motion.div>

        {/* ================= ORANGE SEMI-CIRCLE ================= */}
        {/* Big base character */}
        <motion.div 
          className="absolute left-[-40px] bottom-0 w-[280px] h-[140px] bg-[#f97316] rounded-t-full shadow-lg flex justify-center pt-12 cursor-pointer z-40 origin-bottom"
          initial={{ y: -800, rotate: 180, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            rotate: 0,
            scaleX: clickedCharacter === 'orange' ? 1.1 : 1,
            scaleY: clickedCharacter === 'orange' ? 0.9 : 1
          }}
          transition={{ 
            type: "spring", 
            bounce: 0.3, 
            duration: 1.4,
            delay: 0.3
          }}
          whileHover={{ scale: 1.02 }}
          onClick={() => handleCharacterClick('orange')}
        >
          <motion.div 
             className="flex flex-col items-center relative"
             variants={faceVariants}
             animate={isShy ? 'shy' : 'normal'}
          >
            <div className="flex space-x-12 relative">
                <Eye mouseX={mouseX} mouseY={mouseY} isShy={isShy} size={24} pupilSize={8} />
                <Eye mouseX={mouseX} mouseY={mouseY} isShy={isShy} size={24} pupilSize={8} />
                
                {/* Cheeks when happy */}
                {(getEmotion('orange') === 'happy') && (
                <>
                    <div className="absolute -left-4 top-4 w-4 h-2 bg-red-400/30 rounded-full blur-sm" />
                    <div className="absolute -right-4 top-4 w-4 h-2 bg-red-400/30 rounded-full blur-sm" />
                </>
                )}
            </div>
            
            {/* Nose */}
            <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-6 h-6 bg-black/10 rounded-full" />

            {/* Mouth */}
            <div className="absolute top-[60px] left-1/2 -translate-x-1/2">
                <svg width="40" height="20" viewBox="0 0 40 20" className="overflow-visible">
                <motion.path 
                    d={getEmotion('orange') === 'happy' ? "M 0 0 Q 20 20 40 0" : getEmotion('orange') === 'sad' ? "M 0 10 Q 20 -10 40 10" : "M 10 5 Q 20 10 30 5"}
                    stroke="rgba(0,0,0,0.3)"
                    strokeWidth="4"
                    fill="transparent"
                    strokeLinecap="round"
                    animate={{ d: getEmotion('orange') === 'happy' ? "M 0 0 Q 20 20 40 0" : getEmotion('orange') === 'sad' ? "M 0 10 Q 20 -10 40 10" : "M 10 5 Q 20 10 30 5" }}
                />
                </svg>
            </div>
          </motion.div>
        </motion.div>

        {/* ================= YELLOW ARCH ================= */}
        {/* Tombstone shape, front right */}
        <motion.div 
          className="absolute right-[50px] bottom-0 w-[110px] h-[160px] bg-[#eab308] rounded-t-full shadow-lg flex flex-col items-center pt-12 cursor-pointer z-30 origin-bottom"
          initial={{ y: -800, x: 100, rotate: -90, opacity: 0 }}
          animate={{ 
            y: 0, 
            x: 0,
            opacity: 1,
            rotate: clickedCharacter === 'yellow' ? [0, 10, -10, 0] : 0, 
          }}
          transition={{ 
            type: "spring", 
            bounce: 0.2, 
            duration: 1.7,
            delay: 0.4
          }}
          whileHover={{ scale: 1.05, rotate: 5 }}
          onClick={() => handleCharacterClick('yellow')}
        >
          <motion.div 
             className="flex flex-col items-center relative w-full h-full"
             variants={faceVariants}
             animate={isShy ? 'shy' : 'normal'}
          >
            <div className="flex space-x-3 ml-2 relative">
                <Eye mouseX={mouseX} mouseY={mouseY} isShy={isShy} size={20} pupilSize={6} />
                <Eye mouseX={mouseX} mouseY={mouseY} isShy={isShy} size={20} pupilSize={6} />
            </div>
            
            {/* Long Nose */}
            <div className="w-12 h-1.5 bg-black/20 mt-5 -ml-4 rotate-[-5deg]" />
            
            {/* Mouth */}
            <div className="absolute top-[100px] right-[30px]">
                <svg width="20" height="10" viewBox="0 0 20 10" className="overflow-visible">
                <motion.path 
                    d={getEmotion('yellow') === 'happy' ? "M 0 0 Q 10 10 20 0" : "M 0 5 L 10 5"}
                    stroke="rgba(0,0,0,0.3)"
                    strokeWidth="2"
                    fill="transparent"
                    strokeLinecap="round"
                    animate={{ d: getEmotion('yellow') === 'happy' ? "M 0 0 Q 10 10 20 0" : "M 0 5 L 10 5" }}
                />
                </svg>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Confetti on Success */}
        {loginStatus === 'success' && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'][i % 4],
                  left: '50%',
                  top: '50%',
                }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400 - 100,
                  rotate: Math.random() * 360
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            ))}
          </>
        )}

      </div>
    </motion.div>
  );
}