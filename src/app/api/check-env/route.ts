import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    env: process.env.NODE_ENV,

    // Check các biến quan trọng của bạn
    hasMongo: !!process.env.MONGODB_URI,
    hasNextAuth: !!process.env.NEXTAUTH_SECRET,
    cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME || "MISSING",
    uploadPreset: process.env.NEXT_PUBLIC_UPLOAD_PRESET || "MISSING",

    // (tùy bạn có thể thêm các biến khác ở đây)
  });
}
