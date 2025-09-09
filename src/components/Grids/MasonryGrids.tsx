'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const images = [
  '/assets/images/projects/17-1200x600.jpg',
  '/assets/images/projects/50-400x600.jpg',
  '/assets/images/projects/70-1920x1080.jpg',
  '/assets/images/projects/250-500x550.jpg',
  '/assets/images/projects/257-640x480.jpg',
  '/assets/images/projects/273-800x800.jpg',
  '/assets/images/projects/439-300x450.jpg',
  '/assets/images/projects/441-1440x810.jpg',
  '/assets/images/projects/487-1280x960.jpg',
  '/assets/images/projects/521-800x600.jpg',
  '/assets/images/projects/586-700x850.jpg',
  '/assets/images/projects/627-960x540.jpg',
  '/assets/images/projects/804-1024x576.jpg',
  '/assets/images/projects/838-1280x800.jpg',
  '/assets/images/projects/866-640x360.jpg',
  '/assets/images/projects/939-600x600.jpg',
  '/assets/images/projects/954-1024x768.jpg',
  '/assets/images/projects/997-1080x720.jpg',
  '/assets/images/projects/1000-1280x720.jpg',
  '/assets/images/projects/1060-800x400.jpg',
  '/assets/images/projects/1065-600x800.jpg',
  '/assets/images/projects/1066-450x600.jpg',
  '/assets/images/projects/279-900x300.jpg',
];

export default function MasonryGallery() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="min-h-screen px-4 py-20 md:px-6">
      <div className="columns-1 gap-4 space-y-4 transition-all sm:columns-2 md:columns-3 lg:columns-4">
        {images.map((src, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 ease-in-out"
          >
            <motion.img
              src={src}
              alt={`Random ${index}`}
              className={`w-full rounded-lg object-cover transition-all duration-300 ease-in-out ${
                hovered === null
                  ? 'blur-0 scale-100'
                  : hovered === index
                    ? 'blur-0 scale-105'
                    : 'blur-xs'
              }`}
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
