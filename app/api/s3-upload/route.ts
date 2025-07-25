import { NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

export const runtime = "nodejs";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

// --------- Upload (POST) ----------
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
        Key: fileName,
        Body: fileBuffer,
        ContentType: file.type,
      })
    );

    const url = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileName}`;

    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("S3 Upload Error:", error);
    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 }
    );
  }
}

// --------- Delete (DELETE) ----------
export async function DELETE(req: Request) {
  try {
    const { key } = await req.json(); // Expecting: { key: "1753479658189.jpeg" }

    if (!key) {
      return NextResponse.json(
        { success: false, error: "Missing key" },
        { status: 400 }
      );
    }

    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
        Key: key,
      })
    );

    return NextResponse.json({ success: true, message: "File deleted" });
  } catch (error) {
    console.error("S3 Delete Error:", error);
    return NextResponse.json(
      { success: false, error: "Deletion failed" },
      { status: 500 }
    );
  }
}
