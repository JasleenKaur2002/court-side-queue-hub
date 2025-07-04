
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Mail, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const InviteFriends = () => {
  const [emails, setEmails] = useState('');
  const [inviteLink] = useState('https://4cast.app/join/ABC123');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendInvites = async () => {
    if (!emails.trim()) {
      toast({
        title: "Error",
        description: "Please enter at least one email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setEmails('');
      toast({
        title: "Invites Sent",
        description: "Your friends have been invited to join the league!",
      });
    }, 1000);
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast({
      title: "Copied!",
      description: "Invite link copied to clipboard",
    });
  };

  const shareInviteLink = () => {
    if (navigator.share) {
      navigator.share({
        title: '4Cast League Invitation',
        text: 'Join my fantasy league!',
        url: inviteLink,
      });
    } else {
      copyInviteLink();
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
      <Header />
      <div className="pt-16">
        <header className="py-10 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">Invite Friends</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">Invite your friends to join your league</p>
          </div>
        </header>
        <main className="px-4 md:px-8 pb-8 max-w-4xl mx-auto space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Share Invite Link</h2>
            <div className="space-y-4">
              <div>
                <Label>League Invite Link</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input value={inviteLink} readOnly className="bg-gray-100 dark:bg-zinc-800" />
                  <Button variant="outline" size="icon" onClick={copyInviteLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={shareInviteLink}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Send Email Invitations</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="emails">Email Addresses</Label>
                <textarea
                  id="emails"
                  value={emails}
                  onChange={(e) => setEmails(e.target.value)}
                  placeholder="Enter email addresses separated by commas or new lines..."
                  className="w-full p-3 border rounded-md bg-white dark:bg-zinc-900 min-h-[120px]"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Separate multiple emails with commas or new lines
                </p>
              </div>
              <Button onClick={handleSendInvites} disabled={isLoading} className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{isLoading ? "Sending..." : "Send Invitations"}</span>
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">League Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Current Members</span>
                <Badge>4 / 12</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Pending Invitations</span>
                <Badge variant="outline">2</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Available Spots</span>
                <Badge variant="secondary">6</Badge>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default InviteFriends;
