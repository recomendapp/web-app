import { siteConfig } from "@/config/site";
import { getSitemapReviewsTvSeries } from "@/features/server/sitemap";
import { buildSitemap } from "@/lib/sitemap";
import { NextResponse } from "next/server";
import { gzipSync } from "zlib";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const reviews = await getSitemapReviewsTvSeries(Number(id));
    const sitemapXML = buildSitemap(reviews.map((review) => ({
      url: `${siteConfig.url}/tv-series/${review.activity.tv_series_id}/review/${review.id}`,
      lastModified: review.updated_at
        ? new Date(review.updated_at)
        : new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    })));

    const gzipped = gzipSync(sitemapXML);

    return new NextResponse(Uint8Array.from(gzipped), {
      headers: {
        "Content-Type": "application/xml",
        "Content-Encoding": "gzip",
        "Content-Length": gzipped.length.toString(),
        "Cache-Control": "public, max-age=86400", // 24h
      },
    });
  } catch (error) {
    console.error("Error generating review sitemap:", error);
    return NextResponse.error();
  }
}
