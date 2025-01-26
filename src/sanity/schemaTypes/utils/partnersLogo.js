import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'partnersLogo',
  title: 'Partners Section',
  type: 'document',
  validation: (Rule) => Rule.required(),
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'partners',
      title: 'Partners List',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'partner',
          title: 'Partner',
          fields: [
            defineField({
              name: 'name',
              title: 'Company Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Company Logo',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'hasWebsite',
              title: 'Add Website Link?',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'url',
              title: 'Website URL',
              type: 'url',
              hidden: ({ parent }) => !parent?.hasWebsite,
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const { parent } = context;
                  if (parent?.hasWebsite && !value) {
                    return 'Website URL is required when "Add Website Link" is enabled';
                  }
                  if (value && !value.startsWith('https://')) {
                    return 'URL must start with https://';
                  }
                  return true;
                }),
            }),
          ],
          validation: (Rule) => Rule.required(),
          preview: {
            select: {
              title: 'name',
              media: 'logo',
            },
            prepare({ title, media }) {
              return {
                title: title || 'No name set',
                media: media,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required(),
      options: {
        layout: 'grid',
      },
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle.en',
      subtitle: 'partners.length',
    },
    prepare({ title }) {
      return {
        title: title || 'Partners Section',
      };
    },
  },
});
