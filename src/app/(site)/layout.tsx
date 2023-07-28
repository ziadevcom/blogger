"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/contexts";
import { Header } from "@/app/(site)/_root components/Header/index";
import { Footer } from "@/app/(site)/_root components/Footer/Footer";
import {
  Box,
  Container as ChakraContainer,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { Container } from "@/components/Container";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blogger",
  description: "Create your own blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <Providers>
          <Box
            minHeight="100vh"
            minWidth="100vw"
            _dark={{ bg: "gray.900" }}
            _light={{ bg: "gray.100" }}
          >
            <ChakraContainer
              maxW="container.xl"
              display="flex"
              flexDirection="column"
              gap={4}
            >
              <Header />
              <Container>{children}</Container>
              <Footer />
            </ChakraContainer>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
