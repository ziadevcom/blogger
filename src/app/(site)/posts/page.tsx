// import { getFullURL } from "@/utils/getFullURL";
import { PostsList } from "./_components/PostsList";
import { hasBlog } from "./_util/hasBlog";
// import { Post } from "@/types/post-types";
// import { headers } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";

export default async function Posts() {
  const blog = await hasBlog();

  if (!blog) redirect("/settings/blog");

  // const res = await fetch(getFullURL("api/posts"), {
  //   headers: headers(),
  // });

  // const data: { error: string | null; posts: Post[] } = await res.json();

  // console.log(data);

  // return <PostsList initialPosts={data.posts} />;
  return <PostsList />;
}
