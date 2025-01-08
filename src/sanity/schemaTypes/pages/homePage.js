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
          type: 'string',
          validation: (Rule) => Rule.max(80),
        },
        {
          name: 'desc',
          title: 'Meta description',
          type: 'string',
          validation: (Rule) => Rule.max(160),
        },
      ],
    }),
  ],
});
