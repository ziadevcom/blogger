import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { getAppRootDir } from "@/utils/getAppRootDir";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const formData = await request.formData();

    const image: File | null = formData.get("image") as unknown as File;

    if (!image)
      return NextResponse.json(
        { error: "No image provided." },
        { status: 400 }
      );

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const imagePath = path.join(getAppRootDir(), "/temp", image.name);

    console.log(imagePath);

    fs.writeFileSync(imagePath, buffer);

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
      secure: true,
    });

    const { secure_url } = await cloudinary.uploader.upload(imagePath);

    fs.unlinkSync(imagePath);

    return NextResponse.json({
      url: secure_url,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
