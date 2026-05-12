import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';

interface ScrambleNumberProps {
  value: string;
  duration?: number;
  className?: string;
}

export default function ScrambleNumber({ value, duration = 1500, className = "" }: ScrambleNumberProps) {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number | null = null;
    let animationFrame: number;
    const chars = "0123456789!@#$%^&*";

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      if (percentage < 1) {
        // Scramble
        let scrambled = "";
        for (let i = 0; i < value.length; i++) {
          if (value[i] === " " || value[i] === "," || value[i] === ".") {
            scrambled += value[i];
          } else if (Math.random() < percentage) {
            scrambled += value[i];
          } else {
            scrambled += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        setDisplayText(scrambled);
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayText(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, isInView]);

  return <span ref={ref} className={className}>{displayText || " "}</span>;
}
