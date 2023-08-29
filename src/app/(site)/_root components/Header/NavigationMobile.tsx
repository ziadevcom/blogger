"use client";

import {
  ButtonGroup,
  Box,
  Link as ChakraLink,
  useDisclosure,
  Slide,
  IconButton,
  Icon as ChakraIcon,
  useColorModeValue,
} from "@/utils/@chakraui/wrapper";
import NextLink from "next/link";
import { useSession } from "next-auth/react";
import { ChevronRight, Menu, X } from "lucide-react";
import { MouseEventHandler, createContext, useContext } from "react";

type MobileMenuContextType = {
  closeMenu: MouseEventHandler;
};

const MobileMenuContext = createContext<MobileMenuContextType | null>(null);

export function NavigationMobile({
  slug,
}: {
  slug: string | null | undefined;
}) {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <MobileMenuContext.Provider value={{ closeMenu: onClose }}>
      <IconButton onClick={onOpen} aria-label="Open Menu" variant="ghost">
        <Menu />
      </IconButton>

      <Slide direction="right" in={isOpen} style={{ zIndex: 10 }}>
        <Box className="h-full w-full p-4" bg="container">
          <div className="mb-4 flex justify-end">
            <IconButton
              onClick={onClose}
              aria-label="Close menu"
              variant="ghost"
              justifyContent="end"
            >
              <X />
            </IconButton>
          </div>
          {session?.user ? (
            <>
              {slug && <MobileMenuItem href={"/" + slug} text="My Blog" />}
              <MobileMenuItem href="/posts" text="Admin" />
              <MobileMenuItem href="/settings/user" text="Settings" />
            </>
          ) : (
            <>
              <MobileMenuItem href="/login" text="Login" />
              <MobileMenuItem href="/register" text="Register" />
            </>
          )}
        </Box>
      </Slide>
    </MobileMenuContext.Provider>
  );
}

function MobileMenuItem({ href, text }: { href: string; text: string }) {
  const { closeMenu } = useContext(MobileMenuContext) as MobileMenuContextType;

  return (
    <ChakraLink
      as={NextLink}
      href={href}
      className="mb-4 flex w-full justify-between border-b-[1px] py-4 text-base"
      borderColor="border"
      onClick={closeMenu}
    >
      {text}
      <ChakraIcon as={ChevronRight} color="brand.400" boxSize={5}></ChakraIcon>
    </ChakraLink>
  );
}
