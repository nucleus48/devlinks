import "server-only";
import * as jose from "jose";
import { cookies } from "next/headers";

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
  try {
    const { payload } = await jose.jwtVerify(session, secret, {
      algorithms: [alg],
    });
    return payload as SessionPayload;
  } catch {
    console.error("Invalid session token");
  }
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
  const expires = new Date(Date.now() + duration);
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  const session = await decrypt(cookie!);

  if (!cookie || !session) return null;

  const newSession = await encrypt({ ...session, expiresAt: expires });

  return cookieStore.set("session", newSession, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
