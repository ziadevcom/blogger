import { Box } from "@/utils/@chakraui/wrapper";
import Link from "next/link";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import NextImage from "next/image";

export function PostItem({
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
          className="h-[200px] w-full object-cover"
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
