import { siteConfig } from "@/config/site";
import { getSitemapMediaMovies } from "@/features/server/sitemap";
import { routing } from "@/lib/i18n/routing";
import { buildSitemap } from "@/lib/sitemap";
import { kebabCase } from "lodash";
import { NextResponse } from "next/server";
import { gzipSync } from 'zlib';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await params;
    const films = await getSitemapMediaMovies(id);

    const sitemapXML = buildSitemap(films.map((film) => {
      const translations = Object.fromEntries(
        film.tmdb_movie_translations.map((t) => [
          `${t.iso_639_1}-${t.iso_3166_1}`,
          t.title,
        ])
      );

      return {
        url: `${siteConfig.url}/film/${film.id}${film.original_title ? `-${kebabCase(film.original_title)}` : ''}`,
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((locale) => {
              const title = translations[locale] || film.original_title;
              const slug = `${film.id}${title ? `-${kebabCase(title)}` : ''}`;
              return [
                locale,
                `${siteConfig.url}/${locale}/film/${slug}`,
              ];
            })
          ),
        },
      };
    }));

    const gzippedXML = gzipSync(sitemapXML);

    return new NextResponse(Uint8Array.from(gzippedXML), {
      headers: {
        "Content-Type": "application/xml",
        "Content-Encoding": "gzip",
        "Content-Length": gzippedXML.length.toString(),
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return NextResponse.error();
  }
}
