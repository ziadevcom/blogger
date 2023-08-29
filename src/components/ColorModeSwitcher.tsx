"use client";

import { IconButton, useColorMode } from "@/utils/@chakraui/wrapper";
import { Sun, Moon } from "lucide-react";

export function ColorModeSwitcher() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Change color mode"
      onClick={toggleColorMode}
      variant="ghost"
    >
      {colorMode === "dark" ? <Sun /> : <Moon />}
    </IconButton>
  );
}
