import React from 'react';
import { User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageProps {
  content: string;
  isAI: boolean;
}

export function Message({ content, isAI }: MessageProps) {
  return (
    <div className={cn(
      'flex gap-4 p-4',
      isAI ? 'bg-background-secondary' : 'bg-background'
    )}>
      <div className={cn(
        'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full',
        isAI ? 'bg-primary' : 'bg-foreground-secondary'
      )}>
        {isAI ? (
          <Bot className="h-5 w-5 text-white" />
        ) : (
          <User className="h-5 w-5 text-background" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-sm text-foreground">{content}</p>
      </div>
    </div>
  );
}