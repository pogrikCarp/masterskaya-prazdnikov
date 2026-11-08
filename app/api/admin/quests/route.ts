import { catalogMediaInput, CatalogInputError } from "@/lib/catalog-media";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const quests = await prisma.quest.findMany({
    orderBy: { id: "desc" },
  });
  return NextResponse.json(quests);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const quest = await prisma.quest.create({
      data: {
        name: data.name,
        description: data.description || null,
        ...catalogMediaInput(data),
        price: parseInt(data.price) || 0,
        duration: parseInt(data.duration) || 60,
        minAge: parseInt(data.minAge) || 6,
        maxAge: data.maxAge ? parseInt(data.maxAge) : null,
        popular: data.popular ?? false,
        active: data.active ?? true,
      },
    });
    return NextResponse.json(quest);
  } catch (error) {
    if (error instanceof CatalogInputError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Error creating quest:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const quest = await prisma.quest.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description || null,
        ...catalogMediaInput(data),
        price: parseInt(data.price) || 0,
        duration: parseInt(data.duration) || 60,
        minAge: parseInt(data.minAge) || 6,
        maxAge: data.maxAge ? parseInt(data.maxAge) : null,
        popular: data.popular ?? false,
        active: data.active ?? true,
      },
    });
    return NextResponse.json(quest);
  } catch (error) {
    if (error instanceof CatalogInputError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Error updating quest:", error);
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
    
    await prisma.quest.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof CatalogInputError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Error deleting quest:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
