import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const galleryItems = await prisma.galleryItem.findMany({
    include: { category: true },
    orderBy: [{ order: "asc" }, { id: "desc" }],
  });

  return NextResponse.json(
    galleryItems.map((item) => ({
      ...item,
      categoryName: item.category?.name || null,
    }))
  );
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    if (!data.imageUrl) {
      return NextResponse.json({ error: "Загрузите изображение" }, { status: 400 });
    }

    const categoryId = data.categoryId ? Number(data.categoryId) : null;
    if (!categoryId) {
      return NextResponse.json({ error: "Выберите категорию" }, { status: 400 });
    }

    const galleryItem = await prisma.galleryItem.create({
      data: {
        imageUrl: data.imageUrl,
        title: data.title || null,
        description: data.description || null,
        categoryId,
        order: Number.parseInt(String(data.order ?? "0"), 10) || 0,
        active: data.active ?? true,
      },
      include: { category: true },
    });

    return NextResponse.json({
      ...galleryItem,
      categoryName: galleryItem.category?.name || null,
    });
  } catch (error) {
    console.error("Error creating gallery item:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const categoryId = data.categoryId ? Number(data.categoryId) : null;

    if (!categoryId) {
      return NextResponse.json({ error: "Выберите категорию" }, { status: 400 });
    }

    const galleryItem = await prisma.galleryItem.update({
      where: { id: data.id },
      data: {
        imageUrl: data.imageUrl,
        title: data.title || null,
        description: data.description || null,
        categoryId,
        order: Number.parseInt(String(data.order ?? "0"), 10) || 0,
        active: data.active ?? true,
      },
      include: { category: true },
    });

    return NextResponse.json({
      ...galleryItem,
      categoryName: galleryItem.category?.name || null,
    });
  } catch (error) {
    console.error("Error updating gallery item:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = Number.parseInt(searchParams.get("id") || "0", 10);
    await prisma.galleryItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
