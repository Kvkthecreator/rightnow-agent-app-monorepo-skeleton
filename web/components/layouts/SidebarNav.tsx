"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { title: "Demo", href: "/demo", icon: Home },
  { title: "Profile", href: "/demo/profile-preview", icon: User },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 shrink-0 flex flex-col bg-white border-r border-gray-200 h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-2 text-sm font-medium rounded hover:bg-gray-100",
                active && "bg-gray-100"
              )}
            >
              <item.icon className="mr-2 h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}