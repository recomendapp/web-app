import { jwtVerify } from "jose";
import { SUPABASE_JWT_SECRET } from "../env";
import { JwtPayload } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

const JWT_SECRET = new TextEncoder().encode(SUPABASE_JWT_SECRET);

export const getSupabaseClaims = async (
  request: NextRequest
): Promise<JwtPayload | null> => {
  try {
    const chunks = request.cookies
      .getAll()
      .filter((c) => c.name.startsWith("sb-supabase-auth-token"))
      .sort(
        (a, b) =>
          Number(a.name.split(".")[1] || 0) -
          Number(b.name.split(".")[1] || 0)
      )
      .map((c) => c.value);

    if (!chunks.length) return null;

    const raw = chunks.join("");
    const content = raw.startsWith("base64-") ? raw.slice(7) : raw;
	
    const decodedJson = Buffer.from(
		base64UrlToBase64(content),
		"base64"
    ).toString("utf8");
	
    const decoded = JSON.parse(decodedJson);
    const jwt = decoded.access_token;
    if (!jwt) return null;

    const { payload } = await jwtVerify(jwt, JWT_SECRET);
    return payload as JwtPayload;
  } catch (err) {
    console.error("[auth] error verifying token:", err);
    return null;
  }
};

function base64UrlToBase64(input: string) {
  return input
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(input.length / 4) * 4, "=");
}