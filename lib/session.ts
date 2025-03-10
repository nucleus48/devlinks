import "server-only";
import * as jose from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
const alg = "HS256";
const duration = 7 * 24 * 60 * 60 * 1000;

type SessionPayload = {
  userId: string;
  email: string;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  const session = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(payload.expiresAt)
    .sign(secret);

  return session;
}

export async function decrypt(session: string) {
  const { payload } = await jose.jwtVerify(session, secret, {
    algorithms: [alg],
  });
  return payload as SessionPayload;
}

export async function createSession(
  payload: Omit<SessionPayload, "expiresAt">
) {
  const expiresAt = new Date(Date.now() + duration);
  const session = await encrypt({ ...payload, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const session = await getSession();

  if (!session) return null;

  const expires = new Date(Date.now() + duration);
  const newSession = await encrypt({ ...session, expiresAt: expires });
  const cookieStore = await cookies();

  return cookieStore.set("session", newSession, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("session")?.value;
    const session = await decrypt(cookie || "");
    return session;
  } catch {
    return null;
  }
}

export async function verifySession() {
  const session = await getSession();

  if (!session) redirect("/login");

  return { userId: session.userId, email: session.email };
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
