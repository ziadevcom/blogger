"use client";

import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";

export default function NewPost() {
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function createBlogPost() {
      try {
        const { data: post }: { data: Post } = await axios.post("/api/post", {
          title: "Post title",
          content: JSON.stringify({
            ops: [{ insert: "Your post content goes here..." }],
          }), // Delta object
          slug: crypto.randomUUID(),
          status: "draft",
        });

        return router.push(`/posts/edit/${post.id}`);
      } catch (error) {
        setError(true);
      }
    }
    createBlogPost();
  }, [router]);

  return error ? (
    <p className="text-center">
      Something went wrong. Please refresh page and try again. If the issues
      persists, please contact us at{" "}
      <a href="mailto:me@ziadev.com" className="text-brand-500">
        me@ziadev.com
      </a>
    </p>
  ) : (
    <Spinner text="Creating a post..." />
  );
}
