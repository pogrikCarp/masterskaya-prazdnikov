import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateCredentials, createSession, SESSION_COOKIE } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!validateCredentials(username, password)) {
      return NextResponse.json(
        { error: "Неверный логин или пароль" },
        { status: 401 }
      );
    }

    const session = createSession();
    const cookieStore = await cookies();
    const isSecureRequest =
      new URL(request.url).protocol === "https:" ||
      request.headers.get("x-forwarded-proto") === "https";
    
    cookieStore.set(SESSION_COOKIE, session, {
      httpOnly: true,
      // На тестовом сервере сайт пока открыт по HTTP/IP. После подключения
      // HTTPS через Nginx флаг снова включится автоматически.
      secure: isSecureRequest,
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Ошибка авторизации" },
      { status: 500 }
    );
  }
}
