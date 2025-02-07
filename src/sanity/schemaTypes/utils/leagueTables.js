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
      name: 'logo',
      title: 'League Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description:
        'To better look. Please provide a logo without a background.',
    }),
    defineField({
      name: 'headers',
      title: 'Column Headers',
      type: 'array',
      of: [
        {
          type: 'localeString',
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error('At least one column header is required.')
          .custom((headers) => {
            if (!headers) return true;
            const hasEmptyValues = headers.some(
              (header) => !header.pl || !header.en
            );
            if (hasEmptyValues) {
              return 'All headers must have both Polish and English translations';
            }
            return true;
          }),
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        {
          name: 'row',
          title: 'Row',
          type: 'object',
          fields: [
            {
              name: 'cells',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule) =>
                Rule.required()
                  .min(1)
                  .custom((cells) => {
                    if (!cells) return true;
                    const hasEmptyValues = cells.some(
                      (cell) => !cell || cell.trim() === ''
                    );
                    if (hasEmptyValues) {
                      return 'All cells in a row must have a value';
                    }
                    return true;
                  }),
            },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error('At least one row is required.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo',
    },
    prepare({ title, media }) {
      return {
        title: title || 'League',
        media: media,
      };
    },
  },
});
