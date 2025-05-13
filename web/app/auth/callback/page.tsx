"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseClient';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    async function handleAuth() {
      try {
        // Parse session from the URL and handle OAuth code exchange
        const { data: { session }, error } = await supabase.auth.getSessionFromUrl();
        if (error || !session) {
          router.replace('/login');
        } else {
          router.replace('/demo');
        }
      } catch (err) {
        console.error("Error handling auth callback:", err);
        router.replace('/login');
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