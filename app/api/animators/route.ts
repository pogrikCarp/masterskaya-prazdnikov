import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { parseAnimatorFilters } from "@/lib/animator-filters";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const popularOnly = searchParams.get("popular") === "true";
    const age = searchParams.get("age");
    let filters;
    try {
      filters = parseAnimatorFilters({
        audience: searchParams.get("audience") ?? undefined,
        ageGroups: age ? [age] : undefined,
      });
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }

    const animators = await prisma.animator.findMany({
      where: {
        active: true,
        ...(popularOnly && { popular: true }),
        ...(filters.audience && {
          audience: { in: filters.audience === "UNIVERSAL" ? ["UNIVERSAL"] : [filters.audience, "UNIVERSAL"] },
        }),
        ...(filters.ageGroups && { ageGroups: { hasSome: filters.ageGroups } }),
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
