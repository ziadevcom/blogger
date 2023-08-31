"use client";

import {
  Input as ChakraInput,
  InputProps,
  useColorModeValue,
} from "@/utils/@chakraui/wrapper";
import { forwardRef } from "react";

export const Input = forwardRef(function Input(props: InputProps, ref: any) {
  return (
    <ChakraInput
      focusBorderColor={useColorModeValue("brand.400", "brand.200")}
      {...props}
      ref={ref}
    />
  );
});
