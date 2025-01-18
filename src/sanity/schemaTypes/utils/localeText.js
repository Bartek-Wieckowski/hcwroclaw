import { defineType, defineField } from 'sanity';

export default defineType({
  title: 'Localized Text',
  name: 'localeText',
  type: 'object',
  fields: [
    defineField({
      title: 'Polski',
      name: 'pl',
      type: 'text',
    }),
    defineField({
      title: 'English',
      name: 'en',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      pl: 'pl',
      en: 'en',
    },
    prepare(selection) {
      const { pl, en } = selection;
      return {
        title: pl || en || 'No translation provided',
      };
    },
  },
});
