import { siteConfig } from "@/config/site";
import { getSitemapUserCount } from "@/features/server/sitemap";
import { buildSitemapIndex } from "@/lib/sitemap";
import { NextResponse } from "next/server";
import { gzipSync } from "zlib";

export async function GET() {
  try {
    const count = await getSitemapUserCount();

    const sitemapIndexes = Array.from({ length: count }, (_, index) => {
      return `${siteConfig.url}/sitemaps/users/${index}`;
    });

    const sitemapIndexXML = buildSitemapIndex(sitemapIndexes);
    const gzipped = gzipSync(sitemapIndexXML);

    return new NextResponse(Uint8Array.from(gzipped), {
      headers: {
        "Content-Type": "application/xml",
        "Content-Encoding": "gzip",
        "Content-Length": gzipped.length.toString(),
        "Cache-Control": "public, max-age=86400", // 24 heures
      },
    });
  } catch (error) {
    console.error("Error generating user sitemap index:", error);
    return NextResponse.error();
  }
}
