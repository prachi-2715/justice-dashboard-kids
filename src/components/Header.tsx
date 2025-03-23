
import React from 'react';
import { cn } from '@/lib/utils';
import { Book, BookOpen, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface HeaderProps {
  userName?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  userName = 'Young Learner',
  className 
}) => {
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <header className={cn(
      'w-full flex items-center justify-between py-4 px-6 backdrop-blur-sm border-b animate-fade-in',
      className
    )}>
      <div className="flex items-center">
        <BookOpen className="h-5 w-5 text-primary mr-2" />
        <h1 className="text-lg font-semibold">Justice Play</h1>
        <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Kids Know Rights</span>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
          <Book className="h-4 w-4" />
          <span>Learn</span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Book className="mr-2 h-4 w-4" />
              <span>Learning Materials</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
