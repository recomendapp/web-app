import { siteConfig } from "@/config/site";
import { getSitemapReviewMovieCount, getSitemapReviewTvSeriesCount } from "@/features/server/sitemap";
import { buildSitemapIndex } from "@/lib/sitemap";
import { NextResponse } from "next/server";
import { gzipSync } from "zlib";

export async function GET() {
  try {
    const reviewMovieCount = await getSitemapReviewMovieCount();
    const reviewTvSeriesCount = await getSitemapReviewTvSeriesCount();

    const sitemapMovieIndexes = Array.from({ length: reviewMovieCount }, (_, index) => {
      return `${siteConfig.url}/sitemaps/reviews/movie/${index}`;
    });

    const sitemapTvSeriesIndexes = Array.from({ length: reviewTvSeriesCount }, (_, index) => {
      return `${siteConfig.url}/sitemaps/reviews/tv-series/${index}`;
    });

    const sitemapIndexXML = buildSitemapIndex([...sitemapMovieIndexes, ...sitemapTvSeriesIndexes]);
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
    console.error("Error generating review sitemap index:", error);
    return NextResponse.error();
  }
}
