"use client";

import { InputProps } from "@chakra-ui/react";
import { Input as ChakraInput } from "@chakra-ui/react";
import { forwardRef } from "react";

export const Input = forwardRef(function Input(props: InputProps, ref: any) {
  return <ChakraInput focusBorderColor="brand.400" {...props} ref={ref} />;
});
