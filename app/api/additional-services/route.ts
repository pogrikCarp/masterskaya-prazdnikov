import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const popularOnly = searchParams.get("popular") === "true";

    const services = await prisma.additionalService.findMany({
      where: {
        active: true,
        ...(popularOnly && { popular: true }),
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching additional services:", error);
    return NextResponse.json(
      { error: "Failed to fetch additional services" },
      { status: 500 }
    );
  }
}
