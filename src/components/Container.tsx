"use client";

import {
  ContainerProps,
  Container as ChakraContainer,
  useColorModeValue,
} from "@/utils/@chakraui/wrapper";
import React from "react";

export function Container(props: ContainerProps) {
  return (
    <ChakraContainer
      maxW="container.xl"
      bg={useColorModeValue("white", "gray.800")}
      rounded="2"
      paddingX="0"
      height="100%"
      {...props}
    >
      {props.children}
    </ChakraContainer>
  );
}
