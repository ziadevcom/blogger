import * as yup from "yup";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma.client";
import { formatYupErrors } from "@/utils/formatYupErrors";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { sendMail } from "@/utils/sendMail";

const userRegistrationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email."),
  password: yup
    .string()
    .required("Password is required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character."
    ),
});

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const requestBody = await request.json();

    // Validate input
    await userRegistrationSchema.validate(requestBody, {
      abortEarly: false,
    });

    // Input is valid so, we check if email is registered already
    const { email, password } = requestBody;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      return NextResponse.json(
        { email: "User already exists with that email." },
        {
          status: 400,
        }
      );
    }

    // Add user to database
    const newUser = await prisma.user.create({
      data: {
        email,
        hashedPassword: await bcrypt.hash(password, 10),
      },
    });

    if (!newUser) throw new Error("Could not create a user");

    const token = await prisma.verificationToken.create({
      data: {
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
        userId: newUser.id,
      },
    });

    // Send mail to user
    sendMail(newUser, token);

    return NextResponse.json({
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json(formatYupErrors(error), { status: 400 });
    }
    return NextResponse.json(error, { status: 500 });
  }
}
