"use client";

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Chrome } from 'lucide-react';

export default function LoginPage() {
  // Placeholder for Google sign-in logic
  const signInWithGoogle = () => {
    console.log('signInWithGoogle called');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="rounded-lg shadow-sm p-6 bg-white">
        <div className="space-y-4">
          <Button onClick={signInWithGoogle} className="w-full">
            <Chrome className="mr-2 h-4 w-4" />
            Login with Google
          </Button>
        </div>
      </Card>
    </div>
  );
}