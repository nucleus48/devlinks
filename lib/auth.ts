import * as jose from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
const alg = "HS256";

export async function encryptJwt(userId: string, email: string) {
  const token = await new jose.SignJWT({ userId, email })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);

  return token;
}

export async function decryptJwt(token: string) {
  const { payload } = await jose.jwtVerify(token, secret);
  return payload;
}

export async function createSession(userId: string, email: string) {
  const token = await encryptJwt(userId, email);

  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
  });
}

export async function verifySession() {
  const token = (await cookies()).get("session")?.value;

  if (!token) throw new Error("Unauthorized");

  return await decryptJwt(token);
}
