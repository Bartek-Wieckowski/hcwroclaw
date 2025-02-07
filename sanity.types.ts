/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type PartnersLogo = {
  _id: string;
  _type: "partnersLogo";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  sectionTitle: LocaleString;
  partners: Array<{
    name: string;
    logo: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
    hasWebsite?: boolean;
    url?: string;
    _type: "partner";
    _key: string;
  }>;
};

export type Youtube = {
  _type: "youtube";
  url: string;
  title: string;
};

export type NewsBlock = Array<{
  children?: Array<{
    marks?: Array<string>;
    text?: string;
    _type: "span";
    _key: string;
  }>;
  style?: "normal" | "h3" | "blockquote";
  listItem?: "bullet";
  markDefs?: Array<{
    linkType?: "external" | "internal" | "email" | "phone" | "whatsapp" | "messenger";
    href?: string;
    _type: "link";
    _key: string;
  }>;
  level?: number;
  _type: "block";
  _key: string;
} | {
  asset?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
  };
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  alt: string;
  _type: "image";
  _key: string;
} | {
  _key: string;
} & Youtube | {
  text: string;
  image: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "image";
  };
  _type: "textWithImage";
  _key: string;
}>;

export type LeagueTablesOrder = {
  _id: string;
  _type: "leagueTablesOrder";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  tables: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "leagueTables";
  }>;
};

export type LeagueTables = {
  _id: string;
  _type: "leagueTables";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  logo?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  headers: Array<{
    _key: string;
  } & LocaleString>;
  rows: Array<{
    cells: Array<string>;
    _type: "row";
    _key: string;
  }>;
};

export type GameCalendar = {
  _id: string;
  _type: "gameCalendar";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  date: string;
  gameType: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "gameType";
  };
  location: string;
  time: string;
  firstTeam: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "team";
  };
  secondTeam: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "team";
  };
  isCompleted?: boolean;
  firstTeamGoals?: number;
  secondTeamGoals?: number;
};

export type GameType = {
  _id: string;
  _type: "gameType";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name: LocaleString;
};

export type Team = {
  _id: string;
  _type: "team";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name: string;
  logo?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
};

export type BecomePartnerPage = {
  _id: string;
  _type: "becomePartnerPage";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  seo?: {
    title?: LocaleString;
    desc?: LocaleString;
  };
  becomePartnerDesc: LocaleClubBlock;
};

export type ContactPage = {
  _id: string;
  _type: "contactPage";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  seo?: {
    title?: LocaleString;
    desc?: LocaleString;
  };
  contactOptions: LocaleClubBlock;
};

export type TeamPage = {
  _id: string;
  _type: "teamPage";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  seo?: {
    title?: LocaleString;
    desc?: LocaleString;
  };
  teamSliderImages: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }>;
  goalkeepers: Array<{
    firstName: string;
    lastName: string;
    number: number;
    photo?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
    actionPhoto?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
    isCaptain?: boolean;
    isAssistantCaptain?: boolean;
    height?: string;
    weight?: string;
    stickHand?: "left" | "right";
    _type: "player";
    _key: string;
  }>;
  defenders: Array<{
    firstName: string;
    lastName: string;
    number: number;
    photo?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
    actionPhoto?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
    isCaptain?: boolean;
    isAssistantCaptain?: boolean;
    height?: string;
    weight?: string;
    stickHand?: "left" | "right";
    _type: "player";
    _key: string;
  }>;
  forwards: Array<{
    firstName: string;
    lastName: string;
    number: number;
    photo?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
    actionPhoto?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
    isCaptain?: boolean;
    isAssistantCaptain?: boolean;
    height?: string;
    weight?: string;
    stickHand?: "left" | "right";
    _type: "player";
    _key: string;
  }>;
};

export type ClubPage = {
  _id: string;
  _type: "clubPage";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  seo?: {
    title?: LocaleString;
    desc?: LocaleString;
  };
  clubHistory: LocaleClubBlock;
  titleIntroduction: LocaleText;
  clubCrest: LocaleClubBlock;
  sectionSummary: LocaleText;
};

export type NewsSinglePage = {
  _id: string;
  _type: "newsSinglePage";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  seo?: {
    title?: LocaleString;
    desc?: LocaleString;
  };
  title: LocaleString;
  date: string;
  slugPL: Slug;
  slugEN: Slug;
  excerpt: LocaleText;
  mainPostImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: LocaleString;
    _type: "image";
  };
  content?: LocaleNewsBlock;
};

