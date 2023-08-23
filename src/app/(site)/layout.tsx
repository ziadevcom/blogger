import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/contexts";
import { Header } from "@/app/(site)/_root components/Header/index";
import { Footer } from "@/app/(site)/_root components/Footer/Footer";
import { Box, Container as ChakraContainer } from "@/utils/@chakraui/wrapper";
import { Container } from "@/components/Container";

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
          <Box _dark={{ bg: "gray.900" }} _light={{ bg: "gray.100" }}>
            <ChakraContainer
              maxW="container.xl"
              display="flex"
              flexDirection="column"
              gap={4}
              minHeight="100vh"
            >
              <Header />
              <Container flex={1}>{children}</Container>
              <Footer />
            </ChakraContainer>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
