import "server-only";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/db/prisma.client";
import { getServerSession } from "next-auth";

export async function hasBlog() {
  const session = await getServerSession(authOptions);

  if (!session?.user) return null;

  const blogExists = await prisma.blog.findFirst({
    where: { userId: session?.user.id },
  });

  console.log({ blogExists });

  return blogExists;
}