export type Slug = {
  _type: "slug";
  current: string;
  source?: string;
};

export type HomePage = {
  _id: string;
  _type: "homePage";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  seo?: {
    title?: LocaleString;
    desc?: LocaleString;
  };
  aboutUsSection: {
    description: LocaleText;
    activePlayers: {
      number: string;
      text: LocaleString;
    };
    gamePerSeasson: {
      number: string;
      text: LocaleString;
    };
    trainingAtWeek: {
      number: string;
      text: LocaleString;
    };
    leagueNumbers: {
      number: string;
      text: LocaleString;
    };
  };
};

export type LocaleClubBlock = {
  _type: "localeClubBlock";
  pl: NewsBlock;
  en: NewsBlock;
};

export type LocaleNewsBlock = {
  _type: "localeNewsBlock";
  pl?: NewsBlock;
  en?: NewsBlock;
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type LocaleText = {
  _type: "localeText";
  pl: string;
  en: string;
};

export type LocaleString = {
  _type: "localeString";
  pl: string;
  en: string;
};

export type AllSanitySchemaTypes = SanityImagePaletteSwatch | SanityImagePalette | SanityImageDimensions | SanityFileAsset | Geopoint | PartnersLogo | Youtube | NewsBlock | LeagueTablesOrder | LeagueTables | GameCalendar | GameType | Team | BecomePartnerPage | ContactPage | TeamPage | ClubPage | NewsSinglePage | Slug | HomePage | LocaleClubBlock | LocaleNewsBlock | SanityImageCrop | SanityImageHotspot | SanityImageAsset | SanityAssetSourceData | SanityImageMetadata | LocaleText | LocaleString;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ./src/sanity/lib/queries.ts
// Variable: getGamesCalendarQuery
// Query: {  "pastGames": *[_type == "gameCalendar" && dateTime(date) < dateTime(now())] |     order(date desc) [0...12] {      _id,      _type,      date,      location,      time,      gameType->{        _id,        name      },      firstTeam->{        _id,        name,        logo {          asset->{            _id,            url          }        }      },      secondTeam->{        _id,        name,        logo {          asset->{            _id,            url          }        }      },      isCompleted,      firstTeamGoals,      secondTeamGoals    },  "futureGames": *[_type == "gameCalendar" && dateTime(date) >= dateTime(now())] |     order(date asc) [0...12] {      _id,      _type,      date,      location,      time,      gameType->{        _id,        name      },      firstTeam->{        _id,        name,        logo {          asset->{            _id,            url          }        }      },      secondTeam->{        _id,        name,        logo {          asset->{            _id,            url          }        }      },      isCompleted,      firstTeamGoals,      secondTeamGoals    },  "leagueTables": *[_type == "leagueTables"] {    _id,    title,    logo {      asset->{        _id,        url      }    }  }}
export type GetGamesCalendarQueryResult = {
  pastGames: Array<{
    _id: string;
    _type: "gameCalendar";
    date: string;
    location: string;
    time: string;
    gameType: {
      _id: string;
      name: LocaleString;
    };
    firstTeam: {
      _id: string;
      name: string;
      logo: {
        asset: {
          _id: string;
          url: string | null;
        } | null;
      } | null;
    };
    secondTeam: {
      _id: string;
      name: string;
      logo: {
        asset: {
          _id: string;
          url: string | null;
        } | null;
      } | null;
    };
    isCompleted: boolean | null;
    firstTeamGoals: number | null;
    secondTeamGoals: number | null;
  }>;
  futureGames: Array<{
    _id: string;
    _type: "gameCalendar";
    date: string;
    location: string;
    time: string;
    gameType: {
      _id: string;
      name: LocaleString;
    };
    firstTeam: {
      _id: string;
      name: string;
      logo: {
        asset: {
          _id: string;
          url: string | null;
        } | null;
      } | null;
    };
    secondTeam: {
      _id: string;
      name: string;
      logo: {
        asset: {
          _id: string;
          url: string | null;
        } | null;
      } | null;
    };
    isCompleted: boolean | null;
    firstTeamGoals: number | null;
    secondTeamGoals: number | null;
  }>;
  leagueTables: Array<{
    _id: string;
    title: string;
    logo: {
      asset: {
        _id: string;
        url: string | null;
      } | null;
    } | null;
  }>;
};
// Variable: getLeagueTablesOrderQuery
// Query: *[_type == "leagueTablesOrder"][0] {    tables[]-> {      _createdAt,      _updatedAt,      _id,      title,      logo {        asset->{          _id,          url        }      },      headers[] {         pl,        en      },      rows[] {        cells      }    }  }
export type GetLeagueTablesOrderQueryResult = {
  tables: Array<{
    _createdAt: string;
    _updatedAt: string;
    _id: string;
    title: string;
    logo: {
      asset: {
        _id: string;
        url: string | null;
      } | null;
    } | null;
    headers: Array<{
      pl: string;
      en: string;
    }>;
    rows: Array<{
      cells: Array<string>;
    }>;
  }>;
} | null;
// Variable: getLeagueTablesQuery
// Query: *[_type == "leagueTables"] {    _createdAt,    _updatedAt,    _id,    title,    logo {      asset->{        _id,        url      }    },    headers[] {       pl,      en    },    rows[] {      cells    }  }
export type GetLeagueTablesQueryResult = Array<{
  _createdAt: string;
  _updatedAt: string;
  _id: string;
  title: string;
  logo: {
    asset: {
      _id: string;
      url: string | null;
    } | null;
  } | null;
  headers: Array<{
    pl: string;
    en: string;
  }>;
  rows: Array<{
    cells: Array<string>;
  }>;
}>;
// Variable: getHomePageAboutUsSectionQuery
// Query: *[_type == "homePage"][0] {    aboutUsSection {      description{en, pl},      activePlayers{number, text{en, pl}},      gamePerSeasson{number, text{en, pl}},      trainingAtWeek{number, text{en, pl}},      leagueNumbers{number, text{en, pl}}    }}
export type GetHomePageAboutUsSectionQueryResult = {
  aboutUsSection: {
    description: {
      en: string;
      pl: string;
    };
    activePlayers: {
      number: string;
      text: {
        en: string;
        pl: string;
      };
    };
    gamePerSeasson: {
      number: string;
      text: {
        en: string;
        pl: string;
      };
    };
    trainingAtWeek: {
      number: string;
      text: {
        en: string;
        pl: string;
      };
    };
    leagueNumbers: {
      number: string;
      text: {
        en: string;
        pl: string;
      };
    };
  };
} | null;
// Variable: getHomePageLatestNewsQuery
// Query: *[_type == "newsSinglePage"] | order(date desc) [0..3] {      _id,      title{pl,en},      slugPL,      slugEN,      excerpt{pl,en},      mainPostImage{asset, alt{pl, en}},      date    }
export type GetHomePageLatestNewsQueryResult = Array<{
  _id: string;
  title: {
    pl: string;
    en: string;
  };
  slugPL: Slug;
  slugEN: Slug;
  excerpt: {
    pl: string;
    en: string;
  };
  mainPostImage: {
    asset: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    } | null;
    alt: {
      pl: string;
      en: string;
    };
  };
  date: string;
}>;
// Variable: getPartnersQuery
// Query: *[_type == "partnersLogo"][0] {    sectionTitle {      en,      pl    },    partners[] {      name,      logo {        asset->{          _id,          url        }      },      hasWebsite,      url    }  }
export type GetPartnersQueryResult = {
  sectionTitle: {
    en: string;
    pl: string;
  };
  partners: Array<{
    name: string;
    logo: {
      asset: {
        _id: string;
        url: string | null;
      } | null;
    };
    hasWebsite: boolean | null;
    url: string | null;
  }>;
} | null;
// Variable: getNewsQuery
// Query: *[_type == "newsSinglePage"] | order(date desc) [$start...$end] {    _id,    title{pl,en},    slugPL,    slugEN,    excerpt{pl,en},    mainPostImage{      asset->{        _id,        url      },      alt{        pl,        en      }    },    date  }
export type GetNewsQueryResult = Array<{
  _id: string;
  title: {
    pl: string;
    en: string;
  };
  slugPL: Slug;
  slugEN: Slug;
  excerpt: {
    pl: string;
    en: string;
  };
  mainPostImage: {
    asset: {
      _id: string;
      url: string | null;
    } | null;
    alt: {
      pl: string;
      en: string;
    };
  };
  date: string;
}>;
// Variable: getSingleNewsQuery
// Query: *[_type == "newsSinglePage" && (slugEN.current == $slug || slugPL.current == $slug)][0] {    _id,    title{      pl,      en    },    excerpt{pl,en},    content{      pl,      en    },    mainPostImage {      asset->{        _id,        url      },      alt{        pl,        en      }    },    date  }
export type GetSingleNewsQueryResult = {
  _id: string;
  title: {
    pl: string;
    en: string;
  };
  excerpt: {
    pl: string;
    en: string;
  };
  content: {
    pl: NewsBlock | null;
    en: NewsBlock | null;
  } | null;
  mainPostImage: {
    asset: {
      _id: string;
      url: string | null;
    } | null;
    alt: {
      pl: string;
      en: string;
    };
  };
  date: string;
} | null;
// Variable: getTeamPageDataQuery
// Query: *[_type == "teamPage"][0] {    teamSliderImages[] {      asset->{        url,        _id,      }    },    goalkeepers[] {      _key,      firstName,      lastName,      number,      height,      weight,      stickHand,      isCaptain,      isAssistantCaptain,      photo {        asset->{          url,          _id        }      },      actionPhoto {        asset->{          url,          _id        }      }    },    defenders[] {      _key,      firstName,      lastName,      number,      height,      weight,      stickHand,      isCaptain,      isAssistantCaptain,      photo {        asset->{          url,          _id        }      },      actionPhoto {        asset->{          url,          _id        }      }    },    forwards[] {      _key,      firstName,      lastName,      number,      height,      weight,      stickHand,      isCaptain,      isAssistantCaptain,      photo {        asset->{          url,          _id        }      },      actionPhoto {        asset->{          url,          _id        }      }    }  }
export type GetTeamPageDataQueryResult = {
  teamSliderImages: Array<{
    asset: {
      url: string | null;
      _id: string;
    } | null;
  }>;
  goalkeepers: Array<{
    _key: string;
    firstName: string;
    lastName: string;
    number: number;
    height: string | null;
    weight: string | null;
    stickHand: "left" | "right" | null;
    isCaptain: boolean | null;
    isAssistantCaptain: boolean | null;
    photo: {
      asset: {
        url: string | null;
        _id: string;
      } | null;
    } | null;
    actionPhoto: {
      asset: {
        url: string | null;
        _id: string;
      } | null;
    } | null;
  }>;
  defenders: Array<{
    _key: string;
    firstName: string;
    lastName: string;
    number: number;
    height: string | null;
    weight: string | null;
    stickHand: "left" | "right" | null;
    isCaptain: boolean | null;
    isAssistantCaptain: boolean | null;
    photo: {
      asset: {
        url: string | null;
        _id: string;
      } | null;
    } | null;
    actionPhoto: {
      asset: {
        url: string | null;
        _id: string;
      } | null;
    } | null;
  }>;
  forwards: Array<{
    _key: string;
    firstName: string;
    lastName: string;
    number: number;
    height: string | null;
    weight: string | null;
    stickHand: "left" | "right" | null;
    isCaptain: boolean | null;
    isAssistantCaptain: boolean | null;
    photo: {
      asset: {
        url: string | null;
        _id: string;
      } | null;
    } | null;
    actionPhoto: {
      asset: {
        url: string | null;
        _id: string;
      } | null;
    } | null;
  }>;
} | null;
// Variable: getClubPageQuery
// Query: *[_type == "clubPage"][0] {    clubHistory {      pl,      en    },    titleIntroduction {      pl,      en    },    clubCrest {      pl,      en    },    sectionSummary {      pl,      en    }  }
export type GetClubPageQueryResult = {
  clubHistory: {
    pl: NewsBlock;
    en: NewsBlock;
  };
  titleIntroduction: {
    pl: string;
    en: string;
  };
  clubCrest: {
    pl: NewsBlock;
    en: NewsBlock;
  };
  sectionSummary: {
    pl: string;
    en: string;
  };
} | null;
// Variable: getContactPageQuery
// Query: *[_type == "contactPage"][0] {    contactOptions {      pl,      en    }  }
export type GetContactPageQueryResult = {
  contactOptions: {
    pl: NewsBlock;
    en: NewsBlock;
  };
} | null;
// Variable: getBecomePartnerPageQuery
// Query: *[_type == "becomePartnerPage"][0] {    becomePartnerDesc {      pl,      en    }  }
export type GetBecomePartnerPageQueryResult = {
  becomePartnerDesc: {
    pl: NewsBlock;
    en: NewsBlock;
  };
} | null;
// Variable: getAllYearsQuery
// Query: *[_type == "gameCalendar"] {    date  }
export type GetAllYearsQueryResult = Array<{
  date: string;
}>;
// Variable: getAllGamesByYearQuery
// Query: *[_type == "gameCalendar" && dateTime(date) >= dateTime($startDate) && dateTime(date) < dateTime($endDate)] | order(date asc) {  _id,  _type,  date,  location,  time,  gameType->{    _id,    name  },  firstTeam->{    _id,    name,    logo {      asset->{        _id,        url      }    }  },  secondTeam->{    _id,    name,    logo {      asset->{        _id,        url      }    }  },  isCompleted,  firstTeamGoals,  secondTeamGoals}
export type GetAllGamesByYearQueryResult = Array<{
  _id: string;
  _type: "gameCalendar";
  date: string;
  location: string;
  time: string;
  gameType: {
    _id: string;
    name: LocaleString;
  };
  firstTeam: {
    _id: string;
    name: string;
    logo: {
      asset: {
        _id: string;
        url: string | null;
      } | null;
    } | null;
  };
  secondTeam: {
    _id: string;
    name: string;
    logo: {
      asset: {
        _id: string;
        url: string | null;
      } | null;
    } | null;
  };
  isCompleted: boolean | null;
  firstTeamGoals: number | null;
  secondTeamGoals: number | null;
}>;

