"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const AutoSizedImage = ({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick?: () => void;
}) => {
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null
  );

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      setSize({ width: img.width, height: img.height });
    };
  }, [src]);

  if (!size) return <div className="w-full h-64 bg-gray-100" />;

  return (
    <div
      style={{ height: size.height, maxHeight: 700 }}
      className="relative overflow-hidden rounded "
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 400px"
      />
    </div>
  );
};

export default AutoSizedImage;
