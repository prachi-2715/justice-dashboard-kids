
import React, { useState, useEffect } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
  formatValue?: (value: number) => string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 1000,
  className = "",
  formatValue = (val) => Math.round(val).toString()
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    let startTime: number | null = null;
    const startValue = displayValue;
    const changeInValue = value - startValue;
    
    const animateNumber = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutQuad(progress);
      
      const currentValue = startValue + changeInValue * easedProgress;
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      }
    };
    
    requestAnimationFrame(animateNumber);
    
    return () => {
      startTime = null;
    };
  }, [value, duration]);
  
  // Easing function for smoother animation
  const easeOutQuad = (t: number): number => t * (2 - t);
  
  return (
    <span className={className}>{formatValue(displayValue)}</span>
  );
};

export default AnimatedNumber;
