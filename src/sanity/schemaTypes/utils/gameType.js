import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'gameType',
  title: 'Game Type',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description:
        'Enter game type (e.g. Liga, Sparing, Turniej, Turniej "skrót nazwy" etc.)',
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
});
