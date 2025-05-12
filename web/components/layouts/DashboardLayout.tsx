"use client";

import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import DashboardNav from './DashboardNav';
import DashboardHeader from './DashboardHeader';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [showNav, setShowNav] = useState(false);

  // Apply dashboard layout only on /demo routes
  const isDashboardRoute = pathname.startsWith("/demo");
  if (!isDashboardRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Overlay for mobile nav */}
      {showNav && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={() => setShowNav(false)}
        />
      )}
      {/* Sidebar navigation */}
      <div
        className={
          `fixed inset-y-0 left-0 z-50 transform ${
            showNav ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-200 ease-in-out md:static md:translate-x-0`
        }
      >
        <DashboardNav />
      </div>
      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <DashboardHeader onNavToggle={() => setShowNav((prev) => !prev)} />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}