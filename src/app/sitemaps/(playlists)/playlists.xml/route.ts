import { siteConfig } from "@/config/site";
import { getSitemapPlaylistCount } from "@/features/server/sitemap";
import { buildSitemapIndex } from "@/lib/sitemap";
import { NextResponse } from "next/server";
import { gzipSync } from "zlib";

export async function GET() {
  try {
    const count = await getSitemapPlaylistCount();

    const sitemapIndexes = Array.from({ length: count }, (_, index) => {
      return `${siteConfig.url}/sitemaps/playlists/${index}`;
    });

    const sitemapIndexXML = buildSitemapIndex(sitemapIndexes);
    const gzipped = gzipSync(sitemapIndexXML);

    return new NextResponse(gzipped, {
      headers: {
        "Content-Type": "application/xml",
        "Content-Encoding": "gzip",
        "Content-Length": gzipped.length.toString(),
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Error generating playlist sitemap index:", error);
    return NextResponse.error();
  }
}
