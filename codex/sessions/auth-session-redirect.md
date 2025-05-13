## 📄 codex reply

    codex
    I’ve wired up full client-side OAuth redirection and route protection:

    • Added web/lib/supabaseClient.ts for a shared browser client.
    • Updated web/app/login/page.tsx to
      – Instantiate Supabase, check for an existing session (redirect to /demo).
      – Call supabase.auth.signInWithOAuth on Google button click (redirect back to /auth/callback).
    • Created web/app/auth/callback/page.tsx to read the new session after the Supabase redirect and send users to /demo (or back to
    /login on failure).
    • Added web/middleware.ts that checks the sb-access-token cookie and redirects anyone who isn’t signed in from /demo/* back to
    /login.

    Next steps:

        1. Ensure your `.env.local` has `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
        2. Restart your dev server (`npm run dev`) and verify the flows:
            * Unauthenticated → `/demo` redirects to `/login`.

            * Clicking “Login with Google” takes you to Supabase and back.

            * Authenticated → `/login` immediately pushes to `/demo`.
╭────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                                                                    │
╰────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
  ctrl+c to exit | "/" to see commands | enter to send — 97% context left

### git commit message log

feat(auth): wire up Supabase OAuth flow + route protection

- Add web/lib/supabaseClient.ts for shared browser client
- Update web/app/login/page.tsx
  • Instantiate Supabase, check for existing session → redirect to /demo
  • Call supabase.auth.signInWithOAuth on Google button click (→ /auth/callback)
- Create web/app/auth/callback/page.tsx
  • Read new session after Supabase redirect
  • Push users to /demo (or back to /login on failure)
- Add web/middleware.ts to guard /demo/* routes by sb-access-token cookie

**Next steps:**
1. Ensure `.env.local` has NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY  
2. Restart dev server (`npm run dev`) and verify:
   - Unauthenticated → `/demo` → `/login`  
   - “Login with Google” → Supabase → `/auth/callback` → `/demo`  
   - Authenticated → visiting `/login` auto-redirects to `/demo`
