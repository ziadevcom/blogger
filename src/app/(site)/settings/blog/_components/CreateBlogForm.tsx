"use client";
import axios, { AxiosError } from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Stack,
  useToast,
  FormHelperText,
} from "@chakra-ui/react";
import { Input } from "@/components/Input";
import React from "react";
import { useForm } from "react-hook-form";

const requiredError = "This is a requried field.";

const schema = yup.object({
  title: yup.string().required(requiredError),
  description: yup.string().required(requiredError),
  slug: yup
    .string()
    .required(requiredError)
    .matches(
      /^[a-zA-Z0-9-]+$/,
      "Blog URL can only contain alphabets, numbers, and dashes."
    ),
  author: yup.string().required(requiredError),
});

type FormData = yup.InferType<typeof schema>;

export function CreateBlogForm({
  doesBlogExists,
}: {
  doesBlogExists: Function;
}) {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  async function onSubmit(values: FormData) {
    console.log(values);

    try {
      const res = await axios.post("/api/blog", values);
      console.log(res.data);
      toast({
        title: "Blog created.",
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });
      doesBlogExists();
    } catch (error: any) {
      console.log(error);
      console.log(error?.response?.data);
      toast({
        title: "Error.",
        description: error.response.data.error || error.message,
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} method="POST">
        <Stack spacing={[4, 8]}>
          <FormControl isInvalid={errors.title as unknown as boolean}>
            <FormLabel htmlFor="title">Blog Title</FormLabel>
            <Input id="title" type="text" {...register("title")} />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.description as unknown as boolean}>
            <FormLabel htmlFor="description">Blog Description</FormLabel>
            <Input id="description" type="text" {...register("description")} />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.slug as unknown as boolean}>
            <FormLabel htmlFor="slug">Blog URL</FormLabel>
            <Input id="slug" type="text" {...register("slug")} />
            <FormHelperText>
              URL can only contain numbers, dashes or alphabets as{" "}
              <pre className="inline">my-blog</pre>,{" "}
              <pre className="inline">dawn-of-tech </pre>etc.
            </FormHelperText>
            <FormErrorMessage>
              {errors.slug && errors.slug.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.author as unknown as boolean}>
            <FormLabel htmlFor="author">Blog Author </FormLabel>
            <Input id="author" type="text" {...register("author")} />
            <FormErrorMessage>
              {errors.author && errors.author.message}
            </FormErrorMessage>
          </FormControl>
          <Button isLoading={isSubmitting} type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
}

function CreateBlogInput(props: object) {
  return <Input variant="filled" size="xs" {...props} />;
}
