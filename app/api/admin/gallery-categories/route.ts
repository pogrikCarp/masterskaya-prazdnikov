import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const categories = await prisma.galleryCategory.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
    include: {
      _count: { select: { items: true } },
    },
  });

  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const name = String(data.name || "").trim();

    if (!name) {
      return NextResponse.json({ error: "Укажите название категории" }, { status: 400 });
    }

    const category = await prisma.galleryCategory.create({
      data: {
        name,
        order: Number.parseInt(String(data.order ?? "0"), 10) || 0,
        active: data.active ?? true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error creating gallery category:", error);
    return NextResponse.json(
      { error: "Не удалось создать категорию. Возможно, такое название уже есть." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const name = String(data.name || "").trim();

    if (!data.id) {
      return NextResponse.json({ error: "Не указан id категории" }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ error: "Укажите название категории" }, { status: 400 });
    }

    const category = await prisma.galleryCategory.update({
      where: { id: Number(data.id) },
      data: {
        name,
        order: Number.parseInt(String(data.order ?? "0"), 10) || 0,
        active: data.active ?? true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error updating gallery category:", error);
    return NextResponse.json({ error: "Не удалось обновить категорию" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = Number.parseInt(searchParams.get("id") || "0", 10);

    if (!id) {
      return NextResponse.json({ error: "Не указан id категории" }, { status: 400 });
    }

    await prisma.galleryCategory.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting gallery category:", error);
    return NextResponse.json({ error: "Не удалось удалить категорию" }, { status: 500 });
  }
}
