
import React from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Check, X, Clock, Trophy } from 'lucide-react';

export interface TestResult {
  id: string;
  title: string;
  date: Date;
  score: number;
  questionsCount: number;
  category: string;
  time?: number; // in seconds
}

interface TestHistoryCardProps {
  test: TestResult;
  className?: string;
}

const TestHistoryCard: React.FC<TestHistoryCardProps> = ({ test, className }) => {
  const percentageScore = Math.round((test.score / test.questionsCount) * 100);
  const isPerfect = test.score === test.questionsCount;
  
  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return 'text-justice-green';
    if (percentage >= 70) return 'text-justice-blue';
    if (percentage >= 50) return 'text-justice-indigo';
    return 'text-justice-purple';
  };
  
  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-justice-green/10';
    if (percentage >= 70) return 'bg-justice-blue/10';
    if (percentage >= 50) return 'bg-justice-indigo/10';
    return 'bg-justice-purple/10';
  };
  
  const formatTime = (seconds?: number) => {
    if (!seconds) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn(
      'rounded-xl border p-4 transition-smooth',
      'hover:shadow-sm hover:border-primary/20',
      'animate-fade-in', 
      className
    )}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
              {test.category}
            </span>
            {isPerfect && (
              <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-justice-green/10 text-justice-green">
                <Trophy className="h-3 w-3 mr-1" />
                Perfect
              </span>
            )}
          </div>
          <h3 className="font-medium text-foreground mt-1.5">{test.title}</h3>
        </div>
        
        <div className={cn(
          'text-sm font-semibold rounded-full px-3 py-1',
          getScoreBgColor(percentageScore),
          getScoreColor(percentageScore)
        )}>
          {percentageScore}%
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-sm mt-3">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground mb-1">Date</span>
          <span className="font-medium">{format(test.date, 'MMM d, yyyy')}</span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground mb-1">Score</span>
          <span className="font-medium flex items-center">
            {test.score} / {test.questionsCount}
          </span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground mb-1">Time</span>
          <span className="font-medium flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
            {formatTime(test.time)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestHistoryCard;
