"use client";

import { Button, useColorMode } from "@chakra-ui/react";
import { Sun, Moon } from "lucide-react";

export function ColorModeSwitcher() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} variant="ghost">
      {colorMode === "dark" ? <Sun /> : <Moon />}
      <span className="sr-only">Change color mode</span>
    </Button>
  );
}
