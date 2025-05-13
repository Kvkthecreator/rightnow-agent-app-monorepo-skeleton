"use client";
import React, { ReactNode, useState } from "react";
import MainNav from "./MainNav";
import SidebarNav from "./SidebarNav";

interface ShellProps {
  children: ReactNode;
}

export default function Shell({ children }: ShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarNav collapsed={collapsed} />
      <div className="flex flex-col flex-1">
        <MainNav
          collapsed={collapsed}
          onCollapseToggle={() => setCollapsed((prev) => !prev)}
        />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}