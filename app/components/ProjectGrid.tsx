"use client";

import { Project } from "../../types/Project";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import ProjectModal from "./ProjectModal"; // Import the new modal

type Props = {
  projects: Project[];
};

export default function ProjectGrid({ projects }: Props) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
        {projects.map((project) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedProject(project)}
            className="group cursor-pointer"
          >
            {/* IMAGE CONTAINER: Clean, no border, sharp corners */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100 mb-4">
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              
              {/* Overlay: Minimalist */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* INFO: Technical & Clean */}
            <div className="flex justify-between items-start border-t border-zinc-200 pt-3">
               <div>
                   <h3 className="font-oswald text-xl font-medium uppercase tracking-wide text-zinc-900 group-hover:text-blue-600 transition-colors">
                      {project.name}
                   </h3>
                   <p className="font-inter text-sm text-zinc-500 mt-1">
                      {/* Fallback to 'Storyboard' if no category exists */}
                      Storyboard Sequence
                   </p>
               </div>
               
               {/* Panel Count Badge */}
               <span className="font-mono text-xs text-zinc-400 border border-zinc-200 px-2 py-1 rounded">
                  {project.gallery ? project.gallery.length + 1 : 1} SHOTS
               </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* The Modal Component - Renders only when a project is selected */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}