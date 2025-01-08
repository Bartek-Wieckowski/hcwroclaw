import { defineQuery } from 'next-sanity';

export const getGamesCalendarQuery = defineQuery(`
  *[_type == "gameCalendar"] | order(date asc) {
    _id,
    _type,
    date,
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
