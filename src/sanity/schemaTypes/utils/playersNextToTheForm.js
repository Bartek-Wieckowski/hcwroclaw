import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'playersNextToTheForm',
  title:
    'Players Next To The Form (Preferably every player should be cut out of the background)',
  type: 'document',
  fields: [
    defineField({
      name: 'images',
      title: 'Players Next To The Form Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.max(4).error('Maximum 4 images allowed'),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Players Next To The Form',
      };
    },
  },
});
