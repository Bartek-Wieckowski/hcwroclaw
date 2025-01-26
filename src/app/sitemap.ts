import { MetadataRoute } from 'next';
import { locales } from '@/i18n/i18n';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Define your main routes here
  const routes = [
    '', // home page
    '/news', // assuming you have a news page
    '/teams', // assuming you have a teams page
    '/club', // assuming you have a club page
    '/contact', // assuming you have a contact page
    '/become-a-partner', // assuming you have a become a partner page
  ];

  // Create sitemap entries for each route in each language
  const sitemapEntries = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: (route === ''
        ? 'daily'
        : 'weekly') as MetadataRoute.Sitemap[number]['changeFrequency'],
      priority: route === '' ? 1 : 0.8,
      // Add language alternates for each URL
      alternates: {
        languages: Object.fromEntries(
          locales.map((loc) => [loc, `${baseUrl}/${loc}${route}`])
        ),
      },
    }))
  );

  // Add any dynamic routes here if needed
  // For example, if you have team detail pages:
  // const teams = await fetchTeams()
  // const teamEntries = teams.flatMap(team =>
  //   locales.map(locale => ({
  //     url: `${baseUrl}/${locale}/teams/${team.slug}`,
  //     lastModified: team.updatedAt,
  //     changeFrequency: 'weekly' as const,
  //     priority: 0.7,
  //     alternates: {
  //       languages: Object.fromEntries(
  //         locales.map(loc => [
  //           loc,
  //           `${baseUrl}/${loc}/teams/${team.slug}`
  //         ])
  //       )
  //     }
  //   }))
  // )

  return [
    ...sitemapEntries,
    // ...teamEntries, // Uncomment if you add dynamic routes
  ];
}
