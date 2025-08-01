import { siteConfig } from "@/config/site";
import { getSitemapUsers } from "@/features/server/sitemap";
import { buildSitemap } from "@/lib/sitemap";
import { NextResponse } from "next/server";
import { gzipSync } from "zlib";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await params;
    const users = await getSitemapUsers(id);

    const sitemapXML = buildSitemap(users.map((user) => ({
      url: `${siteConfig.url}/@${user.username}`,
      lastModified: user.created_at
        ? new Date(user.created_at)
        : new Date(),
      changeFrequency: "daily",
      priority: 0.5,
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
    console.error("Error generating user sitemap:", error);
    return NextResponse.error();
  }
}
