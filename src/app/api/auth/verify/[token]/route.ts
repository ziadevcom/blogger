import { prisma } from "@/db/prisma.client";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params;

    const user = await prisma.user.findFirst({
      where: {
        VerificationToken: {
          some: {
            AND: [
              { activatedAt: null },
              { createdAt: { gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } }, // 24 hours ago
              { token },
            ],
          },
        },
      },
    });

    console.log(user);

    if (!user) throw Error("Invalid Token.");

    await prisma.user.update({
      where: { id: user.id },
      data: { active: true, emailVerified: new Date() },
    });

    await prisma.verificationToken.update({
      where: { token },
      data: { activatedAt: new Date() },
    });

    return NextResponse.json({ message: "User verified." });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
