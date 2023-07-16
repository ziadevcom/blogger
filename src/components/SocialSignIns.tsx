"use client";
import {
  Box,
  Divider,
  Text,
  AbsoluteCenter,
  ButtonGroup,
  Button,
  Stack,
} from "@chakra-ui/react";
import { Flame, Github } from "lucide-react";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

export function SocialSignIns() {
  const [githubLoading, setGithubLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  return (
    <>
      <Box position="relative" padding="10">
        <Divider />
        <AbsoluteCenter
          bg="white"
          px="4"
          marginBottom={10}
          width={["100%", "auto"]}
        >
          <Text color="brand.400" textAlign="center">
            Or continue with
          </Text>
        </AbsoluteCenter>
      </Box>
      <Stack direction={["column", "row"]}>
        <Button
          background="black"
          color="white"
          leftIcon={<Github />}
          width="100%"
          isLoading={githubLoading}
          onClick={() => {
            setGithubLoading(true);
            signIn("github");
          }}
        >
          Github
        </Button>
        <Button
          colorScheme="red"
          leftIcon={<Flame />}
          width="100%"
          isLoading={googleLoading}
          onClick={() => {
            setGoogleLoading(true);
            signIn("google");
          }}
        >
          Google
        </Button>
      </Stack>
    </>
  );
}
