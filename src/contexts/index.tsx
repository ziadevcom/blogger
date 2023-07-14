"use client";

import { ChakraUIContext } from "@/contexts/ChakraUIContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraUIContext>{children}</ChakraUIContext>;
}
