import { prisma } from "@/db/prisma.client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import * as yup from "yup";
import { notAllowedBlogSlugs } from "@/utils/constants";

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  console.log(session);

  if (!session?.user) return null;

  try {
    const user = await prisma.user.findFirst({
      where: { email: session?.user.email },
    });

    const blog = await prisma.blog.findFirst({ where: { userId: user?.id } });

    return NextResponse.json({ blog });
  } catch (error: any) {
    console.log(error.message);
    console.log("wtf");
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) return Error();

    const { name, email } = session.user;

    const user = await prisma.user.findFirst({
      where: { email: session?.user.email },
    });

    if (!user) throw Error("Something went wrong.");

    const existingBlog = await prisma.blog.findFirst({
      where: { userId: user.id },
    });

    if (existingBlog) throw new Error("Blog already exists");

    const blogSchema = yup.object({
      title: yup.string().required(),
      description: yup.string().required(),
      url: yup
        .string()
        .matches(
          /^[a-zA-Z0-9-]+$/,
          "Blog URL can only contain alphabets, numbers, and dashes."
        )
        .notOneOf(notAllowedBlogSlugs),
      author: yup.string().required(),
    });

    const formBody = await req.json();

    await blogSchema.validate(formBody);

    const newBlog = await prisma.blog.create({
      data: {
        ...formBody,
        userId: user.id,
      },
    });

    return NextResponse.json({ blog: newBlog });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return Error();

    const formBody = await req.json();

    if (Object.keys(formBody).length === 0) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const { email } = session.user;

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) throw Error("No user found.");

    const blog = await prisma.blog.findFirst({
      where: { userId: user.id },
    });

    if (!blog) throw Error("No blog found.");

    if (formBody.slug) {
      const isValidURL =
        /^[a-zA-Z0-9-]+$/.test(formBody.slug) &&
        !notAllowedBlogSlugs.includes(formBody.slug);

      if (!isValidURL)
        throw Error(
          "Blog url can only contain hyphens, alphabets & numbers. It also can't be one of the reserved words."
        );

      const urlTaken = await prisma.blog.findFirst({
        where: { slug: formBody.slug },
      });

      if (urlTaken) throw Error("URL already taken.");
    }

    const updatedBlog = await prisma.blog.update({
      where: { id: blog.id },
      data: { ...formBody },
    });

    return NextResponse.json({ error: null, blog: updatedBlog });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
