"use client";

import { Project } from "../../types/Project";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProjectModal({ project, isOpen, onClose }: Props) {
  const images = [project.image, ...(project.gallery || [])].filter(Boolean);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // SWIPE LOGIC
  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      prevImage();
    } else if (info.offset.x < -swipeThreshold) {
      nextImage();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, nextImage, prevImage, onClose]);

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
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
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
          <div className="relative w-full md:w-3/4 h-2/3 md:h-full bg-black flex items-center justify-center group overflow-hidden">
            {/* Draggable Area */}
            <motion.div 
                className="relative w-full h-full p-4 cursor-grab active:cursor-grabbing"
                drag="x" 
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={onDragEnd}
            >
              <Image
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                fill
                className="object-contain pointer-events-none" // prevents ghosting
                priority
              />
            </motion.div>

            {/* Navigation Arrows (HIDDEN ON MOBILE, VISIBLE ON DESKTOP) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  // CHANGE: 'hidden' by default, 'md:flex' on desktop
                  className="hidden md:flex absolute left-4 p-3 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition backdrop-blur-md items-center justify-center opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={nextImage}
                  // CHANGE: 'hidden' by default, 'md:flex' on desktop
                  className="hidden md:flex absolute right-4 p-3 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition backdrop-blur-md items-center justify-center opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            {/* Progress Bar (Visual Cue for Sequence) */}
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
              {/* Updated instructions */}
              <p>
                <span className="md:hidden">Swipe left or right</span>
                <span className="hidden md:inline">Use arrow keys</span>
                {" "}to view the sequence.
              </p>
            </div>

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition text-center flex items-center justify-center gap-2"
              >
                <span>{project.buttonText || "View Project"}</span>
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}