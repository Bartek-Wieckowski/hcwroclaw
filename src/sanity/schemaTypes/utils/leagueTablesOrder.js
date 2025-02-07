import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'leagueTablesOrder',
  title: 'League Tables Order',
  type: 'document',
  fields: [
    defineField({
      name: 'tables',
      title: 'Tables Order',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'leagueTables' }],
          options: {
            disableNew: true,
          },
        },
      ],
      validation: (Rule) =>
        Rule.required().unique().min(1).error('At least one table is required'),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'League Tables Order',
      };
    },
  },
});
