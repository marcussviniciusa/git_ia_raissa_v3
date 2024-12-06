import { create } from 'zustand';

export interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: number;
}

interface ChatState {
  messages: Record<string, Message[]>;
  addMessage: (aiId: string, content: string, isAI: boolean) => void;
  clearChat: (aiId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: {},
  addMessage: (aiId, content, isAI) => set((state) => ({
    messages: {
      ...state.messages,
      [aiId]: [
        ...(state.messages[aiId] || []),
        {
          id: Math.random().toString(36).substring(7),
          content,
          isAI,
          timestamp: Date.now(),
        },
      ],
    },
  })),
  clearChat: (aiId) => set((state) => ({
    messages: {
      ...state.messages,
      [aiId]: [],
    },
  })),
}));