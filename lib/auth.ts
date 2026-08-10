import { cookies } from "next/headers";
import { createHmac } from "crypto";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_COOKIE = "admin_session";
const SESSION_SECRET = process.env.SESSION_SECRET;

export function hashPassword(password: string): string {
  if (!SESSION_SECRET) return "";
  return createHmac("sha256", SESSION_SECRET).update(password).digest("hex");
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
  return Boolean(
    ADMIN_USERNAME &&
      ADMIN_PASSWORD &&
      SESSION_SECRET &&
      username === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD
  );
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;
  return session ? validateSession(session) : false;
}

export { SESSION_COOKIE };
