import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/db/prisma.client";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { Editor } from "./_components/Editor";
export default async function EditPost({ params }: { params: { id: string } }) {
  // Grab post slug
  const id = params.id;
  if (!id) return null;

  // Check if a post with that slug for this user's blog exists in the database.
  const session = await getServerSession(authOptions);

  if (!session?.user) return;

  const post = await prisma.post.findFirst({
    select: {
      id: true,
      title: true,
      content: true,
      featured_image: true,
      slug: true,
      status: true,
      blogSlug: true,
    },
    where: { id, userId: session.user.id },
  });

  // if it does not, return 404
  if (!post) return notFound();

  // if it does, return the page with editor
  return <Editor blogPostData={post} />;
}
