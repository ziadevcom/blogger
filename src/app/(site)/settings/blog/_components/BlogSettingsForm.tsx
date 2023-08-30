// @ts-nocheck

import {
  Button,
  Code,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
  ToastProps,
  useToast,
} from "@chakra-ui/react";
import { Input } from "@/components/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { BlogData } from "../types";

export function BlogSettingsForm({
  blogData,
  updateBlogData,
}: {
  blogData: BlogData;
  updateBlogData: Function;
}) {
  return (
    <div className="w-full gap-4">
      <BasicForm
        inputName="title"
        inputTitle="Blog Title"
        currentValue={blogData?.title}
        updateBlogData={updateBlogData}
      />
      <BasicForm
        inputName="description"
        inputTitle="Blog Description"
        currentValue={blogData?.description}
        updateBlogData={updateBlogData}
      />
      <BasicForm
        inputName="author"
        inputTitle="Blog Author"
        currentValue={blogData?.author}
        updateBlogData={updateBlogData}
      />
      <BlogURLForm
        currentValue={blogData?.slug}
        updateBlogData={updateBlogData}
      />
    </div>
  );
}

function BasicForm({
  inputName,
  inputTitle,
  currentValue,
  updateBlogData,
}: {
  inputName: "title" | "author" | "description";
  inputTitle: string;
  currentValue: string | undefined;
  updateBlogData: Function;
}) {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(
      yup.object({
        [inputName]: yup.string().required("This field is required."),
      })
    ),
    mode: "onSubmit",
  });

  let toastConfig: ToastProps = {
    isClosable: true,
    duration: 5000,
    status: "success",
    position: "bottom-right",
  };

  async function onSubmit(values: FormData) {
    try {
      await axios.put("/api/blog", values);
      toastConfig.title = `${inputTitle} updated.`;
      updateBlogData();
      reset();
    } catch (error) {
      toastConfig = {
        ...toastConfig,
        title: "Something went wrong.",
        description: `Could not update ${inputTitle}.`,
        status: "error",
      };
    } finally {
      toast(toastConfig);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="POST" className="pb-6">
      <FormControl isInvalid={errors[inputName] as unknown as boolean}>
        <div className="flex items-center pb-2 gap-3">
          <FormLabel htmlFor={inputName} margin={0}>
            {inputTitle}
          </FormLabel>
          <Code>{currentValue}</Code>
        </div>
        <div className="flex w-full flex-col items-end gap-4  md:w-3/4 md:flex-row">
          <Input id={inputName} type="text" {...register(inputName)} />
          <Button
            isLoading={isSubmitting}
            type="submit"
            className="font- min-w-[150px] font-normal"
          >
            Update
          </Button>
        </div>
        <FormErrorMessage>
          {errors[inputName] && errors[inputName].message}
        </FormErrorMessage>
      </FormControl>
    </form>
  );
}

function BlogURLForm({
  currentValue,
  updateBlogData,
}: {
  currentValue: string | undefined;
  updateBlogData: Function;
}) {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(
      yup.object({
        slug: yup
          .string()
          .required("This field is required.")
          .matches(
            /^[a-zA-Z0-9-]+$/,
            "Blog URL can only contain alphabets, numbers, and dashes."
          ),
      })
    ),
    mode: "onSubmit",
  });

  const toastConfig: ToastProps = {
    isClosable: true,
    duration: 5000,
    position: "bottom-right",
  };

  async function onSubmit(values: FormData) {
    try {
      await axios.put("/api/blog", values);
      updateBlogData();
      reset();
      toast({
        ...toastConfig,
        title: "Blog URL updated.",
        status: "success",
      });
    } catch (error: any) {
      console.log(error);

      if (error.response.data?.error) {
        return setError("slug", {
          type: "custom",
          message: error.response.data.error,
        });
      }

      toast({
        ...toastConfig,
        status: "error",
        title: "Something went wrong.",
        description:
          "Please refresh page and try again. If issue persists, react out at me@ziadev.com",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="POST" className="pb-6">
      <FormControl isInvalid={errors.slug as unknown as boolean}>
        <div className="flex items-center pb-2 gap-3">
          <FormLabel htmlFor="slug" margin={0}>
            Blog URL
          </FormLabel>
          <Code>{currentValue}</Code>
        </div>
        <div className="flex w-full flex-col items-end gap-4  md:w-3/4 md:flex-row">
          <Input id="url" type="text" {...register("slug")} />
          <Button
            isLoading={isSubmitting}
            type="submit"
            className="font- min-w-[150px] font-normal"
          >
            Update
          </Button>
        </div>
        <FormErrorMessage>
          {errors.slug && errors.slug.message}
        </FormErrorMessage>
      </FormControl>
    </form>
  );
}
