"use client";

import Image from "next/image";
import { useState } from "react";

type ImageWithSkeletonProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export function ImageWithSkeleton({
  src,
  alt,
  width,
  height,
  className,
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-full w-full">
      {!loaded ? <div className="absolute inset-0 animate-pulse rounded-lg bg-slate/60" /> : null}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className ?? ""} ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
