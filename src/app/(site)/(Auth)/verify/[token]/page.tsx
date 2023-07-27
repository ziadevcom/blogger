"use client";
import { Link, Spinner } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Status = "loading" | "verified" | "invalid";

export default function Verify() {
  const { token } = useParams();

  const [status, setStatus] = useState<Status>("loading");

  let content;
  const { data: session, status: sessionStatus, update } = useSession();

  useEffect(() => {
    verifyToken(token as string)
      .then(() => setStatus("verified"))
      .catch(() => setStatus("invalid"));
  }, []);

  useEffect(() => {
    if (
      status === "verified" &&
      sessionStatus === "authenticated" &&
      session.user?.active === false
    ) {
      update();
    }
  }, [status, sessionStatus]);

  if (status === "loading") content = <Spinner size="xl" color="brand.400" />;

  if (status === "invalid")
    content = (
      <>
        <h1 className="pb-3 text-center text-2xl">Hmmm...🤔</h1>
        <p>The verification link is invalid or expired. </p>
      </>
    );

  if (status === "verified")
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

  if (!response.ok) throw Error("Invalid token.");

  return await response.json();
}
