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
    }
}`);

export const getLeagueTablesQuery = defineQuery(`
  *[_type == "leagueTables"] {
    _createdAt,
    _updatedAt,
    _id,
    title,
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
 *[_type == "homePage"]{
    aboutUsSection {
      description{en, pl},
      activePlayers{number, text{en, pl}},
      gamePerSeasson{number, text{en, pl}},
      trainingAtWeek{number, text{en, pl}},
      leagueNumbers{number, text{en, pl}}
    }
}`);

export const getHomePageLatestNewsQuery = defineQuery(`
  *[_type == "newsSinglePage"] | order(_createdAt desc) [0..3] {
      _id,
      title{pl,en},
      slugPL,
      slugEN,
      excerpt{pl,en},
      mainPostImage{asset, alt{pl, en}},
      _createdAt
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
        asset-> {
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      },
      hasWebsite,
      url
    }
  }
`);

export const getNewsQuery = defineQuery(`
  *[_type == "newsSinglePage"] | order(_createdAt desc) [$start...$end] {
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
    _createdAt
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
    _createdAt
  }
`);
