import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/db/prisma.client";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { Heading, FormControl, FormLabel } from "@/utils/@chakraui/wrapper";
import Image from "next/image";
import "quill/dist/quill.core.css";
import { DeltaInsertOp, QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { Input } from "@/components/Input";

export default async function Post({
  params,
}: {
  params: { blogSlug: string; postSlug: string };
}) {
  const { blogSlug, postSlug } = params;

  if (!blogSlug || !postSlug) return notFound();

  const session = await getServerSession(authOptions);

  console.log(session);

  const post = await prisma.post.findFirst({
    where: { slug: postSlug, Blog: { slug: blogSlug } },
  });

  if (!post) return notFound();

  const { content, title, status, featured_image, userId } = post;

  // User not logged in and post is not public
  if (!session?.user && status !== "public") return notFound();

  // User logged in but post is not public and does not belong to current current user
  if (status != "public" && session?.user?.id != userId) {
    return notFound();
  }

  const converter = new QuillDeltaToHtmlConverter(JSON.parse(content).ops, {
    customTagAttributes: customImageStyles,
  });

  return (
    <div className="flex flex-col gap-4 p-4 font-light md:flex-row md:gap-8 md:p-8">
      <article className="flex w-full flex-col gap-4 md:w-3/4 ">
        {featured_image && (
          <Image
            src={featured_image}
            alt={title}
            width={800}
            height={500}
            className="max-h-[500px] w-full rounded-sm object-contain"
          ></Image>
        )}
        <Heading>{title}</Heading>
        <div
          dangerouslySetInnerHTML={{ __html: converter.convert() }}
          className="ql-editor !p-0 text-base md:text-lg"
        ></div>
      </article>
      <aside className="w-full md:w-1/4">
        <form action="">
          <FormControl>
            <FormLabel fontWeight="semibold" htmlFor="searchPost">
              Search
            </FormLabel>
            <Input id="searchPost" placeholder="Search here..."></Input>
          </FormControl>
        </form>
      </aside>
    </div>
  );
}

function customImageStyles(op: DeltaInsertOp) {
  if (op.attributes.style) {
    return {
      style: op.attributes.style,
    };
  }
}
