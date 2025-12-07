import { siteConfig } from "@/config/site";
import { getSitemapMediaTvSeriesCount } from "@/features/server/sitemap";
import { buildSitemapIndex } from "@/lib/sitemap";
import { NextResponse } from "next/server";
import { gzipSync } from "zlib";

export async function GET() {
  try {
    const count = await getSitemapMediaTvSeriesCount();

    const sitemapIndexes = Array.from({ length: count }, (_, index) => {
      return `${siteConfig.url}/sitemaps/tv-series/${index}`;
    });

    const sitemapIndexXML = buildSitemapIndex(sitemapIndexes);
    const gzipped = gzipSync(sitemapIndexXML);

    return new NextResponse(Uint8Array.from(gzipped), {
      headers: {
        "Content-Type": "application/xml",
        "Content-Encoding": "gzip",
        "Content-Length": gzipped.length.toString(),
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap index:", error);
    return NextResponse.error();
  }
}