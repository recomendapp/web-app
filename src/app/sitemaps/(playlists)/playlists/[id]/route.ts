import { siteConfig } from "@/config/site";
import { getSitemapPlaylists } from "@/features/server/sitemap";
import { buildSitemap } from "@/lib/sitemap";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
	const { id } = await params;
	const playlists = await getSitemapPlaylists(id)
	const sitemapXML = buildSitemap(playlists.map((playlist) => ({
	  url: `${siteConfig.url}/playlist/${playlist.id}`,
	  lastModified: playlist.updated_at ? new Date(playlist.updated_at) : new Date(),
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