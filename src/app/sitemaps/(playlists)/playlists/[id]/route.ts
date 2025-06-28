import { siteConfig } from "@/config/site";
import { getSitemapPlaylists } from "@/features/server/sitemap";
import { buildSitemap } from "@/lib/sitemap";
import { NextResponse } from "next/server";
import { gzipSync } from "zlib";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await params;
    const playlists = await getSitemapPlaylists(id);

    const sitemapXML = buildSitemap(playlists.map((playlist) => ({
      url: `${siteConfig.url}/playlist/${playlist.id}`,
      lastModified: playlist.updated_at
        ? new Date(playlist.updated_at)
        : new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    })));

    const gzipped = gzipSync(sitemapXML);

    return new NextResponse(gzipped, {
      headers: {
        "Content-Type": "application/xml",
        "Content-Encoding": "gzip",
        "Content-Length": gzipped.length.toString(),
        "Cache-Control": "public, max-age=86400", // 24h cache
      },
    });
  } catch (error) {
    console.error("Error generating playlist sitemap:", error);
    return NextResponse.error();
  }
}
