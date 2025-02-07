export const ROUTES = {
  HOME: (lng: string) => `/${lng}`,
  NEWS: (lng: string) => `/${lng}/news`,
  SINGLENEWS: (lng: string, slug: string) => `/${lng}/news/${slug}`,
  TEAM: (lng: string) => `/${lng}/team`,
  CLUB: (lng: string) => `/${lng}/club`,
  CONTACT: (lng: string) => `/${lng}/contact`,
  BECOMEPARTNER: (lng: string) => `/${lng}/become-a-partner`,
  CALENDARALL: (lng: string) => `/${lng}/calendar-all`,
  GALLERY: (lng: string) => `/${lng}/gallery`,
};
