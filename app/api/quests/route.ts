import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const popularOnly = searchParams.get("popular") === "true";

    const quests = await prisma.quest.findMany({
      where: {
        active: true,
        ...(popularOnly && { popular: true }),
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(quests);
  } catch (error) {
    console.error("Error fetching quests:", error);
    return NextResponse.json(
      { error: "Failed to fetch quests" },
      { status: 500 }
    );
  }
}
