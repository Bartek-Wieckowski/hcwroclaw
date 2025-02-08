export const ROUTES = {
  HOME: (lng: string) => `/${lng}`,
  NEWS: (lng: string) => `/${lng}/news`,
  SINGLENEWS: (lng: string, slug: string) => `/${lng}/news/${slug}`,
  TEAM: (lng: string) => `/${lng}/team`,
  CLUB: (lng: string) => `/${lng}/club`,
  CONTACT: (lng: string) => `/${lng}/contact`,
  SUPPORT: (lng: string) => `/${lng}/support`,
  CALENDARALL: (lng: string) => `/${lng}/calendar-all`,
  GALLERY: (lng: string) => `/${lng}/gallery`,
  INFO: (lng: string) => `/${lng}/info`,
  TRAININGS: (lng: string) => `/${lng}/trainings`,
};
