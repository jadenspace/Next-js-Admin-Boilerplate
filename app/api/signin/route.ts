import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const db = [{ id: "admin", password: "1234", authority: "master" }];

export async function POST(request: NextRequest) {
  try {
    const req: { id: string; password: string } = await request.json();
    const data = db.filter((field) => {
      return req.id === field.id && req.password === field.password;
    });
    if (data.length) {
      const result = data.map((field) => ({ id: field.id, authority: field.authority }));
      return NextResponse.json({ ...result[0], result: true });
    }
    return NextResponse.json({ result: false, message: "계정을 찾을 수 없습니다." });
  } catch (error) {
    return NextResponse.json({ result: false, message: "error" });
  }
}
