"use client";
import { ButtonGroup, Skeleton, Spinner } from "@chakra-ui/react";
import { UserPlus, LogInIcon, BookIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { useSession } from "next-auth/react";

export function Navigation() {
  const session = useSession();

  if (session.status === "loading") {
    return <Spinner />;
  }
  return (
    <nav>
      {session.status === "authenticated" ? (
        <Link href="/posts">
          <Button leftIcon={<BookIcon size={18} />}>Posts</Button>
        </Link>
      ) : (
        <ButtonGroup className="">
          <Link href="/register">
            <Button leftIcon={<UserPlus size={18} />}>Register</Button>
          </Link>
          <Link href="/login">
            <Button leftIcon={<LogInIcon size={18} />}>Login</Button>
          </Link>
        </ButtonGroup>
      )}
    </nav>
  );
}
