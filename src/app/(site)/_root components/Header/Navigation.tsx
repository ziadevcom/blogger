import { ButtonGroup } from "@/utils/@chakraui/wrapper";
import { UserPlus, LogInIcon, BookIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function Navigation() {
  const session = await getServerSession(authOptions);

  return (
    <nav>
      {session?.user ? (
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
