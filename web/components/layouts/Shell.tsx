"use client";
import React, { ReactNode } from "react";
import MainNav from "./MainNav";
import SidebarNav from "./SidebarNav";

interface ShellProps {
  children: ReactNode;
}

export default function Shell({ children }: ShellProps) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarNav />
      <div className="flex flex-col flex-1">
        <MainNav />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}