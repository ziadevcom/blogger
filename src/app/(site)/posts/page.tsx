import { PostsList } from "./_components/PostsList";
import { hasBlog } from "./_util/hasBlog";
import { redirect } from "next/navigation";

export default async function Posts() {
  const blog = await hasBlog();

  if (!blog) redirect("/settings/blog");

  return <PostsList />;
}
