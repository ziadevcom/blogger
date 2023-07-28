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
} from "@chakra-ui/react";
import { Input } from "@/components/Input";
import React from "react";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/components/PasswordInput";
import { SocialSignIns } from "@/components/SocialSignIns";

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email."),
  password: yup
    .string()
    .required("Password is required.")
    .notOneOf([yup.ref("email")], "Password can't be the same as email.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password must contain 8 characters, one uppercase, one lowercase, one number and one special case character."
    ),
  confirmPassword: yup
    .string()
    .required("Password is required.")
    // use oneOf to match one of the values inside the array.
    // use "ref" to get the value of passwrod.
    .oneOf([yup.ref("password")], "Passwords don't match."),
});
type FormData = yup.InferType<typeof schema>;

function Register() {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: yupResolver(schema), mode: "onTouched" });

  async function onSubmit(values: FormData) {
    try {
      const response: any = await axios("/api/auth/register", {
        method: "POST",
        data: values,
      });

      if (response.data.user) {
        console.log("User created.");
        toast({
          title: "Account created.",
          description: "Please verify your email.",
          status: "success",
          duration: 10000,
          isClosable: true,
        });
      }

      console.log(response);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 500) {
        return toast({
          title: "Something went wrong.",
          description:
            "Please refresh page and try again If the issue persists, reach us at me@ziadev.com.",
          status: "error",
        });
      }
      // Set custom errors for react hook form if invalid inputs provided
      const errors: { email?: string; password?: string } =
        error.response?.data;
      Object.entries(errors).forEach(([errorField, errorText]) => {
        setError(
          errorField as any,
          {
            type: "manual",
            message: errorText,
          },
          { shouldFocus: true }
        );
      });
    }
  }

  const inputStyleProps = {
    focusBorderColor: "brand.400",
    fontSize: ["14px", "16px"],
  };

  return (
    <div className="w-full p-4 md:p-8">
      <h2 className="text-center text-lg md:text-2xl">Register</h2>
      <div className="py-2 md:py-4"></div>
      <form onSubmit={handleSubmit(onSubmit)} method="POST">
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
          <FormControl isInvalid={errors.confirmPassword as unknown as boolean}>
            <FormLabel htmlFor="confirmPassword" className="sr-only">
              Password
            </FormLabel>
            <PasswordInput
              variant="filled"
              size="lg"
              id="confirmPassword"
              placeholder="Enter your password again"
              {...inputStyleProps}
              {...register("confirmPassword")}
            ></PasswordInput>
            <FormErrorMessage>
              {errors.confirmPassword && errors.confirmPassword.message}
            </FormErrorMessage>
          </FormControl>
          <Button isLoading={isSubmitting} type="submit">
            Submit
          </Button>
        </Stack>
      </form>
      <SocialSignIns />
    </div>
  );
}

export default Register;
