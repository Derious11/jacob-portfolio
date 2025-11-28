import { getProjects } from "../sanity/sanity.utils";
import ProjectGrid from "./components/ProjectGrid"; // Import the new component

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="max-w-5xl mx-auto py-20 px-6">
      <h1 className="text-7xl font-extrabold text-gray-900 mb-12">
        Hello I&apos;m <span className="text-blue-600">Jacob</span>!
      </h1>

      <h2 className="text-3xl font-bold text-gray-700 mb-8">My Projects</h2>

      {/* Pass the data to the client component */}
      <ProjectGrid projects={projects} />
    </div>
  );
}