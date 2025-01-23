import { defineType, defineArrayMember, defineField } from 'sanity';
import { ImageIcon } from '@sanity/icons';

export default defineType({
  name: 'newsBlock',
  title: 'News Block',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [{ title: 'Bullet Lists', value: 'bullet' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            title: 'Link',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'Link Type',
                name: 'linkType',
                type: 'string',
                options: {
                  list: [
                    { title: 'External URL', value: 'external' },
                    { title: 'Internal Route', value: 'internal' }
                  ]
                },
                initialValue: 'external'
              },
              {
                title: 'URL',
                name: 'href',
                type: 'string',
                validation: Rule => Rule.custom((href, context) => {
                  if (!href) return 'URL is required';
                  
                  const linkType = context.parent?.linkType;
                  
                  if (linkType === 'external') {
                    try {
                      new URL(href);
                      if (!href.startsWith('http')) {
                        return 'External URL must start with http:// or https://';
                      }
                    } catch {
                      return 'Please enter a valid URL';
                    }
                  }
                  
                  return true;
                })
              }
            ]
          }
        ]
      }
    }),
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) =>
            Rule.required().error(
              'Alternative text is required for accessibility'
            ),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineArrayMember({
      type: 'youtube',
    }),
    defineArrayMember({
      name: 'textWithImage',
      type: 'object',
      title: 'Text next to image',
      fields: [
        defineField({
          name: 'text',
          type: 'text',
          title: 'Text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'image',
          type: 'image',
          title: 'Image',
          options: { hotspot: true },
          validation: (Rule) => Rule.required(),
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: (Rule) =>
                Rule.required().error(
                  'Alternative text is required for accessibility'
                ),
            },
          ],
        }),
      ],
      preview: {
        select: {
          title: 'text',
          media: 'image',
        },
      },
    }),
  ],
});
