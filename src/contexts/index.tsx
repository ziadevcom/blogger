import { ChakraUIContext } from "@/contexts/ChakraUIContext";

export function Providers({ children }: { children: React.ReactNode }) {
  <ChakraUIContext>{children}</ChakraUIContext>;
}
