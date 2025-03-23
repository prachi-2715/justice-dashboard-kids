
import React from 'react';
import { cn } from '@/lib/utils';
import TestHistoryCard, { TestResult } from './TestHistoryCard';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TestResultsProps {
  results: TestResult[];
  className?: string;
  maxHeight?: string;
  emptyMessage?: string;
}

const TestResults: React.FC<TestResultsProps> = ({ 
  results, 
  className,
  maxHeight = '400px',
  emptyMessage = 'No test results yet'
}) => {
  // Check if results is undefined, null, or empty
  const isEmpty = !results || results.length === 0;

  if (isEmpty) {
    return (
      <div className={cn(
        'flex items-center justify-center p-8 text-muted-foreground text-sm',
        className
      )}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      <ScrollArea className={cn('w-full pr-4')} style={{ maxHeight }}>
        <div className="grid grid-cols-1 gap-3">
          {results.map(test => (
            <TestHistoryCard key={test.id} test={test} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TestResults;
