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
      "gallery": gallery[].asset->url,
      url,
      content
    }`,
    {},
    {next: { revalidate: 10 } }
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
      "gallery": gallery[].asset->url,
      url,
      buttonText,
      content
    }`,
    { slug }
  );
}

export async function getProfile() {
  return client.fetch(
    groq`*[_type == "profile"][0]{
      _id,
      fullName,
      headline,
      "profileImage": profileImage.asset->url,
      shortBio,
      fullBio,
      "resumeURL": resume.asset->url,
      socials
    }`
  );
  }