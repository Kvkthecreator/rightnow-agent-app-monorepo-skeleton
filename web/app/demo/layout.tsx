import { ReactNode } from "react";
import Shell from "@/components/layouts/Shell";

interface DemoLayoutProps {
  children: ReactNode;
}

export default function DemoLayout({ children }: DemoLayoutProps) {
  return <Shell>{children}</Shell>;
}