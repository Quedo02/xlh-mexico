// lib/server/verifyJWT.ts (no "use client")
import { jwtVerify } from "jose";

export async function verifyJWTServer(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload; // claims
  } catch {
    return null;
  }
}
