import { ButtonProps, Button as ChakraButton } from "@chakra-ui/react";
import React from "react";

export function Button(props: ButtonProps) {
  return (
    <ChakraButton fontWeight="normal" {...props}>
      {props.children}
    </ChakraButton>
  );
}
