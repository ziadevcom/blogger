"use client";

import { ButtonProps, Button as ChakraButton } from "@chakra-ui/react";

export function Button(props: ButtonProps) {
  return (
    <ChakraButton borderRadius={3} fontWeight="normal" {...props}>
      {props.children}
    </ChakraButton>
  );
}
