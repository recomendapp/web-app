import { siteConfig } from "@/config/site";
import { getSitemapUsers } from "@/features/server/sitemap";
import { buildSitemap } from "@/lib/sitemap";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
	const { id } = await params;
	const users = await getSitemapUsers(id)
	const sitemapXML = buildSitemap(users.map((user) => ({
	  url: `${siteConfig.url}/@${user.username}`,
	  lastModified: user.created_at ? new Date(user.created_at) : new Date(),
	  changeFrequency: "daily",
	  priority: 0.5,
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