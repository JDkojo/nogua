"use client";

import { Button } from "@relume_io/relume-ui";
import Link from "next/link";
import React from "react";

const LUXURY_LISTINGS = [
  {
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80&auto=format&fit=crop",
    alt: "Ultra-modern luxury villa with infinity pool",
    title: "Clifftop villa",
    type: "Luxury · 5 bed",
    price: "₦4,500,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&auto=format&fit=crop",
    alt: "Luxury villa with manicured gardens",
    title: "Garden estate",
    type: "Luxury · 6 bed",
    price: "₦3,200,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&auto=format&fit=crop",
    alt: "Penthouse with panoramic city skyline views",
    title: "Sky penthouse",
    type: "Luxury · 4 bed",
    price: "₦2,800,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80&auto=format&fit=crop",
    alt: "Luxury interior with designer finishes",
    title: "Designer residence",
    type: "Luxury · 4 bed",
    price: "₦2,100,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&auto=format&fit=crop",
    alt: "Contemporary luxury home with pool",
    title: "Waterfront manor",
    type: "Luxury · 5 bed",
    price: "₦3,750,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format&fit=crop",
    alt: "Beachfront luxury property at sunset",
    title: "Beachfront retreat",
    type: "Luxury · 6 bed",
    price: "₦5,000,000,000",
  },
];

export function Product9() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <h4 className="font-semibold">Exclusive</h4>
            <h1 className="mt-3 text-5xl font-bold md:mt-4 md:text-7xl lg:text-8xl">
              Luxury Properties
            </h1>
            <p className="mt-5 text-base md:mt-6 md:text-md">
              Exceptional homes for discerning buyers
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 justify-items-start gap-x-5 gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12">
          {LUXURY_LISTINGS.map((p) => (
            <Link
              key={p.title}
              href="/property-detail"
              className="w-full text-center font-semibold md:text-md"
            >
              <div className="mb-3 aspect-[5/6] overflow-hidden md:mb-4">
                <img
                  src={p.img}
                  alt={p.alt}
                  className="size-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  width={800}
                  height={960}
                />
              </div>
              <div className="mb-2">
                <h3>{p.title}</h3>
                <div className="text-sm font-normal">{p.type}</div>
              </div>
              <div className="text-md md:text-lg">{p.price}</div>
            </Link>
          ))}
        </div>
        <div className="mt-14 flex justify-center md:mt-20 lg:mt-24">
          <Button variant="secondary" size="primary" title="View all">
            View all
          </Button>
        </div>
      </div>
    </section>
  );
}
