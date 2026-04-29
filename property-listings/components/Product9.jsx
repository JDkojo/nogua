"use client";

import { Button } from "@relume_io/relume-ui";
import Link from "next/link";
import React from "react";

const LISTINGS = [
  {
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=75&auto=format&fit=crop",
    alt: "Downtown loft with exposed brick and open plan",
    title: "Downtown loft",
    beds: "2 bed",
    price: "₦450,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=75&auto=format&fit=crop",
    alt: "Riverside estate with landscaped garden",
    title: "Riverside estate",
    beds: "4 bed",
    price: "₦890,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=75&auto=format&fit=crop",
    alt: "Garden apartment with private terrace",
    title: "Garden apartment",
    beds: "1 bed",
    price: "₦280,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=75&auto=format&fit=crop",
    alt: "Hillside manor with panoramic views",
    title: "Hillside manor",
    beds: "5 bed",
    price: "₦1,200,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=75&auto=format&fit=crop",
    alt: "Lakefront cottage surrounded by nature",
    title: "Lakefront cottage",
    beds: "3 bed",
    price: "₦625,000,000",
  },
  {
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=75&auto=format&fit=crop",
    alt: "Urban penthouse with rooftop terrace",
    title: "Urban penthouse",
    beds: "2 bed",
    price: "₦750,000,000",
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
              Properties
            </h1>
            <p className="mt-5 text-base md:mt-6 md:text-md">
              Browse our current listings across the city
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 justify-items-start gap-x-5 gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12">
          {LISTINGS.map((p) => (
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
