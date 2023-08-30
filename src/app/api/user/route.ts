import { prisma } from "@/db/prisma.client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { v2 as cloudinary } from "cloudinary";
import { cloudinaryConfig } from "@/utils/constants";

export async function DELETE(request: NextRequest) {
  try {
    const formBody = await request.json();

    const { userId } = formBody;

    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.id !== userId)
      return NextResponse.json(
        { message: "User not logged in" },
        { status: 400 }
      );

    // Delete all media uploaded by user
    const userUploadedMedia = await prisma.media.findMany({
      where: { userId: session.user.id },
    });

    if (userUploadedMedia.length > 0) {
      cloudinary.config(cloudinaryConfig);

      await cloudinary.api.delete_resources_by_prefix(session.user.id); // Delete all images in the folder

      await cloudinary.api.delete_folder(session.user.id); // Delete the empty folder
    }

    await prisma.user.delete({ where: { id: userId } }); // Delete User & all posts

    return NextResponse.json({ message: "User deleted." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
