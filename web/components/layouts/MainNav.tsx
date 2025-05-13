"use client";
import Link from "next/link";
import UserNav from "@/components/UserNav";

export default function MainNav() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <Link href="/" className="text-xl font-bold">
        rgtNOW
      </Link>
      <UserNav />
    </header>
  );
}