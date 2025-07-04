import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useLoading } from '@/contexts/LoadingContext';

const Auth = () => {
  const [role, setRole] = useState<'commissioner' | 'participant' | null>(null);
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const handleAuthAction = (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true, "Authenticating user...");
    
    setTimeout(() => {
      setLoading(true, "Loading NBA data...");
    }, 1000);
    
    setTimeout(() => {
      setLoading(true, "Setting up your account...");
    }, 2000);
    
    setTimeout(() => {
      setLoading(false);
      toast({
        title: `${mode === 'signup' ? 'Signed Up Successfully' : 'Signed In Successfully'}`,
        description: 'Welcome to 4Cast Draft! Redirecting to dashboard...',
      });
      setTimeout(() => {
          if (role === 'commissioner') {
              navigate('/commissioner');
          } else {
              navigate('/lobby');
          }
      }, 1500);
    }, 3000);
  };

  const renderRoleSelection = () => (
    <Card className="w-full max-w-md animate-in fade-in-0 zoom-in-95">
      <CardHeader>
        <CardTitle className="text-2xl">Join 4Cast</CardTitle>
        <CardDescription>First, let's get you started. Are you a commissioner or a participant?</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Button className="w-full h-auto py-6 flex flex-col gap-2" size="lg" onClick={() => setRole('commissioner')}>
          <span className="text-lg">Commissioner</span>
          <span className="text-xs font-normal">I'm setting up a new league</span>
        </Button>
        <Button className="w-full h-auto py-6 flex flex-col gap-2" variant="outline" size="lg" onClick={() => setRole('participant')}>
          <span className="text-lg">Participant</span>
          <span className="text-xs font-normal">I'm joining an existing league</span>
        </Button>
      </CardContent>
    </Card>
  );

  const renderAuthForm = () => (
    <Card className="w-full max-w-md animate-in fade-in-0 zoom-in-95">
       <CardHeader>
        <div className="relative">
          <Button variant="ghost" size="icon" onClick={() => setRole(null)} className="absolute -left-2 -top-2">
            &larr;
          </Button>
          <CardTitle className="text-2xl text-center">{mode === 'signup' ? 'Create Account' : 'Sign In'}</CardTitle>
          <CardDescription className="text-center capitalize">
            as a {role}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAuthAction} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" required />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="john.doe@example.com" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button className="w-full" type="submit">
            {mode === 'signup' ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          {mode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
          <button
            onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
            className="underline"
          >
            {mode === 'signup' ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col items-center justify-center p-4">
      <Link to="/" className="absolute top-8 left-8 text-2xl font-bold text-gray-800 dark:text-gray-100">
        4Cast
      </Link>
      {role ? renderAuthForm() : renderRoleSelection()}
    </div>
  );
};

export default Auth;
