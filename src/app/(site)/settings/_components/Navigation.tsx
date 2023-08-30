"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SettingsNavigation() {
  const pathname = usePathname();

  return (
    <div className="flex w-full flex-col border-none md:w-1/4">
      <Link
        href="/settings/user"
        className={`text-md w-full px-4 py-8 text-center transition-all hover:text-brand-400 ${
          pathname === "/settings/user" &&
          "bg-brand-500 text-white hover:text-white"
        }`}
      >
        User Settings
      </Link>
      <Link
        href="/settings/blog"
        className={`text-md w-full px-4 py-8 text-center transition-all hover:text-brand-400 ${
          pathname === "/settings/blog" &&
          "bg-brand-500 text-white hover:text-white"
        }`}
      >
        Blog Settings
      </Link>
    </div>
  );
}
