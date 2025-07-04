
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';

const LeagueChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: 'Commissioner', text: 'Welcome to the league chat!', time: '10:30 AM' },
    { id: 2, user: 'Player1', text: 'Looking forward to the draft!', time: '10:35 AM' },
    { id: 3, user: 'Player2', text: 'Any updates on the draft date?', time: '10:40 AM' },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: 'You',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
      <Header />
      <div className="pt-16">
        <header className="py-10 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">League Chat</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">Chat with your league members</p>
          </div>
        </header>
        <main className="px-4 md:px-8 pb-8 max-w-4xl mx-auto">
          <Card className="h-[600px] flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{msg.user}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{msg.time}</span>
                    </div>
                    <div className="bg-gray-100 dark:bg-zinc-800 rounded-lg p-3">
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default LeagueChat;
