"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseClient';

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function handleAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.replace('/demo');
      } else {
        router.replace('/login');
      }
    }
    handleAuth();
  }, [router, supabase]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Loading...</p>
    </div>
  );
}