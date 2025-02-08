import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'supportPage',
  title: 'Support Page',
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
      name: 'supportDesc',
      title: 'Become Support Description',
      type: 'localeClubBlock',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Become Support Page',
      };
    },
  },
});
