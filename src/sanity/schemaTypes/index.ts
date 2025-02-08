import { type SchemaTypeDefinition } from 'sanity';

import localeString from './utils/localeString';
import localeText from './utils/localeText';
import localeNewsBlock from './utils/localeNewsBlock';
import localeClubBlock from './utils/localeClubBlock';

// PAGES
import homePage from './pages/homePage';
import newsSinglePage from './pages/newsSinglePage';
import teamPage from './pages/teamPage';
import clubPage from './pages/clubPage';
import contactPage from './pages/contactPage';
import supportPage from './pages/supportPage';

// MODULES
import team from './utils/team';
import gameType from './utils/gameType';
import gameCalendar from './utils/gameCalendar';
import leagueTables from './utils/leagueTables';
import leagueTablesOrder from './utils/leagueTablesOrder';
import newsBlock from './utils/newsBlock';
import ytEmbedd from './utils/ytEmbedd';
import partnersLogo from './utils/partnersLogo';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    localeString,
    localeText,
    localeNewsBlock,
    localeClubBlock,
    homePage,
    newsSinglePage,
    clubPage,
    teamPage,
    contactPage,
    supportPage,
    team,
    gameType,
    gameCalendar,
    leagueTables,
    leagueTablesOrder,
    newsBlock,
    ytEmbedd,
    partnersLogo,
  ],
};
