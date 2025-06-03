import { siteConfig } from "@/config/site";
import { getSitemapMediaCount } from "@/features/server/sitemap";
import { buildSitemapIndex } from "@/lib/sitemap";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const count = await getSitemapMediaCount();
    const sitemapIndexes = [
      ...Array.from({ length: count.films }, (_, index) => {
        return `${siteConfig.url}/sitemaps/medias/films/${index}`;
      }),
      ...Array.from({ length: count.series }, (_, index) => {
        return `${siteConfig.url}/sitemaps/medias/tv_series/${index}`;
      }),
    ];
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