import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'newsSinglePage',
  title: 'News Single Page',
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
        },
        {
          name: 'desc',
          title: 'Meta description',
          type: 'localeString',
        },
      ],
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slugPL',
      title: 'Slug PL',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title.pl',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'slugEN',
      title: 'Slug EN',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title.en',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'Short description for news listing',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainPostImage',
      title: 'Main Post Image',
      type: 'image',
      validation: (Rule) =>
        Rule.required()
          .error('Main post image is required')
          .custom((value) => {
            if (!value?.asset?._ref) {
              return 'Image is required';
            }
            return true;
          }),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'localeString',
          validation: (Rule) =>
            Rule.required().error(
              'Alternative text is required for accessibility'
            ),
        }),
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localeNewsBlock',
      validation: (Rule) => Rule.required(),
    }),
  ],
  validation: (Rule) => Rule.required(),
  preview: {
    select: {
      title: 'title.pl',
      media: 'mainPostImage',
    },
  },
});
