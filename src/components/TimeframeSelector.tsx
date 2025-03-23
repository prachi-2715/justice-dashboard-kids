
import React from 'react';
import { cn } from '@/lib/utils';

export type TimeframeOption = 'weekly' | 'monthly' | 'quarterly';

interface TimeframeSelectorProps {
  selected: TimeframeOption;
  onChange: (timeframe: TimeframeOption) => void;
  className?: string;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({
  selected,
  onChange,
  className
}) => {
  const options: { value: TimeframeOption; label: string }[] = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  return (
    <div className={cn('inline-flex rounded-full p-1 bg-secondary', className)}>
      {options.map(option => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-50',
            selected === option.value
              ? 'text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {selected === option.value && (
            <span className="absolute inset-0 bg-primary rounded-full animate-scale-in" />
          )}
          <span className={cn(
            'relative z-10 transition-colors',
            selected === option.value ? 'text-white' : ''
          )}>
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TimeframeSelector;
