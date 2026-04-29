"use client";

import { Button } from "@relume_io/relume-ui";
import Link from "next/link";
import React from "react";

const RESIDENTIAL_LISTINGS = [
  {
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=75&auto=format&fit=crop",
    alt: "Detached family home with front garden",
    title: "Family home",
    beds: "4 bed · 3 bath",
    price: "₦750,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=75&auto=format&fit=crop",
    alt: "Semi-detached house on quiet residential street",
    title: "Semi-detached",
    beds: "3 bed · 2 bath",
    price: "₦480,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=75&auto=format&fit=crop",
    alt: "Modern apartment with city views",
    title: "City apartment",
    beds: "2 bed · 1 bath",
    price: "₦320,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=75&auto=format&fit=crop",
    alt: "Townhouse in gated community",
    title: "Gated townhouse",
    beds: "3 bed · 2 bath",
    price: "₦560,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=75&auto=format&fit=crop",
    alt: "Detached bungalow with large rear garden",
    title: "Corner bungalow",
    beds: "3 bed · 2 bath",
    price: "₦420,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=75&auto=format&fit=crop",
    alt: "Spacious detached house with double garage",
    title: "Executive detached",
    beds: "5 bed · 4 bath",
    price: "₦1,100,000,000",
  },
];

export function Product9() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <h4 className="font-semibold">For Sale</h4>
            <h1 className="mt-3 text-5xl font-bold md:mt-4 md:text-7xl lg:text-8xl">
              Residential Homes
            </h1>
            <p className="mt-5 text-base md:mt-6 md:text-md">
              Houses, apartments, and townhomes ready to move into
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 justify-items-start gap-x-5 gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12">
          {RESIDENTIAL_LISTINGS.map((p) => (
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
                <div className="text-sm font-normal">{p.beds}</div>
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
