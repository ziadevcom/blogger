"use client";

import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";

export default function NewPost() {
  // Create a demo post and redirect to "/edit/post-slug" page
  const [blogPost, setBlogPost] = useState<Post>();
  const router = useRouter();

  useEffect(() => {
    if (!blogPost) {
      createBlogPost();
    } else {
      router.push(`/posts/edit/${blogPost.slug}`);
    }
  }, [blogPost, router]);

  async function createBlogPost() {
    try {
      const { data }: { data: Post } = await axios.post("/api/post", {
        title: "Post title",
        content: "Your post content goes here...",
        slug: crypto.randomUUID(),
        status: "draft",
      });

      setBlogPost(data);
    } catch (error) {
      console.log(error);
      return (
        <p>
          Something went wrong. Please refresh page and try again. If the issues
          persists, please contact us at{" "}
          <a href="mailto:me@ziadev.com">me@ziadev.com</a>
        </p>
      );
    }
  }

  return <Spinner text="Creating a post..." />;
}
