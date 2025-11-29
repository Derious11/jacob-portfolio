import { getProfile } from "@/sanity/sanity.utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export default async function About() {
  const profile = await getProfile();

  return (
    // ADDED: 'bg-white text-zinc-900 min-h-screen'
    // This forces light mode colors regardless of phone settings
    <div className="max-w-4xl mx-auto py-20 px-6 bg-white text-zinc-900 min-h-screen">
      <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
        
        {/* Profile Image */}
        <div className="relative w-64 h-64 flex-shrink-0">
            {profile.profileImage && (
                <Image
                src={profile.profileImage}
                alt={profile.fullName}
                fill
                className="object-cover object-top rounded-full border-4 border-gray-800 shadow-xl"
                />
            )}
        </div>

        {/* Headline & Resume Button */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">{profile.fullName}</h1>
          <p className="text-2xl text-blue-600 font-medium mb-6">{profile.headline}</p>
          
          <div className="flex gap-4 justify-center md:justify-start">
            {profile.resumeURL && (
                <a 
                    href={profile.resumeURL} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700 transition flex items-center gap-2"
                >
                    📄 Download Resume
                </a>
            )}
            <a 
                href={`mailto:jacob.clement00@gmail.com`}
                className="border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
                Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* Bio Content */}
      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">About Me</h3>
        <PortableText value={profile.fullBio} />
      </div>
    </div>
  );
}