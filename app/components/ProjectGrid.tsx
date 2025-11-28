"use client"; // This tells Next.js this code runs in the browser

import { Project } from "../../types/Project";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  projects: Project[];
};

// Animation settings
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each card showing up
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 }, // Start 50px down and invisible
  visible: { opacity: 1, y: 0 }, // Slide up to original position
};

export default function ProjectGrid({ projects }: Props) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project: Project) => (
        <motion.div variants={cardVariants} key={project._id} whileHover={{ scale: 1.05 }}>
          <Link
            href={`/projects/${project.slug}`}
            className="block border-2 border-gray-500 rounded-lg p-1 hover:border-blue-500 transition shadow-lg"
          >
            {project.image && (
              <Image
                src={project.image}
                alt={project.name}
                width={750}
                height={300}
                className="object-cover rounded-lg border border-gray-500"
              />
            )}
            <div className="mt-2 font-extrabold bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
              {project.name}
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}