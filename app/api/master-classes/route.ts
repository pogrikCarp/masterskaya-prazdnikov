import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const popularOnly = searchParams.get("popular") === "true";

    const masterClasses = await prisma.masterClass.findMany({
      where: {
        active: true,
        ...(popularOnly && { popular: true }),
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(masterClasses);
  } catch (error) {
    console.error("Error fetching master classes:", error);
    return NextResponse.json(
      { error: "Failed to fetch master classes" },
      { status: 500 }
    );
  }
}
