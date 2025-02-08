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
      name: 'playerNickname',
      title: 'Player Nickname',
      type: 'string',
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
    defineField({
      name: 'position',
      title: 'Position',
      subtitle:
        'Check the position to have the correct inputs to enter in the statistics',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: 'Player', value: 'player' },
          { title: 'Goalkeeper', value: 'goalkeeper' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gamesPlayed',
      title: 'Games Played (GP)',
      type: 'number',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'goals',
      title: 'Goals (G)',
      type: 'number',
      hidden: ({ parent }) => parent?.position === 'goalkeeper',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'assists',
      title: 'Assists (A)',
      type: 'number',
      hidden: ({ parent }) => parent?.position === 'goalkeeper',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'goalsAgainstAverage',
      title: 'Goals Against Average (GAA)',
      type: 'number',
      hidden: ({ parent }) => parent?.position === 'player',
      validation: (Rule) => Rule.min(0).precision(2),
    }),
    defineField({
      name: 'savePercentage',
      title: 'Save Percentage (SVS%)',
      type: 'number',
      hidden: ({ parent }) => parent?.position === 'player',
      validation: (Rule) => Rule.min(0).max(100).precision(1),
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
