import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const masterClasses = await prisma.masterClass.findMany({
    orderBy: { id: "desc" },
  });
  return NextResponse.json(masterClasses);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const masterClass = await prisma.masterClass.create({
      data: {
        name: data.name,
        description: data.description || null,
        imageUrl: data.imageUrl || null,
        price: parseInt(data.price) || 0,
        duration: parseInt(data.duration) || 45,
        minAge: parseInt(data.minAge) || 5,
        maxAge: data.maxAge ? parseInt(data.maxAge) : null,
        popular: data.popular ?? false,
        active: data.active ?? true,
      },
    });
    return NextResponse.json(masterClass);
  } catch (error) {
    console.error("Error creating master class:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const masterClass = await prisma.masterClass.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description || null,
        imageUrl: data.imageUrl || null,
        price: parseInt(data.price) || 0,
        duration: parseInt(data.duration) || 45,
        minAge: parseInt(data.minAge) || 5,
        maxAge: data.maxAge ? parseInt(data.maxAge) : null,
        popular: data.popular ?? false,
        active: data.active ?? true,
      },
    });
    return NextResponse.json(masterClass);
  } catch (error) {
    console.error("Error updating master class:", error);
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
    
    await prisma.masterClass.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting master class:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
