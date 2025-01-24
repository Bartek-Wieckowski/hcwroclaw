import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'clubPage',
  title: 'Club Page',
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
            Rule.custom((value) => {
              if (!value) return true;
              if (value.pl && !value.en) {
                return 'If Polish translation is provided, English is also required';
              }
              if (value.en && !value.pl) {
                return 'If English translation is provided, Polish is also required';
              }
              if (value.pl?.length > 80 || value.en?.length > 80) {
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
            Rule.custom((value) => {
              if (!value) return true;
              if (value.pl && !value.en) {
                return 'If Polish translation is provided, English is also required';
              }
              if (value.en && !value.pl) {
                return 'If English translation is provided, Polish is also required';
              }
              if (value.pl?.length > 160 || value.en?.length > 160) {
                return 'Description must be less than 160 characters';
              }
              return true;
            }),
        },
      ],
    }),

    defineField({
      name: 'clubHistory',
      title: 'Club History',
      type: 'localeClubBlock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleIntroduction',
      title: 'Title Introduction',
      subtitle:
        'Introduction to the description of the coat of arms and colours',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clubCrest',
      title: 'Description of the club crest',
      type: 'localeClubBlock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sectionSummary',
      title: 'Section summary',
      subtitle: 'Summary of the section',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Club Page',
      };
    },
  },
});
