import { LucideIcon } from 'lucide-react';

export interface AIAssistant {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  systemPrompt: string;
}