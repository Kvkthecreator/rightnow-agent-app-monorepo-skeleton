"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User } from "lucide-react";
import { cn } from "@/lib/utils";
import UserNav from "@/components/UserNav";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { title: "Demo", href: "/demo", icon: Home },
  { title: "Profile", href: "/demo/profile-preview", icon: User },
];

interface SidebarNavProps {
  collapsed?: boolean;
}

export default function SidebarNav({ collapsed = false }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "shrink-0 flex flex-col bg-background border-r border-border h-full transition-all duration-200 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted",
                  collapsed ? "justify-center" : "space-x-2"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </div>
        <div className="p-4 border-t border-border">
          <UserNav />
        </div>
      </div>
    </nav>
  );
}