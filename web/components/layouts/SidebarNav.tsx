"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
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
  /** Collapse sidebar width on desktop */
  collapsed?: boolean;
  /** Toggle collapse state (desktop) */
  onCollapseToggle?: () => void;
}

export default function SidebarNav({ collapsed = false, onCollapseToggle }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "shrink-0 flex flex-col bg-background border-r border-border h-full transition-all duration-200 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar header: collapse toggle and app title */}
        <div className="flex items-center p-4 border-b border-border">
          {onCollapseToggle && (
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={onCollapseToggle}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="border-r border-border h-6 px-2" />
          {!collapsed && (
            <Link href="/" className="text-lg font-bold">
              rgtNOW
            </Link>
          )}
        </div>
        {/* Navigation items */}
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
        {/* Sidebar footer: user menu */}
        <div
          className={cn(
            "flex items-center p-4 border-t border-border",
            collapsed ? "justify-center" : ""
          )}
        >
          <UserNav compact={collapsed} />
        </div>
      </div>
    </nav>
  );
}