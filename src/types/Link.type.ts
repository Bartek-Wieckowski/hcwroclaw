type LinkType = {
  title: string;
  path: string;
};

export type NavLinkType = {
  navLink: {
    title: string;
    path: string;
  };
  onNavigate?: () => void;
};

export type FooterLinkType = {
  footerLink: LinkType;
};
