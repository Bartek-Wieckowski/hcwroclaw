import { defineQuery } from 'next-sanity';

export const getGamesCalendarQuery = defineQuery(`{
  "pastGames": *[_type == "gameCalendar" && dateTime(date) < dateTime(now())] | 
    order(date desc) [0...12] {
      _id,
      _type,
      date,
      location,
      time,
      gameType->{
        _id,
        name
      },
      firstTeam->{
        _id,
        name,
        logo {
          asset->{
            _id,
            url
          }
        }
      },
      secondTeam->{
        _id,
        name,
        logo {
          asset->{
            _id,
            url
          }
        }
      },
      isCompleted,
      firstTeamGoals,
      secondTeamGoals
    },
  "futureGames": *[_type == "gameCalendar" && dateTime(date) >= dateTime(now())] | 
    order(date asc) [0...12] {
      _id,
      _type,
      date,
      location,
      time,
      gameType->{
        _id,
        name
      },
      firstTeam->{
        _id,
        name,
        logo {
          asset->{
            _id,
            url
          }
        }
      },
      secondTeam->{
        _id,
        name,
        logo {
          asset->{
            _id,
            url
          }
        }
      },
      isCompleted,
      firstTeamGoals,
      secondTeamGoals
    },
  "leagueTables": *[_type == "leagueTables"] {
    _id,
    title,
    logo {
      asset->{
        _id,
        url
      }
    }
  }
}`);

export const getLeagueTablesOrderQuery = defineQuery(`
  *[_type == "leagueTablesOrder"][0] {
    tables[]-> {
      _createdAt,
      _updatedAt,
      _id,
      title,
      logo {
        asset->{
          _id,
          url
        }
      },
      headers[] { 
        pl,
        en
      },
      rows[] {
        cells
      }
    }
  }
`);

export const getLeagueTablesQuery = defineQuery(`
  *[_type == "leagueTables"] {
    _createdAt,
    _updatedAt,
    _id,
    title,
    logo {
      asset->{
        _id,
        url
      }
    },
    headers[] { 
      pl,
      en
    },
    rows[] {
      cells
    }
  }
`);

export const getHomePageAboutUsSectionQuery = defineQuery(`
 *[_type == "homePage"][0] {
    aboutUsSection {
      description{en, pl},
      activePlayers{number, text{en, pl}},
      gamePerSeasson{number, text{en, pl}},
      trainingAtWeek{number, text{en, pl}},
      leagueNumbers{number, text{en, pl}}
    }
}`);

export const getHomePageLatestNewsQuery = defineQuery(`
  *[_type == "newsSinglePage"] | order(date desc) [0..3] {
      _id,
      title{pl,en},
      slugPL,
      slugEN,
      excerpt{pl,en},
      mainPostImage{asset, alt{pl, en}},
      date
    }
  `);

export const getPartnersQuery = defineQuery(`
  *[_type == "partnersLogo"][0] {
    sectionTitle {
      en,
      pl
    },
    partners[] {
      name,
      logo {
        asset->{
          _id,
          url
        }
      },
      hasWebsite,
      url
    }
  }
`);

export const getNewsQuery = defineQuery(`
  *[_type == "newsSinglePage"] | order(date desc) [$start...$end] {
    _id,
    title{pl,en},
    slugPL,
    slugEN,
    excerpt{pl,en},
    mainPostImage{
      asset->{
        _id,
        url
      },
      alt{
        pl,
        en
      }
    },
    date
  }
`);

export const getSingleNewsQuery = defineQuery(`
  *[_type == "newsSinglePage" && (slugEN.current == $slug || slugPL.current == $slug)][0] {
    _id,
    title{
      pl,
      en
    },
    excerpt{pl,en},
    content{
      pl,
      en
    },
    mainPostImage {
      asset->{
        _id,
        url
      },
      alt{
        pl,
        en
      }
    },
    date
  }
`);

export const getTeamPageDataQuery = defineQuery(`
  *[_type == "teamPage"][0] {
    teamSliderImages[] {
      asset->{
        url,
        _id,
      }
    },
    goalkeepers[] {
      _key,
      firstName,
      lastName,
      number,
      playerNickname,
      height,
      weight,
      stickHand,
      isCaptain,
      isAssistantCaptain,
      position,
      gamesPlayed,
      goalsAgainstAverage,
      savePercentage,
      photo {
        asset->{
          url,
          _id
        }
      },
      actionPhoto {
        asset->{
          url,
          _id
        }
      }
    },
    defenders[] {
      _key,
      firstName,
      lastName,
      number,
      playerNickname,
      height,
      weight,
      stickHand,
      isCaptain,
      isAssistantCaptain,
      position,
      gamesPlayed,
      goals,
      assists,
      photo {
        asset->{
          url,
          _id
        }
      },
      actionPhoto {
        asset->{
          url,
          _id
        }
      }
    },
    forwards[] {
      _key,
      firstName,
      lastName,
      number,
      playerNickname,
      height,
      weight,
      stickHand,
      isCaptain,
      isAssistantCaptain,
      position,
      gamesPlayed,
      goals,
      assists,
      photo {
        asset->{
          url,
          _id
        }
      },
      actionPhoto {
        asset->{
          url,
          _id
        }
      }
    }
  }
`);

export const getClubPageQuery = defineQuery(`
  *[_type == "clubPage"][0] {
    clubHistory {
      pl,
      en
    },
    titleIntroduction {
      pl,
      en
    },
    clubCrest {
      pl,
      en
    },
    sectionSummary {
      pl,
      en
    }
  }
`);

export const getContactPageQuery = defineQuery(`
  *[_type == "contactPage"][0] {
    contactOptions {
      pl,
      en
    }
  }
`);

export const getSupportPageQuery = defineQuery(`
  *[_type == "supportPage"][0] {
    supportDesc {
      pl,
      en
    }
  }
`);

export const getAllYearsQuery = defineQuery(`
  *[_type == "gameCalendar"] {
    date
  }
`);

export const getAllGamesByYearQuery =
  defineQuery(`*[_type == "gameCalendar" && dateTime(date) >= dateTime($startDate) && dateTime(date) < dateTime($endDate)] | order(date asc) {
  _id,
  _type,
  date,
  location,
  time,
  gameType->{
    _id,
    name
  },
  firstTeam->{
    _id,
    name,
    logo {
      asset->{
        _id,
        url
      }
    }
  },
  secondTeam->{
    _id,
    name,
    logo {
      asset->{
        _id,
        url
      }
    }
  },
  isCompleted,
  firstTeamGoals,
  secondTeamGoals
}`);

export const getInfoPageQuery = defineQuery(`
  *[_type == "infoPage"][0] {
    infoOptions {
      pl,
      en
    }
  }
`);

export const getTrainingsPageQuery = defineQuery(`
  *[_type == "trainingsPage"][0] {
    trainingsOptions {
      pl,
      en
    }
  }
`);

export const getGalleryPageQuery = defineQuery(`*[_type == "galleryPage"][0] {
  images[] {
    asset->{
      url
    }
  },
  seo
}`);

export const getTaxTransferModalImgQuery = defineQuery(`
  *[_type == "taxTransferModalImg"][0] {
    image {
      asset->{
        _id,
        url
      }
    }
  }
`);

export const getPlayersNextToTheFormQuery = defineQuery(`
  *[_type == "playersNextToTheForm"][0] {
    images[] {
      asset->{
        _id,
        url
      }
    }
  }
`);
