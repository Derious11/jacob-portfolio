// sanity/schemas/project.ts

const project = {
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    },
    {
      name: "url",
      title: "URL",
      type: "url",
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "gallery",
      title: "Storyboard Gallery",
      type: "array",
      of: [{ type: "image" }],
      options: {
        layout: 'grid'
    },
    },
    {
  name: "buttonText",
  title: "Button Label",
  type: "string",
  options: {
    list: [
      { title: "Watch Video", value: "Watch Video" },
      { title: "Visit Store", value: "Visit Store" },
      { title: "Read Comic", value: "Read Comic" },
      { title: "View Live Project", value: "View Live Project" },
    ],
  },
  description: "What should the link button say? (Requires a URL to appear)",
},
  ],
};

export default project;