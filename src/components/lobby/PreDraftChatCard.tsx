import React, { useState, useRef, useEffect } from 'react';
import SectionCard from './SectionCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: number;
  type: 'system' | 'user';
  name?: string;
  text: string;
  time: string;
}

const initialMessages: Message[] = [
  { id: 1, type: 'system', text: 'Room created successfully!', time: '2:38:13 pm' },
  { id: 2, type: 'user', name: 'Demo Mode', text: 'Ready to draft!', time: '2:38:13 pm' },
  { id: 3, type: 'system', text: 'League settings updated', time: '2:39:45 pm' },
];

const PreDraftChatCard = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    // Use setTimeout to ensure DOM is updated before scrolling
    setTimeout(scrollToBottom, 100);
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        type: 'user',
        name: 'You',
        text: inputMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <SectionCard title="Pre-Draft Chat" className="flex flex-col">
      <div className="mb-3">
        <p className="text-xs text-gray-400">Temporary: Chat with your league members before the draft begins.</p>
      </div>
      <div className="flex-grow flex flex-col">
        <ScrollArea ref={scrollAreaRef} className="h-64 flex-grow pr-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id}>
                {msg.type === 'system' ? (
                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{msg.text}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{msg.time}</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-semibold text-sm">{msg.name}</p>
                    <div className="text-sm bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg inline-block max-w-xs">{msg.text}</div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{msg.time}</p>
                  </div>
                )}
              </div>
            ))}

          </div>
        </ScrollArea>
        <div className="flex items-center gap-2 mt-4">
          <Input 
            placeholder="Type a message..." 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-400 mt-2">Press Enter or click send to post your message</p>
      </div>
    </SectionCard>
  );
};

export default PreDraftChatCard;
