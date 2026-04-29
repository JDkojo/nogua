"use client";

import { Button } from "@relume_io/relume-ui";
import Link from "next/link";
import React from "react";

const NEW_LAUNCHES = [
  {
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=75&auto=format&fit=crop",
    alt: "New residential development under construction",
    title: "Horizon Heights",
    type: "New launch · 2–4 bed",
    price: "From ₦380,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=75&auto=format&fit=crop",
    alt: "Modern new-build homes in planned estate",
    title: "Greenfield Estate",
    type: "New launch · 3–5 bed",
    price: "From ₦620,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=75&auto=format&fit=crop",
    alt: "Contemporary apartment tower newly completed",
    title: "The Meridian",
    type: "New launch · 1–3 bed",
    price: "From ₦290,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=75&auto=format&fit=crop",
    alt: "Luxury new-build villa development",
    title: "Prestige Villas",
    type: "New launch · 4–6 bed",
    price: "From ₦1,500,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=75&auto=format&fit=crop",
    alt: "Affordable new homes in suburban development",
    title: "Sunrise Gardens",
    type: "New launch · 2–3 bed",
    price: "From ₦250,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=75&auto=format&fit=crop",
    alt: "Townhouse development with communal spaces",
    title: "Urban Quarter",
    type: "New launch · 3 bed",
    price: "From ₦490,000,000",
  },
];

export function Product9() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <h4 className="font-semibold">Just Launched</h4>
            <h1 className="mt-3 text-5xl font-bold md:mt-4 md:text-7xl lg:text-8xl">
              New Developments
            </h1>
            <p className="mt-5 text-base md:mt-6 md:text-md">
              Be first to secure your unit in the latest launches
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 justify-items-start gap-x-5 gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12">
          {NEW_LAUNCHES.map((p) => (
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
          <Button variant="secondary" size="primary" title="Register interest">
            Register interest
          </Button>
        </div>
      </div>
    </section>
  );
}
