
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const Support = () => {
  const [ticket, setTicket] = useState({
    subject: '',
    category: '',
    message: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!ticket.subject || !ticket.category || !ticket.message || !ticket.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTicket({ subject: '', category: '', message: '', email: '' });
      toast({
        title: "Support Ticket Submitted",
        description: "We'll get back to you within 24 hours!",
      });
    }, 1000);
  };

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
      <Header />
      <div className="pt-16">
        <header className="py-10 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">Support</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">Get help with your account or report issues</p>
          </div>
        </header>
        <main className="px-4 md:px-8 pb-8 max-w-4xl mx-auto">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Submit a Support Ticket</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={ticket.email}
                  onChange={(e) => setTicket(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={ticket.category} onValueChange={(value) => setTicket(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="billing">Billing Question</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="general">General Question</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={ticket.subject}
                  onChange={(e) => setTicket(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Brief description of your issue"
                />
              </div>
              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={ticket.message}
                  onChange={(e) => setTicket(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Please describe your issue in detail..."
                  rows={6}
                />
              </div>
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Ticket"}
              </Button>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Support;
