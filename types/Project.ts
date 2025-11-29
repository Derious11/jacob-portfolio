// types/Project.ts
import { PortableTextBlock } from "sanity";

export type Project = {
  _id: string;
  _createdAt: Date;
  name: string;
  slug: string;
  image: string;
  gallery: string[];
  url: string;
  buttonText: string;
  content: PortableTextBlock[];
};