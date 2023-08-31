import { prisma } from "@/db/prisma.client";
import { notFound } from "next/navigation";
import NextImage from "next/image";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { Box } from "@/utils/@chakraui/wrapper";
import Link from "next/link";

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

function PostItem({
  post,
}: {
  post: {
    id: string;
    title: string;
    content: string;
    slug: string;
    blogSlug: string;
    featured_image: string | null;
  };
}) {
  const converter = new QuillDeltaToHtmlConverter(JSON.parse(post.content).ops);
  console.log(post.content);
  const html = converter.convert();
  const match = html.match(/<p>(.*?)<\/p>/); // get content within first <p> tag
  const excerpt = match ? match[1].replace(/<.*?>/g, "") : ""; // only get the string content and exlude any child html tags

  return (
    <Link
      key={post.id}
      href={"/" + post.blogSlug + "/" + post.slug}
      className="flex flex-col overflow-hidden rounded transition-transform hover:scale-105"
    >
      {post.featured_image && (
        <NextImage
          src={post.featured_image}
          width={400}
          height={300}
          alt={post.title}
          className="h-[200px] w-full object-contain"
        />
      )}
      <Box
        className="flex flex-grow flex-col gap-4 bg-slate-100 p-4"
        _dark={{ background: "gray.900" }}
      >
        <h2 className="text-lg font-semibold md:text-xl">{post.title}</h2>
        <p
          className="text-sm"
          dangerouslySetInnerHTML={{
            __html:
              excerpt.length > 120 ? excerpt.slice(0, 120) + "..." : excerpt,
          }}
        ></p>
      </Box>
    </Link>
  );
}
