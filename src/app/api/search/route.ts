import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma.client";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("q") ?? "";

    if (query.length === 0) NextResponse.json({}, { status: 400 });

    const posts = await prisma.post.findMany({
      where: {
        OR: [{ content: { search: query } }, { title: { search: query } }],
      },
    });

    return NextResponse.json({ posts, count: posts.length });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something wen't wrong." },
      { status: 500 }
    );
  }
}
