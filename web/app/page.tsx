 'use client';

import Logo from '../components/Logo';
import Link from 'next/link';
import { Button } from '../components/ui/Button';

 export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="flex justify-between items-center py-4 px-8">
        <Logo variant="dark" />
        <Button asChild variant="ghost" size="sm">
          <Link href="/login">Sign up / Login</Link>
        </Button>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="flex flex-col items-center py-24 space-y-6 px-4 sm:px-6">
          <h1 className="text-5xl sm:text-6xl font-bold text-center leading-tight">
            want to be an influencer or content creator?
          </h1>
          <p className="text-lg text-center text-gray-500 mt-4">
            but not sure what’s your niche? or where to start? get tailor-made report just for you!
          </p>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <Button asChild variant="outline">
              <Link href="#value-stats">Tell me how it works</Link>
            </Button>
            <Button asChild variant="default">
              <Link href="/profile-create">Create Profile</Link>
            </Button>
          </div>
        </section>

        {/* Mid-Section: Value + Stats */}
        <section
          id="value-stats"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 py-20 border-t border-b px-4 sm:px-6"
        >
          <div className="text-2xl font-medium leading-relaxed text-left">
            rightNOW helps creators find their niche, launch faster, and grow with clarity.
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col items-center border p-6 rounded-lg">
              <span className="text-5xl font-bold">1K+</span>
              <span className="text-sm text-muted-foreground mt-2">
                Profiles created with our AI
              </span>
            </div>
            <div className="flex flex-col items-center border p-6 rounded-lg">
              <span className="text-5xl font-bold">20+</span>
              <span className="text-sm text-muted-foreground mt-2">
                Marketing strategies launched
              </span>
            </div>
            <div className="flex flex-col items-center border p-6 rounded-lg">
              <span className="text-5xl font-bold">50+</span>
              <span className="text-sm text-muted-foreground mt-2">
                Creators grew their audience with us
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 text-sm px-4 sm:px-6">
          <div>
            <Logo variant="dark" />
          </div>
          <div>
            <h4 className="font-semibold mb-2">CONTACT</h4>
            <p>contactus@rgtnow.com</p>
          </div>
          <div>
            <ul className="space-y-1">
              <li>
                <Link href="/privacy" className="underline hover:text-gray-700">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/services" className="underline hover:text-gray-700">
                  Services
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}