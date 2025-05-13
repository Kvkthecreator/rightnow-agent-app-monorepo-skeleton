"use client";

import { FC } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import UserDropdown from "@/components/UserDropdown";

interface DashboardHeaderProps {
  onNavToggle?: () => void;
}

const DashboardHeader: FC<DashboardHeaderProps> = ({ onNavToggle }) => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      {onNavToggle && (
        <Button variant="ghost" size="sm" className="md:hidden" onClick={onNavToggle}>
          <Menu className="h-5 w-5" />
        </Button>
      )}
      <div className="flex-1 flex items-center justify-center md:justify-start">
        {/* Optional: Breadcrumb or page title */}
      </div>
      <div className="flex items-center">
        <UserDropdown />
      </div>
    </header>
  );
};

export default DashboardHeader;