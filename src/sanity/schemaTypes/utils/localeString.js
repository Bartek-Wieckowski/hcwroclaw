import { defineType, defineField } from 'sanity';

export default defineType({
  title: 'Localized String',
  name: 'localeString',
  type: 'object',
  fields: [
    defineField({
      title: 'Polski',
      name: 'pl',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'English',
      name: 'en',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
