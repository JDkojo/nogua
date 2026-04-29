"use client";

import { Button } from "@relume_io/relume-ui";
import Link from "next/link";
import React from "react";

const FEATURED_PROPERTIES = [
  {
    href: "/property-listings",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=75&auto=format&fit=crop",
    alt: "Beachfront villa with ocean view",
    title: "Beachfront villa",
    type: "Residential",
    price: "₦850,000,000",
  },
  {
    href: "/property-listings",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=75&auto=format&fit=crop",
    alt: "Modern city apartment interior",
    title: "City apartment",
    type: "Residential",
    price: "₦520,000,000",
  },
  {
    href: "/property-listings",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=75&auto=format&fit=crop",
    alt: "Contemporary office space",
    title: "Office space",
    type: "Commercial",
    price: "₦1,200,000,000",
  },
  {
    href: "/property-listings",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=75&auto=format&fit=crop",
    alt: "Luxury penthouse with city views",
    title: "Luxury penthouse",
    type: "Luxury",
    price: "₦2,500,000,000",
  },
  {
    href: "/property-listings",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=75&auto=format&fit=crop",
    alt: "Suburban family house with garden",
    title: "Suburban house",
    type: "Residential",
    price: "₦675,000,000",
  },
  {
    href: "/property-listings",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=75&auto=format&fit=crop",
    alt: "Retail storefront in prime location",
    title: "Retail storefront",
    type: "Commercial",
    price: "₦950,000,000",
  },
];

export function Product9() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <h4 className="font-semibold">Featured</h4>
            <h1 className="mt-3 text-5xl font-bold md:mt-4 md:text-7xl lg:text-8xl">
              Properties
            </h1>
            <p className="mt-5 text-base md:mt-6 md:text-md">
              Handpicked listings ready for your next move
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 justify-items-start gap-x-5 gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12">
          {FEATURED_PROPERTIES.map((p) => (
            <Link key={p.title} href={p.href} className="text-center font-semibold md:text-md w-full">
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
