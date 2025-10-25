import { defineType, defineField } from "sanity";

export default defineType({
  name: "newsSinglePage",
  title: "News Single Page",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "SEO settings",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Meta title",
          type: "localeString",
          validation: (Rule) =>
            Rule.custom((value) => {
              if (!value) return true;
              if (value.pl && !value.en) {
                return "If Polish translation is provided, English is also required";
              }
              if (value.en && !value.pl) {
                return "If English translation is provided, Polish is also required";
              }
              if (value.pl?.length > 80 || value.en?.length > 80) {
                return "Title must be less than 80 characters";
              }
              return true;
            }),
        },
        {
          name: "desc",
          title: "Meta description",
          type: "localeString",
          validation: (Rule) =>
            Rule.custom((value) => {
              if (!value) return true;
              if (value.pl && !value.en) {
                return "If Polish translation is provided, English is also required";
              }
              if (value.en && !value.pl) {
                return "If English translation is provided, Polish is also required";
              }
              if (value.pl?.length > 160 || value.en?.length > 160) {
                return "Description must be less than 160 characters";
              }
              return true;
            }),
        },
      ],
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "News Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slugPL",
      title: "Slug PL",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title.pl",
        maxLength: 96,
      },
    }),
    defineField({
      name: "slugEN",
      title: "Slug EN",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title.en",
        maxLength: 96,
      },
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "Short description for news listing",
      type: "localeText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainPostImage",
      title: "Main Post Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.required()
          .error("Main post image is required")
          .custom((value) => {
            if (!value?.asset?._ref) {
              return "Image is required";
            }
            return true;
          }),
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "localeString",
          validation: (Rule) =>
            Rule.required().error(
              "Alternative text is required for accessibility"
            ),
        }),
      ],
    }),
    defineField({
      name: "imageAspectRatio",
      title: "Image Aspect Ratio",
      type: "string",
      options: {
        list: [
          { title: "16:9 - szeroki prostokąt", value: "16/9" },
          { title: "1:.85 - prawie kwadrat", value: "1/.85" },
        ],
        layout: "radio",
      },
      initialValue: "16/9",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imageObjectFit",
      title: "Image Object Fit",
      type: "string",
      options: {
        list: [
          {
            title:
              "Cover — przycina obraz tak, żeby cały kontener był wypełniony, ale część obrazu może zostać ucięta",
            value: "cover",
          },
          {
            title: "Contain — cały obraz widoczny, mogą zostać puste marginesy",
            value: "contain",
          },
        ],
        layout: "radio",
      },
      initialValue: "cover",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "localeNewsBlock",
    }),
  ],
  validation: (Rule) => Rule.required(),
  preview: {
    select: {
      title: "title.pl",
      media: "mainPostImage",
    },
  },
});
