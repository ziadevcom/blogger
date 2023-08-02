"use client";

import { Input } from "@/components/Input";
import { Post } from "@/types/post-types";
import { Button as ChakraButton } from "@chakra-ui/react";
import { SyntheticEvent } from "react";

export function SearchPosts({
  onSearch,
}: {
  onSearch: React.EventHandler<SyntheticEvent>;
}) {
  return (
    <div className="w-full md:w-auto">
      <label htmlFor="searchPosts" className="sr-only">
        Search posts
      </label>
      <Input
        onInput={onSearch}
        type="text"
        placeholder="Search..."
        className="w-full p-4 border-solid border-"
      />
    </div>
  );
}
