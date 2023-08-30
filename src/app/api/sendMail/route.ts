import { prisma } from "@/db/prisma.client";
import { sendMail } from "@/utils/sendMail";
import { randomUUID } from "crypto";
import { User, getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Invalid request." }, { status: 403 });
    }

    const emailToken = await prisma.verificationToken.create({
      data: {
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
        userId: session.user.id,
      },
    });

    // Send mail to user
    await sendMail(session.user, emailToken);

    return NextResponse.json({ error: null });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
