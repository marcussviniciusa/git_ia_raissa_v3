import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Message } from '@/components/chat/message';
import { ChatInput } from '@/components/chat/chat-input';
import { Button } from '@/components/ui/button';
import { aiAssistants } from '@/data/ai-assistants';
import { useChatStore } from '@/store/chat';
import { chatCompletion, OpenAIError } from '@/lib/openai';

export function ChatPage() {
  const { aiId } = useParams<{ aiId: string }>();
  const navigate = useNavigate();
  const ai = aiAssistants.find((a) => a.id === aiId);
  const messages = useChatStore((state) => state.messages[aiId!] || []);
  const addMessage = useChatStore((state) => state.addMessage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ai) {
      navigate('/dashboard');
    }
  }, [ai, navigate]);

  if (!ai) return null;

  const handleSendMessage = async (content: string) => {
    setError(null);
    addMessage(ai.id, content, false);
    setIsLoading(true);

    try {
      const aiMessages = messages.map(msg => ({
        role: msg.isAI ? 'assistant' : 'user' as const,
        content: msg.content
      }));

      const response = await chatCompletion([
        { role: 'system', content: ai.systemPrompt },
        ...aiMessages,
        { role: 'user', content }
      ]);

      addMessage(ai.id, response, true);
    } catch (error) {
      const errorMessage = error instanceof OpenAIError 
        ? error.message 
        : 'An unexpected error occurred. Please try again.';
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      
      <div className="flex items-center gap-4 bg-background-secondary border-b border-border px-4 py-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/dashboard')}
          className="shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-lg font-semibold text-foreground">{ai.name}</h2>
          <p className="text-sm text-foreground-secondary">{ai.description}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {error && (
            <div className="m-4 p-4 bg-red-900/20 border border-red-900/20 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <ai.icon className="h-12 w-12 text-foreground-secondary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Start chatting with {ai.name}
              </h3>
              <p className="text-foreground-secondary max-w-md">
                Send your first message to begin the conversation.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <Message
                key={message.id}
                content={message.content}
                isAI={message.isAI}
              />
            ))
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full">
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}