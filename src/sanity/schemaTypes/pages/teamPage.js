import { defineType, defineField, defineArrayMember } from 'sanity';
import playerSchema from '../utils/player';

export default defineType({
  name: 'teamPage',
  title: 'Team Page',
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
      name: 'teamSliderImages',
      title: 'Team Slider Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(6),
    }),

    defineField({
      name: 'goalkeepers',
      title: 'Goalkeepers',
      type: 'array',
      of: [playerSchema],
      validation: (Rule) =>
        Rule.required().min(1).error('You must add at least one goalkeeper.'),
    }),

    defineField({
      name: 'defenders',
      title: 'Defenders',
      type: 'array',
      of: [playerSchema],
      validation: (Rule) =>
        Rule.required().min(1).error('You must add at least one defender.'),
    }),

    defineField({
      name: 'forwards',
      title: 'Forwards',
      type: 'array',
      of: [playerSchema],
      validation: (Rule) =>
        Rule.required().min(1).error('You must add at least one forward.'),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Team Page',
      };
    },
  },
});
