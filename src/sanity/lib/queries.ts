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
