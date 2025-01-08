import { type SchemaTypeDefinition } from 'sanity';

// PAGES
import homePage from './pages/homePage';

// MODULES
import team from './utils/team';
import gameType from './utils/gameType';
import gameCalendar from './utils/gameCalendar';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, team, gameType, gameCalendar],
};
