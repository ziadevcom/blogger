"use client";
import { UserPlus, LogInIcon } from "lucide-react";
import { ButtonGroup } from "@chakra-ui/react";
import Link from "next/link";
import { Button } from "@/components/Button";

export function Navigation() {
  return (
    <nav>
      <ButtonGroup>
        <Button fontWeight="normal" leftIcon={<UserPlus size={18} />}>
          <Link href="/register">Register</Link>
        </Button>
        <Button leftIcon={<LogInIcon size={18} />}>
          <Link href="/login">Login</Link>
        </Button>
      </ButtonGroup>
    </nav>
  );
}
