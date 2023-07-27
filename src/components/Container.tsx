"use client";

import {
  ContainerProps,
  Container as ChakraContainer,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

export function Container(props: ContainerProps) {
  return (
    <ChakraContainer
      maxW="container.xl"
      bg={useColorModeValue("white", "gray.800")}
      rounded="2"
      paddingX="0"
      {...props}
    >
      {props.children}
    </ChakraContainer>
  );
}
