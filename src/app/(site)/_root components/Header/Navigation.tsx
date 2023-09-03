import { ButtonGroup } from "@/utils/@chakraui/wrapper";
import { UserPlus, LogInIcon, BookIcon, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function Navigation({
  slug,
}: {
  slug: string | null | undefined;
}) {
  const session = await getServerSession(authOptions);

  return (
    <nav>
      {session?.user ? (
        <ButtonGroup>
          {slug && (
            <Link href={`/${slug}`}>
              <Button
                fontSize="sm"
                leftIcon={<BookIcon size={14} />}
                tabIndex={-1}
              >
                My Blog
              </Button>
            </Link>
          )}
          <Link href="/posts">
            <Button
              fontSize="sm"
              leftIcon={<Settings size={14} />}
              tabIndex={-1}
            >
              Admin
            </Button>
          </Link>
        </ButtonGroup>
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
