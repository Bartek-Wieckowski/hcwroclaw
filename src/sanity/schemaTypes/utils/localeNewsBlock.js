import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'localeNewsBlock',
  title: 'Locale News Block',
  type: 'object',
  fields: [
    defineField({
      name: 'pl',
      title: 'Polish',
      type: 'newsBlock',
      validation: (Rule) =>
        Rule.custom((plContent, context) => {
          const enContent = context.parent?.en;
          if (!plContent?.length && !enContent?.length) {
            return true;
          }
          if (plContent?.length && !enContent?.length) {
            return 'If Polish content is provided, English content is required';
          }
          return true;
        }),
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'newsBlock',
      validation: (Rule) =>
        Rule.custom((enContent, context) => {
          const plContent = context.parent?.pl;
          if (!enContent?.length && !plContent?.length) {
            return true;
          }
          if (enContent?.length && !plContent?.length) {
            return 'If English content is provided, Polish content is required';
          }
          return true;
        }),
    }),
  ],
});
