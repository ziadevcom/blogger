import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { ColorModeSwitcher } from "@/components/ColorModeSwitcher";
import { UserAvatar } from "./UserAvatar";
import { Spacer, Show } from "@/utils/@chakraui/wrapper";
import { Container } from "@/components/Container";
import { NavigationMobile } from "./NavigationMobile";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/db/prisma.client";

export async function Header() {
  const session = await getServerSession(authOptions);

  const blog = await prisma.blog.findFirst({
    where: { userId: session?.user?.id },
    select: { slug: true },
  });

  return (
    <header className="pt-4">
      <Container display="flex" paddingY="3" paddingX="4">
        <Logo />
        <Spacer />
        <div className="flex items-center justify-center gap-2 md:flex-row md:justify-end md:gap-4">
          <Show above="md">
            <Navigation slug={blog?.slug} />
            <ColorModeSwitcher />
            <UserAvatar />
          </Show>
          <Show below="md">
            <NavigationMobile slug={blog?.slug} />
            <ColorModeSwitcher />
          </Show>
        </div>
      </Container>
    </header>
  );
}
