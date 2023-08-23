import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { ColorModeSwitcher } from "@/components/ColorModeSwitcher";
import { UserAvatar } from "./UserAvatar";
import { Spacer } from "@/utils/@chakraui/wrapper";
import { Container } from "@/components/Container";

export function Header() {
  return (
    <header className="pt-4">
      <Container
        display="flex"
        flexDirection={["column", "row"]}
        paddingY="3"
        paddingX="4"
      >
        <Logo />
        <Spacer />
        <div className="flex flex-col items-center justify-end gap-2 md:flex-row">
          <Navigation />
          <ColorModeSwitcher />
          <UserAvatar />
        </div>
      </Container>
    </header>
  );
}
