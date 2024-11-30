import { toast } from 'react-hot-toast';
import { initializeAIModels, getModelRequirements } from '../utils/ai';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

class ChatService {
  private messages: ChatMessage[] = [];
  private aiCapabilities: any = null;

  constructor() {
    this.initService();
  }

  private async initService() {
    this.aiCapabilities = await initializeAIModels();
  }

  async sendMessage(content: string): Promise<ChatMessage> {
    try {
      // Create user message
      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        timestamp: Date.now()
      };
      
      this.messages.push(userMessage);

      // Process with AI and get response
      const response = await this.processWithAI(content);
      
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      };

      this.messages.push(assistantMessage);
      return assistantMessage;
    } catch (error) {
      console.error('Chat error:', error);
      toast.error('Failed to process message. Please try again.');
      throw error;
    }
  }

  private async processWithAI(content: string): Promise<string> {
    // Simulate AI processing for now
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `I understand you want to ${content.toLowerCase()}. I can help you with that using our AI video editing tools.`;
  }

  getMessages(): ChatMessage[] {
    return [...this.messages];
  }

  clearMessages() {
    this.messages = [];
  }
}

export const chatService = new ChatService();