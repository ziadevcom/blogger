"use client";

import { Button } from "@/components/Button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  function logOut() {
    signOut().then(() => router.push("/"));
  }

  return (
    <Button
      leftIcon={<LogOut />}
      onClick={logOut}
      textAlign="left"
      variant="link"
      color="red.500"
      paddingY={3}
      backgroundColor="red.100"
      _hover={{ backgroundColor: "red.200" }}
    >
      Logout
    </Button>
  );
}
