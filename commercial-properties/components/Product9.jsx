"use client";

import { Button } from "@relume_io/relume-ui";
import Link from "next/link";
import React from "react";

const COMMERCIAL_LISTINGS = [
  {
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=75&auto=format&fit=crop",
    alt: "Modern open-plan office space",
    title: "Grade A office",
    type: "Commercial · 500 sqm",
    price: "₦1,800,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=75&auto=format&fit=crop",
    alt: "Prime retail storefront on busy street",
    title: "Retail unit",
    type: "Commercial · 120 sqm",
    price: "₦650,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=75&auto=format&fit=crop",
    alt: "Coworking and flexible office space",
    title: "Flex workspace",
    type: "Commercial · 250 sqm",
    price: "₦920,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=75&auto=format&fit=crop",
    alt: "Modern commercial building exterior",
    title: "Office tower floor",
    type: "Commercial · 800 sqm",
    price: "₦3,200,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=75&auto=format&fit=crop",
    alt: "Industrial warehouse with loading bay",
    title: "Warehouse unit",
    type: "Industrial · 1,200 sqm",
    price: "₦2,100,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=75&auto=format&fit=crop",
    alt: "Mixed-use commercial development",
    title: "Mixed-use block",
    type: "Commercial · 2,000 sqm",
    price: "₦5,500,000,000",
  },
];

export function Product9() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <h4 className="font-semibold">Available</h4>
            <h1 className="mt-3 text-5xl font-bold md:mt-4 md:text-7xl lg:text-8xl">
              Commercial Properties
            </h1>
            <p className="mt-5 text-base md:mt-6 md:text-md">
              Office, retail, and industrial spaces for your business
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 justify-items-start gap-x-5 gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12">
          {COMMERCIAL_LISTINGS.map((p) => (
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
