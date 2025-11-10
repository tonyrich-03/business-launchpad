// src/types/message.ts
export interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  recipient: {
    id: string;
    name: string;
    email: string;
  };
  subject: string;
  body: string;
  timestamp: Date;
  read: boolean;
  replies?: Message[];
  category: 'inquiry' | 'collaboration' | 'support' | 'general';
  priority: 'low' | 'normal' | 'high';
}

export interface MessageThread {
  id: string;
  subject: string;
  participants: Array<{
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }>;
  messages: Message[];
  lastMessage: Date;
  unreadCount: number;
}