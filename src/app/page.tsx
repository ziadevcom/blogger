"use client";

import { Button, useColorMode } from "@chakra-ui/react";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </div>
  );
}
