import { supabaseAdmin } from "@/lib/supabase/supabase-admin";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { data, error } = await supabaseAdmin.storage
    .from("sitemaps")
    .download(`movies/${id}.xml.gz`);
  if (error || !data) {
    return new NextResponse("[sitemap] films page not found", { status: 404 });
  }
  return new NextResponse(data, {
    headers: {
      "Content-Type": "application/xml",
      "Content-Encoding": "gzip",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
