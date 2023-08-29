import { NextRequest, NextResponse } from "next/server";
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from "cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/db/prisma.client";
import { cloudinaryConfig } from "@/utils/constants";
import streamifier from "streamifier";

cloudinary.config(cloudinaryConfig);

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user)
      return NextResponse.json({ message: "Not logged in." }, { status: 401 });

    const formData = await request.formData();

    const image: File | null = formData.get("image") as unknown as File;
    const postId = formData.get("postId");

    if (!image)
      return NextResponse.json(
        { error: "No image provided." },
        { status: 400 }
      );

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResponse = await uploadImage(buffer, session.user.id);

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
    console.log({ error });

    return NextResponse.json(
      { message: error.message || error },
      { status: 500 }
    );
  }
}

async function uploadImage(
  buffer: Buffer,
  userId: string
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: userId,
      },
      (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined
      ) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}
