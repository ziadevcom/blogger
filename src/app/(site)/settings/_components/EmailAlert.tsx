"use client";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export function EmailAlert() {
  return (
    <Alert status="warning">
      <AlertIcon />
      <AlertTitle>Verify your email!</AlertTitle>
      <AlertDescription>
        Please verify your email to create a blog or post comments.
      </AlertDescription>
    </Alert>
  );
}
