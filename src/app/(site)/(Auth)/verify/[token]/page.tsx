"use client";
import { Link, Spinner } from "@chakra-ui/react";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function Verify() {
  const { token } = useParams();
  const [status, setStatus] = useState(null);
  let content;
  console.log(status);

  if (status === null) {
    verifyToken(token as string).then((data) => setStatus(data));
    content = <Spinner size="xl" color="brand.400" />;
  }

  if (status === false)
    content = (
      <>
        <h1 className="pb-3 text-center text-2xl">Hmmm...🤔</h1>
        <p>The verification link is invalid or expired. </p>
      </>
    );

  if (status)
    content = (
      <>
        <h1 className="pb-3 text-center text-2xl">Wohoo! 🥳</h1>
        <p>
          Your account is verified. You can login{" "}
          <Link as={NextLink} href="/login" color="brand.400">
            here.
          </Link>
        </p>
      </>
    );

  return <div className="p-4 md:p-8">{content}</div>;
}

async function verifyToken(token: string) {
  const response = await fetch(`/api/auth/verify/${token}`);
  if (!response.ok) return false;
  return await response.json();
}
