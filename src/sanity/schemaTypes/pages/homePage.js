import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO settings',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Meta title',
          type: 'localeString',
          validation: (Rule) =>
            Rule.required().custom((value) => {
              if (!value?.pl || !value?.en) {
                return 'Both Polish and English translations are required';
              }
              if (value.pl.length > 80 || value.en.length > 80) {
                return 'Title must be less than 80 characters';
              }
              return true;
            }),
        },
        {
          name: 'desc',
          title: 'Meta description',
          type: 'localeString',
          validation: (Rule) =>
            Rule.required().custom((value) => {
              if (!value?.pl || !value?.en) {
                return 'Both Polish and English translations are required';
              }
              if (value.pl.length > 160 || value.en.length > 160) {
                return 'Description must be less than 160 characters';
              }
              return true;
            }),
        },
      ],
    }),
    defineField({
      name: 'meetClubModule',
      title: 'Meet Club Module',
      type: 'object',
      fields: [
        // defineField({
        //   name: 'title',
        //   title: 'Title',
        //   type: 'localeString',
        //   validation: (Rule) => Rule.required(),
        // }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'localeText',
        }),
        defineField({
          name: 'activePlayers',
          title: 'Active Players Module',
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'number',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'text',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
        defineField({
          name: 'gamePerSeasson',
          title: 'Game Per Season Module',
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'number',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'text',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
        defineField({
          name: 'trainingAtWeek',
          title: 'Training At Week Module',
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'number',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'text',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
        defineField({
          name: 'leagueNumbers',
          title: 'League Numbers Module',
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'number',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'text',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page',
      };
    },
  },
});
