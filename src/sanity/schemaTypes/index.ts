import { type SchemaTypeDefinition } from 'sanity';

import localeString from './utils/localeString';
import localeText from './utils/localeText';
import localeNewsBlock from './utils/localeNewsBlock';

// PAGES
import homePage from './pages/homePage';
import newsSinglePage from './pages/newsSinglePage';
import teamPage from './pages/teamPage';

// MODULES
import team from './utils/team';
import gameType from './utils/gameType';
import gameCalendar from './utils/gameCalendar';
import leagueTables from './utils/leagueTables';
import newsBlock from './utils/newsBlock';
import ytEmbedd from './utils/ytEmbedd';
import partnersLogo from './utils/partnersLogo';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    localeString,
    localeText,
    localeNewsBlock,
    homePage,
    newsSinglePage,
    teamPage,
    team,
    gameType,
    gameCalendar,
    leagueTables,
    newsBlock,
    ytEmbedd,
    partnersLogo,
  ],
};
