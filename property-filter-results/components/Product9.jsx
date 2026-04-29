"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Product9() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <h4 className="font-semibold">Results</h4>
            <h1 className="mt-3 text-5xl font-bold md:mt-4 md:text-7xl lg:text-8xl">
              Properties
            </h1>
            <p className="mt-5 text-base md:mt-6 md:text-md">
              Each listing shows what matters most to you
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 justify-items-start gap-x-5 gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12">
          <a href="#" className="text-center font-semibold md:text-md">
            <div className="mb-3 aspect-[5/6] md:mb-4">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=75&auto=format&fit=crop"
                alt="Relume placeholder image"
                className="size-full object-cover"
              />
            </div>
            <div className="mb-2">
              <h3>Beachfront villa</h3>
              <div className="text-sm font-normal">4 bed, 3 bath</div>
            </div>
            <div className="text-md md:text-lg">$850,000</div>
          </a>
          <a href="#" className="text-center font-semibold md:text-md">
            <div className="mb-3 aspect-[5/6] md:mb-4">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&auto=format&fit=crop"
                alt="Relume placeholder image"
                className="size-full object-cover"
              />
            </div>
            <div className="mb-2">
              <h3>Downtown apartment</h3>
              <div className="text-sm font-normal">2 bed, 2 bath</div>
            </div>
            <div className="text-md md:text-lg">$425,000</div>
          </a>
          <a href="#" className="text-center font-semibold md:text-md">
            <div className="mb-3 aspect-[5/6] md:mb-4">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&auto=format&fit=crop"
                alt="Relume placeholder image"
                className="size-full object-cover"
              />
            </div>
            <div className="mb-2">
              <h3>Mountain estate</h3>
              <div className="text-sm font-normal">5 bed, 4 bath</div>
            </div>
            <div className="text-md md:text-lg">$1,200,000</div>
          </a>
          <a href="#" className="text-center font-semibold md:text-md">
            <div className="mb-3 aspect-[5/6] md:mb-4">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&auto=format&fit=crop"
                alt="Relume placeholder image"
                className="size-full object-cover"
              />
            </div>
            <div className="mb-2">
              <h3>Suburban home</h3>
              <div className="text-sm font-normal">3 bed, 2 bath</div>
            </div>
            <div className="text-md md:text-lg">$550,000</div>
          </a>
          <a href="#" className="text-center font-semibold md:text-md">
            <div className="mb-3 aspect-[5/6] md:mb-4">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&auto=format&fit=crop"
                alt="Relume placeholder image"
                className="size-full object-cover"
              />
            </div>
            <div className="mb-2">
              <h3>Waterfront cottage</h3>
              <div className="text-sm font-normal">2 bed, 1 bath</div>
            </div>
            <div className="text-md md:text-lg">$380,000</div>
          </a>
          <a href="#" className="text-center font-semibold md:text-md">
            <div className="mb-3 aspect-[5/6] md:mb-4">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&auto=format&fit=crop"
                alt="Relume placeholder image"
                className="size-full object-cover"
              />
            </div>
            <div className="mb-2">
              <h3>City penthouse</h3>
              <div className="text-sm font-normal">3 bed, 3 bath</div>
            </div>
            <div className="text-md md:text-lg">$975,000</div>
          </a>
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
