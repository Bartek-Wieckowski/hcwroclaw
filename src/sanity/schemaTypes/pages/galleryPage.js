import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'galleryPage',
  title: 'Gallery Page',
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
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) =>
        Rule.max(10).error('Maximum 10 images allowed in the gallery'),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Gallery Page',
      };
    },
  },
});
