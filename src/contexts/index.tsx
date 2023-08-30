"use client";

import { ChakraUIContext } from "@/contexts/ChakraUIContext";
import { NextAuthContext } from "./NextAuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraUIContext>
      <NextAuthContext>{children}</NextAuthContext>
    </ChakraUIContext>
  );
}
