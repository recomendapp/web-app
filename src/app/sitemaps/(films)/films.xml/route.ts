import { supabaseAdmin } from "@/lib/supabase/supabase-admin";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabaseAdmin.storage
    .from("sitemaps")
    .download("movies/index.xml.gz");

  if (error || !data) {
    return new NextResponse("[sitemap] films index not found", { status: 404 });
  }

  return new NextResponse(data, {
    headers: {
      "Content-Type": "application/xml",
      "Content-Encoding": "gzip",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
