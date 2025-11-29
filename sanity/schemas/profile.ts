import { defineField, defineType } from "sanity";

export default defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "In one short sentence, what do you do?",
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }
      ]
    }),
    defineField({
      name: "shortBio",
      title: "Short Bio",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "fullBio",
      title: "Full Bio",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "resume",
      title: "Resume (PDF)",
      type: "file",
      description: "Upload your PDF resume here",
    }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "linkedin", title: "LinkedIn URL", type: "url" },
        { name: "twitter", title: "Twitter URL", type: "url" },
        { name: "instagram", title: "Instagram URL", type: "url" },
      ]
    }),
  ],
});