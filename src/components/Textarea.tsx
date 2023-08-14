"use client";

import {
  Textarea as ChakraTextarea,
  TextareaProps,
  useColorModeValue,
} from "@/utils/@chakraui/wrapper";

export function Textarea(props: TextareaProps, ref: any) {
  return (
    <ChakraTextarea
      focusBorderColor={useColorModeValue("brand.400", "brand.200")}
      {...props}
    />
  );
}
