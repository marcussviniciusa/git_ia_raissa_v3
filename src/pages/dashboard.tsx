import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/header';
import { AICard } from '@/components/ai/ai-card';
import { aiAssistants } from '@/data/ai-assistants';
import { AIAssistant } from '@/types/ai';

export function DashboardPage() {
  const navigate = useNavigate();

  const handleSelectAI = (ai: AIAssistant) => {
    navigate(`/chat/${ai.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">AI Assistants</h2>
          <p className="mt-1 text-foreground-secondary">
            Select an AI assistant to start a conversation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiAssistants.map((ai) => (
            <AICard key={ai.id} ai={ai} onSelect={handleSelectAI} />
          ))}
        </div>
      </main>
    </div>
  );
}