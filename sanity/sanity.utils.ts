import { createClient, groq } from "next-sanity";
import client from "./sanity.client";

// Function 1: Get ALL projects (For the Homepage)
export async function getProjects() {
  return client.fetch(
    groq`*[_type == "project"]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      url,
      content
    }`
  );
}

// Function 2: Get ONE project (For the Detail Page)
export async function getProject(slug: string) {
  return client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      url,
      content
    }`,
    { slug }
  );
}