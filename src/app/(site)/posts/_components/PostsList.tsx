"use client";

import { EditButton, DeleteButton, PreviewButton } from "./Buttons";
import { useEffect, useState } from "react";
import { SearchPosts } from "./SearchPosts";
import { Post } from "@/types/post-types";
import { Box, useToast } from "@/utils/@chakraui/wrapper";
import axios from "axios";
import { Clock } from "lucide-react";
import { Button } from "@/components/Button";
import { formatePrismaDate } from "@/utils/formatedPrismaDate";
import { Spinner } from "@/components/Spinner";

export function PostsList() {
  const toast = useToast();
  const [allPosts, setAllPosts] = useState<Post[]>();
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (allPosts) {
      setPosts([...allPosts]);
    }
  }, [allPosts]);

  if (!allPosts || !posts) return <Spinner />;

  async function fetchPosts() {
    try {
      const { data } = await axios.get("/api/posts");
      setAllPosts(data.posts);
      setPosts(data.posts);
    } catch (error) {
      toast({
        position: "bottom-right",
        status: "error",
        title: "Something went wrong.",
      });
    }
  }

  async function handleDeletePost(postId: string) {
    if (!allPosts) return;

    try {
      await axios.delete(`/api/post`, { data: { id: postId } });

      setAllPosts(allPosts.filter((post) => post.id !== postId));

      toast({
        title: "Successfully deleted the post.",
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Could not delete the post.",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
    }
  }

  function handleSearch(event: React.SyntheticEvent) {
    if (!allPosts) return;
    const target = event.target as HTMLTextAreaElement;

    setPosts(
      allPosts.filter((post) =>
        post.title.toLowerCase().includes(target.value.toLowerCase())
      )
    );
  }

  return (
    <>
      <div className="mb-4 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex w-full flex-col items-center justify-between gap-4 xs:flex-row md:w-auto">
          <h2 className="text-2xl font-bold">Manage Your Posts</h2>
          <a href="/posts/new" className="w-full xs:w-auto">
            <Button className="w-full" tabIndex={-1}>
              Add New
            </Button>
          </a>
        </div>
        <SearchPosts onSearch={handleSearch} />
      </div>
      {posts?.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {posts.map((post) => {
            return (
              <Box
                key={post.id}
                padding={4}
                borderColor="border"
                borderRadius={4}
                borderWidth={1}
              >
                <h3 className="text-lg md:text-xl">{post.title}</h3>
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <Clock width={16} />
                  <p>
                    Updated at{" "}
                    {formatePrismaDate(post.updatedAt || post.createdAt)}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <DeleteButton onDelete={handleDeletePost} id={post.id} />

                  <EditButton postId={post.id} />

                  <PreviewButton post={post} />
                </div>
              </Box>
            );
          })}
        </div>
      ) : (
        <p>No posts found.</p>
      )}
    </>
  );
}
