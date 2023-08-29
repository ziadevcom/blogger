import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { getAppRootDir } from "@/utils/getAppRootDir";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/db/prisma.client";
import { cloudinaryConfig } from "@/utils/constants";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user)
      return NextResponse.json({ message: "Not logged in." }, { status: 401 });

    const formData = await request.formData();

    const image: File | null = formData.get("image") as unknown as File;
    const postId = formData.get("postId");

    console.log("Image sent for uploading to cloudinary ", { postId });

    if (!image)
      return NextResponse.json(
        { error: "No image provided." },
        { status: 400 }
      );

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const imagePath = path.join(getAppRootDir(), "/tmp", image.name);

    fs.writeFileSync(imagePath, buffer);

    cloudinary.config(cloudinaryConfig);

    const uploadResponse = await cloudinary.uploader.upload(imagePath, {
      folder: session.user.id,
    });

    const {
      asset_id,
      public_id,
      version,
      version_id,
      signature,
      width,
      height,
      format,
      resource_type,
      created_at,
      bytes: imageBytes,
      type,
      etag,
      placeholder,
      url,
      secure_url,
      folder,
      access_mode,
      original_filename,
    } = uploadResponse;

    fs.unlinkSync(imagePath);

    if (typeof postId === "string") {
      await prisma.media.create({
        data: {
          asset_id,
          public_id,
          version,
          version_id,
          signature,
          width,
          height,
          format,
          resource_type,
          created_at,
          bytes: imageBytes,
          type,
          etag,
          placeholder,
          url,
          secure_url,
          folder,
          access_mode,
          original_filename,
          postId,
          userId: session.user.id,
        },
      });
    }

    return NextResponse.json({
      url: secure_url,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
