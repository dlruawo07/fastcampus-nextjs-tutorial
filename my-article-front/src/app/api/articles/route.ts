import { Database, db } from "@/service/firebase";
import { Article } from "@/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const database = new Database(db);
    const articles: Article[] = await database.getAllData("articles");
    return NextResponse.json({ articles });
  } catch (e) {
    return new NextResponse(null, { status: 500 });
  }
}
