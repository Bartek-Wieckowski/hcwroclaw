import { type SchemaTypeDefinition } from 'sanity';

import localeString from './utils/localeString';
import localeText from './utils/localeText';

// PAGES
import homePage from './pages/homePage';

// MODULES
import team from './utils/team';
import gameType from './utils/gameType';
import gameCalendar from './utils/gameCalendar';
import leagueTables from "./utils/leagueTables"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [localeString, localeText, homePage, team, gameType, gameCalendar, leagueTables],
};
