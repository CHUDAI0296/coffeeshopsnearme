'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function ImageCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=800&fit=crop',
      alt: 'Neckar Coffee Shop Interior',
      description: 'Cozy interior of our coffee shop'
    },
    {
      src: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200&h=800&fit=crop',
      alt: 'Coffee Bar',
      description: 'Our professional coffee bar'
    },
    {
      src: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1200&h=800&fit=crop',
      alt: 'Outdoor Seating',
      description: 'Comfortable outdoor seating area'
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
      <div className="relative h-full">
        <Image
          src={images[currentImageIndex].src}
          alt={images[currentImageIndex].alt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
          <p className="text-lg">{images[currentImageIndex].description}</p>
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2"
      >
        <FaChevronLeft className="text-gray-800" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2"
      >
        <FaChevronRight className="text-gray-800" />
      </button>
      
      {/* Image Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 