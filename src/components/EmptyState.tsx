
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Award, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  className?: string;
  onStartTest?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  className,
  onStartTest
}) => {
  return (
    <div className={cn(
      'w-full flex flex-col items-center justify-center py-16 px-4',
      'animate-slide-up',
      className
    )}>
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse-soft"></div>
        <div className="absolute inset-3 bg-primary/10 rounded-full animate-pulse-soft animation-delay-150"></div>
        <BookOpen className="absolute inset-0 m-auto h-12 w-12 text-primary animate-float" />
      </div>
      
      <h2 className="text-2xl font-semibold mb-2 text-balance text-center">
        Begin Your Rights Journey
      </h2>
      
      <p className="text-muted-foreground mb-8 max-w-md text-center text-balance">
        Complete tests to track your progress and learn about your rights as a child.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full max-w-3xl">
        {[
          { 
            icon: <BookOpen className="h-8 w-8 mb-2 text-justice-blue" />, 
            title: "Learn", 
            description: "Discover your rights through interactive lessons" 
          },
          { 
            icon: <Award className="h-8 w-8 mb-2 text-justice-purple" />, 
            title: "Test", 
            description: "Take quizzes to show what you've learned" 
          },
          { 
            icon: <Lightbulb className="h-8 w-8 mb-2 text-justice-green" />, 
            title: "Grow", 
            description: "Track your progress and build knowledge" 
          },
        ].map((item, index) => (
          <div 
            key={index}
            className="flex flex-col items-center p-6 rounded-xl bg-card border transition-smooth hover:border-primary/20 hover:bg-accent/50"
          >
            {item.icon}
            <h3 className="font-medium text-lg">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
      
      <Button 
        size="lg" 
        className="px-6 font-medium animate-pulse-soft"
        onClick={onStartTest}
      >
        Take Your First Test
      </Button>
    </div>
  );
};

export default EmptyState;
