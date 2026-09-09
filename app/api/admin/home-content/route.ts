import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  DEFAULT_HOME_CONTENT,
  STORY_SECTION,
  WHY_SECTION,
} from "@/lib/home-content";

const SECTION_KEYS = [STORY_SECTION, WHY_SECTION];

function isKnownKey(key: unknown): key is string {
  return typeof key === "string" && SECTION_KEYS.includes(key);
}

/** Первое открытие вкладки: переносим исходные тексты страницы в базу */
async function ensureSeeded(key: string) {
  const existing = await prisma.homeCard.count({ where: { sectionKey: key } });
  const defaults = DEFAULT_HOME_CONTENT[key];

  await prisma.homeSection.upsert({
    where: { key },
    update: {},
    create: { key, title: defaults.title, subtitle: defaults.subtitle },
  });

  if (existing === 0) {
    await prisma.homeCard.createMany({
      data: defaults.cards.map((card, idx) => ({
        sectionKey: key,
        icon: card.icon,
        title: card.title,
        text: card.text,
        order: idx,
      })),
    });
  }
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    for (const key of SECTION_KEYS) {
      await ensureSeeded(key);
    }

    const [sections, cards] = await Promise.all([
      prisma.homeSection.findMany({ where: { key: { in: SECTION_KEYS } } }),
      prisma.homeCard.findMany({
        where: { sectionKey: { in: SECTION_KEYS } },
        orderBy: [{ order: "asc" }, { id: "asc" }],
      }),
    ]);

    return NextResponse.json(
      SECTION_KEYS.map((key) => ({
        key,
        title: sections.find((s) => s.key === key)?.title ?? DEFAULT_HOME_CONTENT[key].title,
        subtitle: sections.find((s) => s.key === key)?.subtitle ?? null,
        cards: cards.filter((card) => card.sectionKey === key),
      }))
    );
  } catch (error) {
    console.error("Error fetching home content:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

/** Заголовок блока */
export async function PATCH(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();

    if (!isKnownKey(data.key)) {
      return NextResponse.json({ error: "Unknown section" }, { status: 400 });
    }

    const title = String(data.title || "").trim();
    if (!title) {
      return NextResponse.json({ error: "Заголовок не может быть пустым" }, { status: 400 });
    }

    const subtitle = data.subtitle ? String(data.subtitle).trim() || null : null;

    const section = await prisma.homeSection.upsert({
      where: { key: data.key },
      update: { title, subtitle },
      create: { key: data.key, title, subtitle },
    });

    return NextResponse.json(section);
  } catch (error) {
    console.error("Error updating home section:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

/** Новая карточка в блоке */
export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();

    if (!isKnownKey(data.sectionKey)) {
      return NextResponse.json({ error: "Unknown section" }, { status: 400 });
    }

    const title = String(data.title || "").trim();
    const text = String(data.text || "").trim();

    if (!title || !text) {
      return NextResponse.json(
        { error: "Заполните заголовок и текст карточки" },
        { status: 400 }
      );
    }

    const card = await prisma.homeCard.create({
      data: {
        sectionKey: data.sectionKey,
        icon: data.icon ? String(data.icon).trim() : null,
        title,
        text,
        order: Number.parseInt(data.order, 10) || 0,
        active: data.active ?? true,
      },
    });

    return NextResponse.json(card);
  } catch (error) {
    console.error("Error creating home card:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

/** Правка карточки */
export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const id = Number.parseInt(data.id, 10);

    if (!id) {
      return NextResponse.json({ error: "Не указана карточка" }, { status: 400 });
    }

    const title = String(data.title || "").trim();
    const text = String(data.text || "").trim();

    if (!title || !text) {
      return NextResponse.json(
        { error: "Заполните заголовок и текст карточки" },
        { status: 400 }
      );
    }

    const card = await prisma.homeCard.update({
      where: { id },
      data: {
        icon: data.icon ? String(data.icon).trim() : null,
        title,
        text,
        order: Number.parseInt(data.order, 10) || 0,
        active: data.active ?? true,
      },
    });

    return NextResponse.json(card);
  } catch (error) {
    console.error("Error updating home card:", error);
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

    if (!id) {
      return NextResponse.json({ error: "Не указана карточка" }, { status: 400 });
    }

    await prisma.homeCard.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting home card:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
