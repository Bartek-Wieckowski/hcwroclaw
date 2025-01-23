import { defineField, defineArrayMember } from 'sanity';

export default defineArrayMember({
  type: 'object',
  name: 'player',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'number',
      title: 'Jersey Number',
      type: 'number',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'photo',
      title: 'Player Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'actionPhoto',
      title: 'Action Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'isCaptain',
      title: 'Team Captain',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isAssistantCaptain',
      title: 'Assistant Captain',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'height',
      title: 'Height (cm)',
      type: 'string',
    }),
    defineField({
      name: 'weight',
      title: 'Weight (kg)',
      type: 'string',
    }),
    defineField({
      name: 'stickHand',
      title: 'Stick Hand',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'lastName',
      subtitle: 'firstName',
      media: 'photo',
      number: 'number',
    },
    prepare({ title, subtitle, media, number }) {
      return {
        title: `${number} - ${title}`,
        subtitle: subtitle,
        media: media,
      };
    },
  },
});
