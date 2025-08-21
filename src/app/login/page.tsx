
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { Progress } from '@/components/ui/progress';

export default function LoginPage() {
  const router = useRouter();
  const [isLoginView, setIsLoginView] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginView) {
      // In a real application, you would handle authentication here.
      // For this prototype, we'll just navigate to the dashboard.
      router.push('/dashboard');
    } else {
      if (password !== confirmPassword) {
        setPasswordsMatch(false);
        return;
      }
      setPasswordsMatch(true);
      // Handle registration logic
      router.push('/dashboard');
    }
  };

  const checkPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length > 8) score++;
    if (password.match(/[a-z]/)) score++;
    if (password.match(/[A-Z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[^a-zA-Z0-9]/)) score++;
    return score;
  };

  const passwordStrength = useMemo(() => checkPasswordStrength(password), [password]);
  const passwordStrengthPercentage = (passwordStrength / 5) * 100;

  const getStrengthLabel = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'Very Weak';
      case 2:
        return 'Weak';
      case 3:
        return 'Medium';
      case 4:
        return 'Strong';
      case 5:
        return 'Very Strong';
      default:
        return '';
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icons.logo className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">CreditClarity</h1>
          </div>
          <CardTitle className="text-2xl text-center">
            {isLoginView ? 'Login' : 'Sign Up'}
          </CardTitle>
          <CardDescription className="text-center">
            {isLoginView
              ? 'Enter your email below to login to your account'
              : 'Create a new account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              {!isLoginView && (
                 <div className="grid gap-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="John Doe" required />
                </div>
              )}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {isLoginView && (
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  )}
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isLoginView && password.length > 0 && (
                  <div className='space-y-2 mt-1'>
                    <Progress value={passwordStrengthPercentage} className='h-2' />
                    <p className='text-xs text-muted-foreground'>Password Strength: {getStrengthLabel()}</p>
                  </div>
                )}
              </div>
              {!isLoginView && (
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                  />
                  {!passwordsMatch && (
                    <p className="text-sm text-destructive">Passwords do not match.</p>
                  )}
                </div>
              )}
              <Button type="submit" className="w-full">
                {isLoginView ? 'Login' : 'Create Account'}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            {isLoginView ? "Don't have an account?" : 'Already have an account?'}{' '}
            <Button variant="link" onClick={() => setIsLoginView(!isLoginView)} className="p-0">
              {isLoginView ? 'Sign up' : 'Login'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
