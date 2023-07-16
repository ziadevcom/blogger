"use client";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  Stack,
  InputElementProps,
  StyleFunctionProps,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/components/PasswordInput";
import { SocialSignIns } from "@/components/SocialSignIns";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Must be a valid email."),
    password: yup
      .string()
      .required("Password is required.")
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
  })
  .required();
type FormData = yup.InferType<typeof schema>;

function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  function onSubmit(values: FormData) {
    console.log(values);
  }

  const inputStyleProps = {
    focusBorderColor: "brand.400",
    fontSize: ["14px", "16px"],
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-center text-lg md:text-2xl">Register</h2>
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