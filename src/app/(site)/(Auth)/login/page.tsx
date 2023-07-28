"use client";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Input } from "@/components/Input";
import React from "react";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/components/PasswordInput";
import { SocialSignIns } from "@/components/SocialSignIns";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { sleep } from "@/utils/sleep";

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email."),
  password: yup.string().required("Password is required."),
});
type FormData = yup.InferType<typeof schema>;

function Login() {
  const toast = useToast();
  const router = useRouter();
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
    try {
      const user = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      console.log(user);

      if (user?.error)
        throw new Error("Invalid login credentials. Please try again.");

      toast({
        title: "Success.",
        description: "You logged in successfully.",
        status: "success",
        isClosable: true,
      });
      await sleep(2000);
      return router.push("/");
    } catch (error: any) {
      toast({
        title: "Error.",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }
  }

  const inputStyleProps = {
    focusBorderColor: "brand.400",
    fontSize: ["14px", "16px"],
  };

  return (
    <div className="w-full p-4 md:p-8">
      <h2 className="text-center text-lg md:text-2xl">Login</h2>
      <div className="py-2 md:py-4"></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={[4, 8]}>
          <FormControl isInvalid={errors.email as unknown as boolean}>
            <FormLabel htmlFor="email" className="sr-only">
              Email
            </FormLabel>
            <Input
              variant="filled"
              size="lg"
              id="email"
              placeholder="Enter your email"
              type="text"
              {...inputStyleProps}
              {...register("email")}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password as unknown as boolean}>
            <FormLabel htmlFor="password" className="sr-only">
              Password
            </FormLabel>
            <PasswordInput
              variant="filled"
              size="lg"
              id="password"
              placeholder="Enter your password"
              {...inputStyleProps}
              {...register("password")}
            ></PasswordInput>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          {errors?.root?.serverError.type === "400" &&
            "Invalid login credentials."}
          <Button isLoading={isSubmitting} type="submit">
            Submit
          </Button>
        </Stack>
      </form>
      <SocialSignIns />
    </div>
  );
}

export default Login;
