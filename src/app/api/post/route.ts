import * as yup from "yup";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma.client";
import { formatYupErrors } from "@/utils/formatYupErrors";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const postSchema = yup.object({
  title: yup.string().trim().required(),
  content: yup.string().trim().required(),
  slug: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Z0-9-]+$/,
      "Post URL can only contain alphabets, numbers, and dashes."
    )
    .required(),
  featured_image: yup
    .string()
    .trim()
    .matches(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
      "Invalid image URL."
    ),
  status: yup.string().trim().oneOf(["public", "draft", "trash"]).required(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You are not logged in." },
        { status: 401 }
      );
    }

    const formBody = await req.json();
    console.log(formBody);

    await postSchema.validate(formBody, {
      abortEarly: false,
    });

    const urlTaken = await prisma.post.findMany({
      where: { slug: formBody.slug },
    });

    console.log({ posts: urlTaken, count: urlTaken.length });

    if (urlTaken.length > 0) {
      formBody.slug = `${formBody.slug}-${crypto.randomUUID()}`;
    }

    const blog = await prisma.blog.findFirst({
      where: { userId: session.user.id },
    });

    console.log({
      data: {
        ...formBody,
        blogId: blog?.id,
        userId: session.user.id,
      },
    });

    const post = await prisma.post.create({
      data: {
        ...formBody,
        blogId: blog?.id,
        userId: session.user.id,
      },
    });

    return NextResponse.json(post);
  } catch (error: any) {
    console.log(error);

    if (error instanceof yup.ValidationError) {
      return NextResponse.json(formatYupErrors(error), { status: 400 });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You are not logged in." },
        { status: 401 }
      );
    }

    const { id }: { id: string } = await req.json();

    if (!id.trim()) throw Error("Invalid Id.");

    const post = await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({ error: null });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
