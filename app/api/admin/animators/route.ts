import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { parseAnimatorFilters } from "@/lib/animator-filters";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const animators = await prisma.animator.findMany({
    orderBy: { id: "desc" },
  });
  return NextResponse.json(animators);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    let filters;
    try {
      filters = parseAnimatorFilters(data);
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
    const animator = await prisma.animator.create({
      data: {
        ...filters,
        name: data.name,
        description: data.description || null,
        imageUrl: data.imageUrl || null,
        pricePerHour: parseInt(data.pricePerHour) || 0,
        popular: data.popular ?? false,
        active: data.active ?? true,
      },
    });
    return NextResponse.json(animator);
  } catch (error) {
    console.error("Error creating animator:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    let filters;
    try {
      filters = parseAnimatorFilters(data);
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
    const animator = await prisma.animator.update({
      where: { id: data.id },
      data: {
        ...filters,
        name: data.name,
        description: data.description === undefined ? undefined : data.description || null,
        imageUrl: data.imageUrl === undefined ? undefined : data.imageUrl || null,
        pricePerHour: data.pricePerHour === undefined ? undefined : parseInt(data.pricePerHour) || 0,
        popular: data.popular,
        active: data.active,
      },
    });
    return NextResponse.json(animator);
  } catch (error) {
    console.error("Error updating animator:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "0");
    
    await prisma.animator.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting animator:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
