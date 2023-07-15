"use client";

import { SessionProvider } from "next-auth/react";

export function NextAuthContext({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
