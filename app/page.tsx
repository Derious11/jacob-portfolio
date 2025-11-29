import { getProjects, getProfile } from "../sanity/sanity.utils";
import ProjectGrid from "./components/ProjectGrid";
// REMOVED unused 'Image' import to prevent build errors

export default async function Home() {
  const projects = await getProjects();
  const profile = await getProfile(); // Fetch profile for the hero section

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* 1. HERO SECTION: Big, Bold, Authority */}
      <section className="h-[80vh] flex flex-col justify-center px-6 max-w-7xl mx-auto border-b border-zinc-200">
        <h1 className="text-[12vw] leading-[0.85] font-oswald font-bold uppercase text-zinc-900 tracking-tighter mb-6">
          Visual <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Storyteller
          </span>
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <p className="max-w-md text-xl font-inter text-zinc-500 leading-relaxed">
            {/* FIX: Use the dynamic profile data instead of hardcoded string */}
            {profile.headline ||
              "I turn scripts into moving experiences. 2D Animator & Storyboard Artist available for studio and freelance work."}
          </p>

          {/* Social Proof / Status Pill */}
          <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full border border-green-200">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-bold text-green-800 tracking-wide uppercase">
              Open for Work
            </span>
          </div>
        </div>
      </section>

      {/* 2. THE WORK: "Selected Works" instead of "My Projects" */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex justify-between items-baseline mb-12">
          <h2 className="text-4xl font-oswald font-bold uppercase tracking-tight">
            Selected Works
          </h2>
          <span className="font-mono text-zinc-400 text-sm">
            2023 — PRESENT
          </span>
        </div>

        {/* Pass data to your grid component */}
        <ProjectGrid projects={projects} />
      </section>
    </div>
  );
}