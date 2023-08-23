"use client";

import { ToastProps, useToast } from "@/utils/@chakraui/wrapper";
import { Post } from "@prisma/client";
import { EditorHeader } from "./EditorHeader";
import { EditorSidebar } from "./EditorSidebar";
import { EditorBody } from "./EditorBody";
import {
  FormEventHandler,
  SetStateAction,
  SyntheticEvent,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import axios, { AxiosError } from "axios";
import { postSchema } from "@/yupSchemas/blogPostSchema";
import { DeltaStatic } from "quill";

type UpdatePostType = {
  id: string;
  title: string;
  slug: string;
  content: DeltaStatic;
  status: string;
  featured_image: string | null;
  blogSlug: string;
};

type EditorContextType =
  | {
      postData: UpdatePostType;
      handleSubmit: FormEventHandler;
      setPostData: React.Dispatch<SetStateAction<UpdatePostType>>;
      submitting: boolean;
      modified: boolean;
    }
  | undefined;

export const EditorContext = createContext<EditorContextType>(undefined);

export function Editor({
  blogPostData: { id, title, slug, content, status, featured_image, blogSlug },
}: {
  blogPostData: {
    id: string;
    title: string;
    content: string;
    slug: string;
    featured_image: string | null;
    status: string;
    blogSlug: string;
  };
}) {
  const [postData, setPostData] = useState<UpdatePostType>({
    id,
    title,
    slug,
    content: JSON.parse(content),
    status,
    featured_image,
    blogSlug,
  });
  const [submitting, setSubmitting] = useState(false);
  const [modified, setModified] = useState(false);
  const firstRender = useRef(true);
  const toast = useToast();

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      setModified(true);
    }
  }, [postData]);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const postObject = {
        ...postData,
        content: JSON.stringify(postData.content),
      };
      await postSchema.validate(postObject);

      const response = await axios.put("/api/post", postObject);

      toast({ title: "Post updated." });

      setModified(false);
    } catch (error) {
      const toastError: ToastProps = {
        title: "Something went wrong.",
        status: "error",
      };

      if (error instanceof AxiosError)
        toastError.title = error.response?.data.error;

      toast(toastError);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <EditorContext.Provider
      value={{ postData, handleSubmit, setPostData, submitting, modified }}
    >
      <form onSubmit={handleSubmit} className="w-full" method="POST">
        <div className="flex flex-col gap-8 p-4 md:flex-row">
          <div className="flex w-3/4 flex-col gap-8">
            <EditorHeader />
            <EditorBody />
          </div>
          <div className="w-1/4">
            <EditorSidebar />
          </div>
        </div>
      </form>
    </EditorContext.Provider>
  );
}
