
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import AnimatedNumber from './AnimatedNumber';
import { ArrowUpRight, Info } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface ProgressCardProps {
  title: string;
  score: number;
  maxScore: number;
  change?: number;
  infoText?: string;
  className?: string;
  showPercentage?: boolean;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  score,
  maxScore,
  change,
  infoText,
  className,
  showPercentage = true,
}) => {
  const percentage = Math.round((score / maxScore) * 100) || 0;
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.setProperty('--progress-width', `${percentage}%`);
    }
  }, [percentage]);

  return (
    <div className={cn(
      'rounded-2xl p-5 border backdrop-blur-sm bg-background/60 transition-all duration-300',
      'hover:bg-background/90 hover:shadow-md hover:border-border/80',
      'animate-scale-in',
      className
    )}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-1">
          {title}
          {infoText && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 text-muted-foreground/70 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px] text-xs">
                  {infoText}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </h3>
        
        {change !== undefined && (
          <div className={cn(
            'flex items-center text-xs font-medium rounded-full px-2 py-0.5',
            change >= 0 
              ? 'text-justice-green bg-justice-green/10' 
              : 'text-destructive bg-destructive/10'
          )}>
            <ArrowUpRight className={cn(
              'h-3.5 w-3.5 mr-0.5', 
              change < 0 && 'rotate-180'
            )} />
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <AnimatedNumber 
            value={score} 
            className="text-2xl font-semibold" 
          />
          {maxScore > 0 && (
            <span className="text-sm text-muted-foreground">/ {maxScore}</span>
          )}
          
          {showPercentage && (
            <AnimatedNumber 
              value={percentage} 
              className="ml-auto text-lg font-medium" 
              formatValue={(val) => `${Math.round(val)}%`}
            />
          )}
        </div>
        
        <div className="mt-3 h-2 w-full bg-secondary rounded-full overflow-hidden">
          <div 
            ref={progressBarRef}
            className="h-full rounded-full animate-progress-fill bg-primary"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
