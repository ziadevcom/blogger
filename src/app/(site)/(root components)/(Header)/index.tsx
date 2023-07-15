import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { ColorModeSwitcher } from "@/components/ColorModeSwitcher";

export function Header() {
  return (
    <header className="flex justify-between items-center py-4">
      <Logo />
      <div className="flex justify-end items-center gap-2">
        <Navigation />
        <ColorModeSwitcher />
      </div>
    </header>
  );
}
