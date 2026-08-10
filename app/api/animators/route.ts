import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const popularOnly = searchParams.get("popular") === "true";

    const animators = await prisma.animator.findMany({
      where: {
        active: true,
        ...(popularOnly && { popular: true }),
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(animators);
  } catch (error) {
    console.error("Error fetching animators:", error);
    return NextResponse.json(
      { error: "Failed to fetch animators" },
      { status: 500 }
    );
  }
}
