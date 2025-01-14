import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'gameCalendar',
  title: 'Game Calendar',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: 'Game Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gameType',
      title: 'Game Type',
      type: 'reference',
      to: [{ type: 'gameType' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Game Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Game Time',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Please enter the time in HH:mm format (e.g., 19:00)',
    }),
    defineField({
      name: 'firstTeam',
      title: 'First Team',
      type: 'reference',
      to: [{ type: 'team' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondTeam',
      title: 'Second Team',
      type: 'reference',
      to: [{ type: 'team' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isCompleted',
      title: 'Is Game Completed?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'firstTeamGoals',
      title: 'First Team Goals',
      type: 'number',
      hidden: ({ parent }) => !parent?.isCompleted,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            context.document?.isCompleted &&
            (value === undefined || value === null)
          ) {
            return 'Goals are required for completed games';
          }
          return true;
        }).min(0),
    }),
    defineField({
      name: 'secondTeamGoals',
      title: 'Second Team Goals',
      type: 'number',
      hidden: ({ parent }) => !parent?.isCompleted,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            context.document?.isCompleted &&
            (value === undefined || value === null)
          ) {
            return 'Goals are required for completed games';
          }
          return true;
        }).min(0),
    }),
  ],
  preview: {
    select: {
      title: 'date',
      team1: 'firstTeam.name',
      team2: 'secondTeam.name',
      goals1: 'firstTeamGoals',
      goals2: 'secondTeamGoals',
      isCompleted: 'isCompleted',
    },
    prepare({ title, team1, team2, goals1, goals2, isCompleted }) {
      const date = new Date(title).toLocaleDateString();
      const score = isCompleted ? ` (${goals1} - ${goals2})` : ' (Upcoming)';
      return {
        title: `${date}: ${team1} vs ${team2}${score}`,
      };
    },
  },
});
