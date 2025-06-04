import { siteConfig } from "@/config/site";
import { getSitemapReviews } from "@/features/server/sitemap";
import { buildSitemap } from "@/lib/sitemap";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
	const { id } = await params;
	const reviews = await getSitemapReviews(id)
	const sitemapXML = buildSitemap(reviews.map((review) => ({
	  url: `${siteConfig.url}/review/${review.id}`,
	  lastModified: review.updated_at ? new Date(review.updated_at) : new Date(),
	  changeFrequency: "daily",
	  priority: 0.8,
	})));
	return new NextResponse(sitemapXML, {
	  headers: {
		"Content-Type": "application/xml",
		"Content-Length": Buffer.byteLength(sitemapXML).toString(),
	  },
	});
  } catch (error) {
	console.error("Error generating sitemap index:", error);
	return NextResponse.error();
  }
}