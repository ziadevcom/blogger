"use client";

import NextLink from "next/link";
import { Link as ChakraLink } from "@/utils/@chakraui/wrapper";
import { Button } from "@/components/Button";
import { useState } from "react";
import { Edit, X, Eye } from "lucide-react";
import { Post } from "@/types/post-types";

export function PreviewButton({ post }: { post: Post }) {
  return (
    <div className="flex items-center gap-2 text-blue-600">
      <Eye width={18} />
      <ChakraLink
        as={NextLink}
        href={`/${post.blogSlug}/${post.slug}`}
        colorScheme="blue"
        fontSize="sm"
      >
        Preview
      </ChakraLink>
    </div>
  );
}

export function DeleteButton({
  id,
  onDelete,
}: {
  id: string;
  onDelete: Function;
}) {
  const [deleting, setDeleting] = useState(false);

  function handleClick() {
    setDeleting(true);
    onDelete(id).then(() => setDeleting(false));
  }

  return (
    <Button
      colorScheme="red"
      onClick={handleClick}
      isLoading={deleting}
      leftIcon={<X width={18} />}
      variant="link"
      fontSize="sm"
    >
      Delete
    </Button>
  );
}

export function EditButton({ postId }: { postId: string }) {
  return (
    <a href={`/posts/edit/${postId}`} className="flex items-center">
      <Button
        colorScheme="brand"
        leftIcon={<Edit width={18} />}
        variant="link"
        fontSize="sm"
        tabIndex={-1}
      >
        Edit Post
      </Button>
    </a>
  );
}
