import { siteConfig } from "@/config/site";
import { getSitemapMediaTvSeries } from "@/features/server/sitemap";
import { routing } from "@/lib/i18n/routing";
import { buildSitemap } from "@/lib/sitemap";
import { kebabCase } from "lodash";
import { NextResponse } from "next/server";
import { gzipSync } from "zlib";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await params;
    const series = await getSitemapMediaTvSeries(id);

    const sitemapXML = buildSitemap(series.map((serie) => {
      const translations = Object.fromEntries(
        serie.tmdb_tv_series_translations.map((t) => [
          `${t.iso_639_1}-${t.iso_3166_1}`,
          t.name,
        ])
      );
      return {
        url: `${siteConfig.url}/tv_series/${serie.id}${serie.original_name ? `-${kebabCase(serie.original_name)}` : ''}`,
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((locale) => {
              const title = translations[locale] || serie.original_name;
              const slug = `${serie.id}${title ? `-${kebabCase(title)}` : ''}`;
              return [
                locale,
                `${siteConfig.url}/${locale}/tv_series/${slug}`,
              ];
            })
          ),
        },
      };
    }));

    const gzipped = gzipSync(sitemapXML);

    return new NextResponse(Uint8Array.from(gzipped), {
      headers: {
        "Content-Type": "application/xml",
        "Content-Encoding": "gzip",
        "Content-Length": gzipped.length.toString(),
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Error generating TV series sitemap:", error);
    return NextResponse.error();
  }
}
