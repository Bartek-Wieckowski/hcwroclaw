import { defineType, defineField } from 'sanity';
import Table from '../../components/Table';

export default defineType({
  name: 'leagueTables',
  title: 'Table',
  type: 'document',
  components: {
    input: Table,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Table Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headers',
      title: 'Column Headers',
      type: 'array',
      of: [{
        type: 'localeString'
      }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [{
        name: 'row',
        title: 'Row',
        type: 'object',
        fields: [
          {
            name: 'cells',
            type: 'array',
            of: [{ type: 'string' }],
          },
        ],
      }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title,  }) {
      return {
        title: title || 'League',
      };
    },
  },
});
