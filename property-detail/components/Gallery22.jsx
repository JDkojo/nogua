"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@relume_io/relume-ui";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

const PROPERTY_GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=700&q=80&auto=format&fit=crop",
    alt: "Spacious living room with floor-to-ceiling windows",
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80&auto=format&fit=crop",
    alt: "Modern open-plan kitchen with island",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=700&q=80&auto=format&fit=crop",
    alt: "Master bedroom with en-suite access",
  },
  {
    src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=700&q=80&auto=format&fit=crop",
    alt: "Luxury bathroom with freestanding bath",
  },
  {
    src: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=700&q=80&auto=format&fit=crop",
    alt: "Private pool and outdoor entertaining area",
  },
  {
    src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=700&q=80&auto=format&fit=crop",
    alt: "Formal dining room with natural light",
  },
];

const useCarousel = () => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  const handleDotClick = (index) => () => api && api.scrollTo(index);

  const dotClassName = (index) =>
    clsx("mx-[3px] inline-block size-2 rounded-full", {
      "bg-black": current === index + 1,
      "bg-neutral-light": current !== index + 1,
    });

  return { api, setApi, handleDotClick, dotClassName };
};

export function Gallery22() {
  const carouselState = useCarousel();
  return (
    <section
      id="relume"
      className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28"
    >
      <div className="container">
        <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Property gallery
          </h2>
          <p className="md:text-md">
            Browse high-resolution images of every room
          </p>
        </div>
        <Carousel
          setApi={carouselState.setApi}
          opts={{ loop: true, align: "start" }}
        >
          <CarouselContent className="ml-0">
            {PROPERTY_GALLERY.map((img, idx) => (
              <CarouselItem
                key={idx}
                className="basis-1/2 pl-0 pr-6 md:basis-1/3 md:pr-8"
              >
                <div className="w-full overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="aspect-square size-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    width={700}
                    height={700}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="rt-8 mt-8 flex items-center justify-between">
            <div className="mt-5 flex w-full items-start justify-start">
              {PROPERTY_GALLERY.map((_, idx) => (
                <button
                  key={idx}
                  onClick={carouselState.handleDotClick(idx)}
                  className={carouselState.dotClassName(idx)}
                  aria-label={`View image ${idx + 1}`}
                />
              ))}
            </div>
            <div className="flex items-end justify-end gap-2 md:gap-4">
              <CarouselPrevious className="static right-0 top-0 size-12 -translate-y-0" />
              <CarouselNext className="static right-0 top-0 size-12 -translate-y-0" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
