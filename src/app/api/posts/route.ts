export const dynamic = "force-dynamic"; // Fixes "Dynamic headers usage error"

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/db/prisma.client";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) throw Error("You are not logged in.");

    const posts = await prisma.post.findMany({
      where: { userId: session.user.id },
    });

    return NextResponse.json({ error: null, posts });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
