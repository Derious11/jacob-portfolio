import { getProject } from "@/sanity/sanity.utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Project({ params }: Props) {
  // 1. Fetch the slug from the URL
  const { slug } = await params;
  
  // 2. Fetch the data from Sanity
  const project = await getProject(slug);

  return (
    <div className="max-w-3xl mx-auto py-20 px-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-extrabold drop-shadow-md bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
          {project.name}
        </h1>
        
        {project.url && (
            <a
              href={project.url}
              title="View Original"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 rounded-lg text-gray-500 font-bold py-3 px-4 whitespace-nowrap hover:bg-pink-500 hover:text-pink-100 transition"
            >
              View Project
            </a>
        )}
      </header>

      {/* Image */}
      {project.image && (
        <div className="relative w-full h-96 mb-10">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover rounded-xl border-2 border-gray-700"
          />
        </div>
      )}

      {/* Content */}
      <div className="text-lg text-gray-700 mt-5 leading-relaxed">
        <PortableText value={project.content} />
      </div>
    </div>
  );
}