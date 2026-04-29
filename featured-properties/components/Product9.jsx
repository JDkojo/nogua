"use client";

import { Button } from "@relume_io/relume-ui";
import Link from "next/link";
import React from "react";

const FEATURED = [
  {
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&auto=format&fit=crop",
    alt: "Award-winning luxury home with pool",
    title: "Award-winning villa",
    type: "Luxury · 5 bed",
    price: "₦3,800,000,000",
    badge: "Editor's Pick",
  },
  {
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80&auto=format&fit=crop",
    alt: "Architect-designed modern residence",
    title: "Architect's residence",
    type: "Residential · 4 bed",
    price: "₦1,950,000,000",
    badge: "New",
  },
  {
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop",
    alt: "Premium office space in business district",
    title: "Premium office suite",
    type: "Commercial · 600 sqm",
    price: "₦2,400,000,000",
    badge: "Hot",
  },
  {
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format&fit=crop",
    alt: "Beachfront property with direct sea access",
    title: "Beachfront home",
    type: "Luxury · 6 bed",
    price: "₦5,200,000,000",
    badge: "Exclusive",
  },
  {
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&auto=format&fit=crop",
    alt: "Spacious family home in prime location",
    title: "Prime family home",
    type: "Residential · 4 bed",
    price: "₦880,000,000",
    badge: "Price Drop",
  },
  {
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&auto=format&fit=crop",
    alt: "Penthouse with 360-degree city views",
    title: "360° penthouse",
    type: "Luxury · 3 bed",
    price: "₦2,700,000,000",
    badge: "Last Unit",
  },
];

export function Product9() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <h4 className="font-semibold">Handpicked</h4>
            <h1 className="mt-3 text-5xl font-bold md:mt-4 md:text-7xl lg:text-8xl">
              Featured Properties
            </h1>
            <p className="mt-5 text-base md:mt-6 md:text-md">
              Our team's top picks across every category
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 justify-items-start gap-x-5 gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12">
          {FEATURED.map((p) => (
            <Link
              key={p.title}
              href="/property-detail"
              className="w-full text-center font-semibold md:text-md"
            >
              <div className="relative mb-3 aspect-[5/6] overflow-hidden md:mb-4">
                <img
                  src={p.img}
                  alt={p.alt}
                  className="size-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  width={800}
                  height={960}
                />
                <span className="absolute left-3 top-3 rounded bg-black px-2 py-0.5 text-xs font-bold text-white">
                  {p.badge}
                </span>
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
          <Button variant="secondary" size="primary" title="View all featured">
            View all featured
          </Button>
        </div>
      </div>
    </section>
  );
}
