import { jwtVerify } from "jose";
import { SUPABASE_JWT_SECRET } from "../env";
import { JwtPayload } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

const JWT_SECRET = new TextEncoder().encode(SUPABASE_JWT_SECRET);

export const getSupabaseClaims = async (request: NextRequest): Promise<JwtPayload | null> => {
	const raw = request.cookies.get("sb-api-auth-token")?.value;
  	if (!raw) return null;

	try {
		const content = raw.startsWith("base64-") ? raw.slice(7) : raw;
		
		const decoded = JSON.parse(Buffer.from(base64UrlToBase64(content), "base64").toString("utf8"));

		const jwt = decoded.access_token;
		if (!jwt) return null;

		const { payload } = await jwtVerify(jwt, JWT_SECRET);
		return payload as JwtPayload;
	} catch (error) {
		console.error('[auth] error verifying token:', error);
		return null;
	}
};

function base64UrlToBase64(input: string) {
	return input.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(input.length / 4) * 4, "=");
}