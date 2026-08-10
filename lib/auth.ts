import { cookies } from "next/headers";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "праздник2024";
const SESSION_COOKIE = "admin_session";
const SESSION_SECRET = process.env.SESSION_SECRET || "mp-secret-key-change-in-production";

export function hashPassword(password: string): string {
  let hash = 0;
  const str = password + SESSION_SECRET;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

export function createSession(): string {
  const timestamp = Date.now();
  const token = hashPassword(`${ADMIN_USERNAME}:${timestamp}`);
  return `${timestamp}:${token}`;
}

export function validateSession(session: string): boolean {
  if (!session) return false;
  
  const [timestampStr, token] = session.split(":");
  const timestamp = parseInt(timestampStr, 10);
  
  if (isNaN(timestamp)) return false;
  
  // Session expires after 24 hours
  const maxAge = 24 * 60 * 60 * 1000;
  if (Date.now() - timestamp > maxAge) return false;
  
  const expectedToken = hashPassword(`${ADMIN_USERNAME}:${timestamp}`);
  return token === expectedToken;
}

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;
  return session ? validateSession(session) : false;
}

export { SESSION_COOKIE };
