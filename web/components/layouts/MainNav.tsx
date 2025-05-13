"use client";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface MainNavProps {
  collapsed?: boolean;
  onCollapseToggle?: () => void;
}

export default function MainNav({ collapsed = false, onCollapseToggle }: MainNavProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b border-border bg-background">
      <div className="flex items-center">
        {onCollapseToggle && (
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:inline-flex mr-3"
            onClick={onCollapseToggle}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        )}
        <Link href="/" className="text-xl font-bold">
          rgtNOW
        </Link>
      </div>
      {/* Placeholder for future actions */}
      <div />
    </header>
  );
}