import "server-only";

import { VerificationToken } from "@prisma/client";
import { transporter } from "./NodeMailer";
import { User } from "next-auth";

export async function sendMail(user: User, token: VerificationToken) {
  const { name, email } = user;

  // Use "vercel_url" for vercel deployments, if not found then use "host" as fallback for local dev
  const host = process.env.host?.trim();
  const vercelURL = process.env.VERCEL_URL?.trim();

  const verificationLink = `${
    vercelURL ? `https://${vercelURL}` : host
  }/verify/${token.token}`;

  return await transporter.sendMail({
    from: "Blogger <me@ziadev.com>", // sender address
    to: email as string,
    subject: "Verify your Blogger account",
    html: `
    </br>
    Hey ${name || email}!
    </br></br>
    Click the following link to activate your blogger account:
    </br></br>
    <a href="${verificationLink}">${verificationLink}</a>
    `,
  });
}
