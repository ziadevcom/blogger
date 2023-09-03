import { prisma } from "@/db/prisma.client";
import { notFound } from "next/navigation";
import { Box } from "@/utils/@chakraui/wrapper";
import { PostItem } from "@/components/PostItem";

export default async function Blog({
  params,
}: {
  params: { blogSlug: string };
}) {
  const { blogSlug } = params;

  if (!blogSlug) return notFound();

  const blog = await prisma.blog.findFirst({ where: { slug: blogSlug } });

  if (!blog) return notFound();

  const posts = await prisma.post.findMany({
    where: { blogId: blog.id, status: "public" },
    select: {
      id: true,
      title: true,
      content: true,
      featured_image: true,
      slug: true,
      blogSlug: true,
      updatedAt: true,
    },
  });

  return (
    <div>
      <Box
        className="flex min-h-[200px] flex-col items-center justify-center gap-4 p-4 md:min-h-[300px]"
        bg="brand.400"
        color="white"
      >
        <h1 className="text-2xl font-bold capitalize md:text-3xl">
          {blog.title}
        </h1>
        <p className="text-center">{blog.description}</p>
      </Box>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-10 p-4 py-8 sm:grid-cols-2 md:p-8 md:py-12 lg:grid-cols-3 ">
          {posts.map((post) => {
            return <PostItem key={post.id} post={post} />;
          })}
        </div>
      ) : (
        <p className="py-8 text-center text-2xl">No posts found.</p>
      )}
    </div>
  );
}
