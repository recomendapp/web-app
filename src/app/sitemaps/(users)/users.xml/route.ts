import { siteConfig } from "@/config/site";
import { getSitemapUserCount } from "@/features/server/sitemap";
import { buildSitemapIndex } from "@/lib/sitemap";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const count = await getSitemapUserCount();
    const sitemapIndexes = Array.from({ length: count }, (_, index) => {
      return `${siteConfig.url}/sitemaps/users/${index}`;
    });
    const sitemapIndexXML = buildSitemapIndex(sitemapIndexes);
    return new NextResponse(sitemapIndexXML, {
      headers: {
        "Content-Type": "application/xml",
        "Content-Length": Buffer.byteLength(sitemapIndexXML).toString(),
      },
    });
  } catch (error) {
    console.error("Error generating sitemap index:", error);
    return NextResponse.error();
  }
}