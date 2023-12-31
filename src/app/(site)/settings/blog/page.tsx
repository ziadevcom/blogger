"use client";
import { CreateBlogForm } from "./_components/CreateBlogForm";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertIcon } from "@chakra-ui/react";
import { Spinner } from "@/components/Spinner";
import axios from "axios";
import { BlogSettingsForm } from "./_components/BlogSettingsForm";
import { BlogData } from "./types";

export default function BlogSettings() {
  const [hasBlog, setHasBlog] = useState<boolean | null>(null);
  const [blogData, setBlogData] = useState<BlogData | undefined>();

  useEffect(() => {
    doesBlogExists();
  }, []);

  async function doesBlogExists() {
    try {
      const res = await axios.get("/api/blog");

      if (res.data.blog === null) {
        return setHasBlog(false);
      } else {
        setHasBlog(true);
        setBlogData(res.data.blog);
      }
    } catch (error) {
      setHasBlog(null);
    }
  }

  if (hasBlog === null) return <Spinner text="Loading blog..." />;

  if (hasBlog === false) {
    return (
      <>
        <Alert status="warning" marginBottom={4}>
          <AlertIcon />
          <AlertDescription>
            {"You don't have a blog. Fill the form below to create one."}
          </AlertDescription>
        </Alert>
        <CreateBlogForm doesBlogExists={doesBlogExists} />
      </>
    );
  }

  return (
    <BlogSettingsForm blogData={blogData} updateBlogData={doesBlogExists} />
  );
}
