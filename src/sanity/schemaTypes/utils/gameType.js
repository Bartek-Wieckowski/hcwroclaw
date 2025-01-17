import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'gameType',
  title: 'Game Type',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'localeString',
      description:
        'Enter game type (e.g. Liga, Sparing, Turniej, Turniej "skrót nazwy" etc.)',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value?.pl || !value?.en) {
            return 'Both Polish and English translations are required';
          }
          if (
            value.pl.length < 2 ||
            value.pl.length > 50 ||
            value.en.length < 2 ||
            value.en.length > 50
          ) {
            return 'Translations must be between 2 and 50 characters';
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare(selection) {
      const { name } = selection;
      return {
        title: name?.pl || name?.en || 'No name provided',
      };
    },
  },
});
