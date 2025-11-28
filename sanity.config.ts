import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import project from './sanity/schemas/project';

const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  title: "Jacob Clement Studio",
  apiVersion: "2023-07-16",
  basePath: "/studio",
  plugins: [deskTool()],
  schema: { types: [project] },
});

export default config;