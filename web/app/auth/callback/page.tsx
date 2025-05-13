"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseClient';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    async function handleAuth() {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        router.replace('/login');
      } else {
        router.replace('/demo');
      }
    }
    handleAuth();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting...</p>
    </div>
  );
}