import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const shows = await prisma.show.findMany({
    orderBy: { id: "desc" },
  });
  return NextResponse.json(shows);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const show = await prisma.show.create({
      data: {
        name: data.name,
        description: data.description || null,
        imageUrl: data.imageUrl || null,
        price: parseInt(data.price) || 0,
        duration: parseInt(data.duration) || 30,
        popular: data.popular ?? false,
        active: data.active ?? true,
      },
    });
    return NextResponse.json(show);
  } catch (error) {
    console.error("Error creating show:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const show = await prisma.show.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description || null,
        imageUrl: data.imageUrl || null,
        price: parseInt(data.price) || 0,
        duration: parseInt(data.duration) || 30,
        popular: data.popular ?? false,
        active: data.active ?? true,
      },
    });
    return NextResponse.json(show);
  } catch (error) {
    console.error("Error updating show:", error);
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
    
    await prisma.show.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting show:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
