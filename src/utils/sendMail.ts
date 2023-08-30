import "server-only";

import { VerificationToken } from "@prisma/client";
import { transporter } from "./NodeMailer";
import { User } from "next-auth";

export async function sendMail(user: User, token: VerificationToken) {
  const { name, email } = user;

  const verificationLink = `${process.env.HOST}/verify/${token.token}`;

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
