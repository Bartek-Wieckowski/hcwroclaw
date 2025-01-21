export type Partner = {
  name: string;
  logo: {
    asset: {
      url: string | null;
      metadata: {
        dimensions: {
          width: number | null;
          height: number | null;
        } | null;
      } | null;
    } | null;
  };
  hasWebsite: boolean | null;
  url: string | null;
};
