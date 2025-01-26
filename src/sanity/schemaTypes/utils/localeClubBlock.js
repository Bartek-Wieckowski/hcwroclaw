import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'localeClubBlock',
  title: 'Locale Club Block',
  type: 'object',
  fields: [
    defineField({
      name: 'pl',
      title: 'Polish',
      type: 'newsBlock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'newsBlock',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
