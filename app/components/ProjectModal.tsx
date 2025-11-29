"use client";

import { Project } from "../../types/Project";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProjectModal({ project, isOpen, onClose }: Props) {
  // Combine the main cover image + the gallery into one simplified list
  const images = [project.image, ...(project.gallery || [])].filter(Boolean);
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- FIX: Define functions at the top with useCallback ---
  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // --- FIX: Keyboard Listener ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, nextImage, prevImage, onClose]); // <--- Added onClose here to satisfy linter

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      >
        {/* The Card Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()} // Clicking the card shouldn't close it
          className="relative w-full max-w-7xl h-[85vh] bg-zinc-900 rounded-xl overflow-hidden flex flex-col md:flex-row shadow-2xl border border-zinc-800"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-red-600 text-white rounded-full transition duration-200"
          >
            <X size={24} />
          </button>

          {/* LEFT SIDE: The Image Stage */}
          <div className="relative w-full md:w-3/4 h-2/3 md:h-full bg-black flex items-center justify-center group">
            <div className="relative w-full h-full p-4">
              <Image
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                fill
                className="object-contain" // Keeps the whole image visible
                priority
              />
            </div>

            {/* Navigation Arrows (Only show if multiple images) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 p-3 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition backdrop-blur-md opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 p-3 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition backdrop-blur-md opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            {/* Progress Bar (Instagram Style) */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
              <div
                className="h-full bg-blue-500 transition-all duration-300 ease-out"
                style={{
                  width: `${((currentIndex + 1) / images.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* RIGHT SIDE: Info Panel */}
          <div className="w-full md:w-1/4 h-1/3 md:h-full bg-zinc-900 text-white p-6 md:p-8 border-l border-zinc-800 flex flex-col">
            <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
            <p className="text-zinc-400 text-sm mb-6">
              Slide {currentIndex + 1} of {images.length}
            </p>

            <div className="flex-grow overflow-y-auto text-zinc-300 text-sm leading-relaxed mb-6">
              {/* This is a simple fallback for content since PortableText is complex in modals */}
              <p>
                Scroll through the storyboard sequence to see the narrative flow.
              </p>
            </div>

            {/* View PRoject Button */}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition text-center flex items-center justify-center gap-2"
              >
                {/* Logic: Use the selected text, or fallback to 'View Project' */}
                <span>{project.buttonText || "View Project"}</span>

                {/* Optional: Add a simple arrow icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}