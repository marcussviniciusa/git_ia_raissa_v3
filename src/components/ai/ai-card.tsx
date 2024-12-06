import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AIAssistant } from '@/types/ai';

interface AICardProps {
  ai: AIAssistant;
  onSelect: (ai: AIAssistant) => void;
}

export function AICard({ ai, onSelect }: AICardProps) {
  return (
    <div className="bg-background-secondary border border-border rounded-lg p-6 flex flex-col">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
        <ai.icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{ai.name}</h3>
      <p className="text-foreground-secondary flex-grow mb-4">{ai.description}</p>
      <Button
        onClick={() => onSelect(ai)}
        className="w-full flex items-center justify-center gap-2"
      >
        Start Chat
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}