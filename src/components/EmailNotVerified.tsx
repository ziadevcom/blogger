"use client";

import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  useToast,
} from "@chakra-ui/react";

export default function EmailNotVerified() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  async function sendMail() {
    try {
      setLoading(true);
      const res = await fetch("/api/sendMail");
      if (!res.ok) throw Error("Could not send email.");
      toast({
        position: "bottom-right",
        status: "success",
        title: "Email sent.",
        description:
          "Click the link in the email to verify. Make sure to check your spam folder.",
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        position: "bottom-right",
        status: "error",
        title: "Something went wrong.",
        description: error.message,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Alert status="warning" marginBottom="4">
      <AlertIcon />
      <AlertTitle>Email not verified.</AlertTitle>
      <AlertDescription>
        Please verify your email to edit your profile or make a blog.{" "}
        <Button
          isLoading={loading}
          className="font-medium underline"
          onClick={sendMail}
          variant="link"
          padding="0"
        >
          Send Email
        </Button>
      </AlertDescription>
    </Alert>
  );
}
