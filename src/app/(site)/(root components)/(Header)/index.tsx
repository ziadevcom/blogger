import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { ColorModeSwitcher } from "@/components/ColorModeSwitcher";
import { UserAvatar } from "./UserAvatar";

export function Header() {
  return (
    <header className="flex justify-between items-center py-4">
      <Logo />
      <div className="flex flex-col md:flex-row justify-end items-center gap-2">
        <Navigation />
        <ColorModeSwitcher />
        <UserAvatar />
      </div>
    </header>
  );
}
