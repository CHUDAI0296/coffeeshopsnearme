"use client";
import React, { useState } from "react";

interface ShopImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ShopImage({ src, alt, className }: ShopImageProps) {
  const defaultImg = "/default-image.jpg";
  const validSrc = src && src.trim() !== '' ? src : defaultImg;
  const [imgSrc, setImgSrc] = useState(validSrc);
  const [error, setError] = useState(false);
  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (!error) {
          setImgSrc(defaultImg);
          setError(true);
        }
      }}
    />
  );
} 