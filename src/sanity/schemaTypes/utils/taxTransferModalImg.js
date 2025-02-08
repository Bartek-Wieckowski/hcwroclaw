import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'taxTransferModalImg',
  title: 'Tax Transfer Modal Image',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
      description:
        'It will be visible when you click on the button on the page',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Image Tax Transfer Modal',
      };
    },
  },
});