// Query TypeMap
import "@sanity/client";
declare module "@sanity/client" {
  interface SanityQueries {
    "{\n  \"pastGames\": *[_type == \"gameCalendar\" && dateTime(date) < dateTime(now())] | \n    order(date desc) [0...12] {\n      _id,\n      _type,\n      date,\n      location,\n      time,\n      gameType->{\n        _id,\n        name\n      },\n      firstTeam->{\n        _id,\n        name,\n        logo {\n          asset->{\n            _id,\n            url\n          }\n        }\n      },\n      secondTeam->{\n        _id,\n        name,\n        logo {\n          asset->{\n            _id,\n            url\n          }\n        }\n      },\n      isCompleted,\n      firstTeamGoals,\n      secondTeamGoals\n    },\n  \"futureGames\": *[_type == \"gameCalendar\" && dateTime(date) >= dateTime(now())] | \n    order(date asc) [0...12] {\n      _id,\n      _type,\n      date,\n      location,\n      time,\n      gameType->{\n        _id,\n        name\n      },\n      firstTeam->{\n        _id,\n        name,\n        logo {\n          asset->{\n            _id,\n            url\n          }\n        }\n      },\n      secondTeam->{\n        _id,\n        name,\n        logo {\n          asset->{\n            _id,\n            url\n          }\n        }\n      },\n      isCompleted,\n      firstTeamGoals,\n      secondTeamGoals\n    },\n  \"leagueTables\": *[_type == \"leagueTables\"] {\n    _id,\n    title,\n    logo {\n      asset->{\n        _id,\n        url\n      }\n    }\n  }\n}": GetGamesCalendarQueryResult;
    "\n  *[_type == \"leagueTablesOrder\"][0] {\n    tables[]-> {\n      _createdAt,\n      _updatedAt,\n      _id,\n      title,\n      logo {\n        asset->{\n          _id,\n          url\n        }\n      },\n      headers[] { \n        pl,\n        en\n      },\n      rows[] {\n        cells\n      }\n    }\n  }\n": GetLeagueTablesOrderQueryResult;
    "\n  *[_type == \"leagueTables\"] {\n    _createdAt,\n    _updatedAt,\n    _id,\n    title,\n    logo {\n      asset->{\n        _id,\n        url\n      }\n    },\n    headers[] { \n      pl,\n      en\n    },\n    rows[] {\n      cells\n    }\n  }\n": GetLeagueTablesQueryResult;
    "\n *[_type == \"homePage\"][0] {\n    aboutUsSection {\n      description{en, pl},\n      activePlayers{number, text{en, pl}},\n      gamePerSeasson{number, text{en, pl}},\n      trainingAtWeek{number, text{en, pl}},\n      leagueNumbers{number, text{en, pl}}\n    }\n}": GetHomePageAboutUsSectionQueryResult;
    "\n  *[_type == \"newsSinglePage\"] | order(date desc) [0..3] {\n      _id,\n      title{pl,en},\n      slugPL,\n      slugEN,\n      excerpt{pl,en},\n      mainPostImage{asset, alt{pl, en}},\n      date\n    }\n  ": GetHomePageLatestNewsQueryResult;
    "\n  *[_type == \"partnersLogo\"][0] {\n    sectionTitle {\n      en,\n      pl\n    },\n    partners[] {\n      name,\n      logo {\n        asset->{\n          _id,\n          url\n        }\n      },\n      hasWebsite,\n      url\n    }\n  }\n": GetPartnersQueryResult;
    "\n  *[_type == \"newsSinglePage\"] | order(date desc) [$start...$end] {\n    _id,\n    title{pl,en},\n    slugPL,\n    slugEN,\n    excerpt{pl,en},\n    mainPostImage{\n      asset->{\n        _id,\n        url\n      },\n      alt{\n        pl,\n        en\n      }\n    },\n    date\n  }\n": GetNewsQueryResult;
    "\n  *[_type == \"newsSinglePage\" && (slugEN.current == $slug || slugPL.current == $slug)][0] {\n    _id,\n    title{\n      pl,\n      en\n    },\n    excerpt{pl,en},\n    content{\n      pl,\n      en\n    },\n    mainPostImage {\n      asset->{\n        _id,\n        url\n      },\n      alt{\n        pl,\n        en\n      }\n    },\n    date\n  }\n": GetSingleNewsQueryResult;
    "\n  *[_type == \"teamPage\"][0] {\n    teamSliderImages[] {\n      asset->{\n        url,\n        _id,\n      }\n    },\n    goalkeepers[] {\n      _key,\n      firstName,\n      lastName,\n      number,\n      height,\n      weight,\n      stickHand,\n      isCaptain,\n      isAssistantCaptain,\n      photo {\n        asset->{\n          url,\n          _id\n        }\n      },\n      actionPhoto {\n        asset->{\n          url,\n          _id\n        }\n      }\n    },\n    defenders[] {\n      _key,\n      firstName,\n      lastName,\n      number,\n      height,\n      weight,\n      stickHand,\n      isCaptain,\n      isAssistantCaptain,\n      photo {\n        asset->{\n          url,\n          _id\n        }\n      },\n      actionPhoto {\n        asset->{\n          url,\n          _id\n        }\n      }\n    },\n    forwards[] {\n      _key,\n      firstName,\n      lastName,\n      number,\n      height,\n      weight,\n      stickHand,\n      isCaptain,\n      isAssistantCaptain,\n      photo {\n        asset->{\n          url,\n          _id\n        }\n      },\n      actionPhoto {\n        asset->{\n          url,\n          _id\n        }\n      }\n    }\n  }\n": GetTeamPageDataQueryResult;
    "\n  *[_type == \"clubPage\"][0] {\n    clubHistory {\n      pl,\n      en\n    },\n    titleIntroduction {\n      pl,\n      en\n    },\n    clubCrest {\n      pl,\n      en\n    },\n    sectionSummary {\n      pl,\n      en\n    }\n  }\n": GetClubPageQueryResult;
    "\n  *[_type == \"contactPage\"][0] {\n    contactOptions {\n      pl,\n      en\n    }\n  }\n": GetContactPageQueryResult;
    "\n  *[_type == \"becomePartnerPage\"][0] {\n    becomePartnerDesc {\n      pl,\n      en\n    }\n  }\n": GetBecomePartnerPageQueryResult;
    "\n  *[_type == \"gameCalendar\"] {\n    date\n  }\n": GetAllYearsQueryResult;
    "*[_type == \"gameCalendar\" && dateTime(date) >= dateTime($startDate) && dateTime(date) < dateTime($endDate)] | order(date asc) {\n  _id,\n  _type,\n  date,\n  location,\n  time,\n  gameType->{\n    _id,\n    name\n  },\n  firstTeam->{\n    _id,\n    name,\n    logo {\n      asset->{\n        _id,\n        url\n      }\n    }\n  },\n  secondTeam->{\n    _id,\n    name,\n    logo {\n      asset->{\n        _id,\n        url\n      }\n    }\n  },\n  isCompleted,\n  firstTeamGoals,\n  secondTeamGoals\n}": GetAllGamesByYearQueryResult;
  }
}
