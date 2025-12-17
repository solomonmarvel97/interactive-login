/**
 * Reusable Eye component that tracks mouse movement
 * Handles normal looking behavior and "shy" behavior for password entry
 */
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { calculatePupilPosition } from '../utils/math';

interface EyeProps {
  mouseX: number;
  mouseY: number;
  isShy: boolean; // If true, eye looks away (for password field)
  size?: number;
  pupilSize?: number;
  className?: string;
  whiteColor?: string;
  pupilColor?: string;
}

export function Eye({ 
  mouseX, 
  mouseY, 
  isShy, 
  size = 20, 
  pupilSize = 8,
  className = "",
  whiteColor = "white",
  pupilColor = "black"
}: EyeProps) {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  // Random blink effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.7 && !isShy) { // 30% chance to blink every interval, don't blink when shy/hiding
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 2000 + Math.random() * 2000); // Random interval between 2s and 4s

    return () => clearInterval(blinkInterval);
  }, [isShy]);

  useEffect(() => {
    if (!eyeRef.current) return;
    
    // If shy (password mode), force look away
    if (isShy) {
      setPupilPos({ x: -size / 3, y: -size / 3 }); // Look Up-Left (away)
      return;
    }

    // Get eye center position
    const rect = eyeRef.current.getBoundingClientRect();
    const eyeX = rect.left + rect.width / 2;
    const eyeY = rect.top + rect.height / 2;

    // Calculate pupil position
    const pos = calculatePupilPosition(mouseX, mouseY, eyeX, eyeY, size / 3.5);
    setPupilPos(pos);
  }, [mouseX, mouseY, isShy, size]);

  return (
    <div 
      ref={eyeRef}
      className={`relative rounded-full flex items-center justify-center overflow-hidden ${className}`}
      style={{ 
        width: size, 
        height: isBlinking ? 2 : size, // Collapse height when blinking
        backgroundColor: whiteColor,
        transition: 'height 0.1s ease-in-out'
      }}
    >
      {!isBlinking && (
        <motion.div
          className="rounded-full"
        style={{ 
          width: pupilSize, 
          height: pupilSize, 
          backgroundColor: pupilColor,
        }}
        animate={{
          x: pupilPos.x,
          y: pupilPos.y,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      )}
    </div>
  );
}
