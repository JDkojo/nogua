"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Product9() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <h4 className="font-semibold">Available</h4>
            <h1 className="mt-3 text-5xl font-bold md:mt-4 md:text-7xl lg:text-8xl">
              Listings
            </h1>
            <p className="mt-5 text-base md:mt-6 md:text-md">
              Prime commercial spaces ready for your business
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
              <h3>Downtown office</h3>
              <div className="text-sm font-normal">Class A</div>
            </div>
            <div className="text-md md:text-lg">$2,500,000</div>
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
              <h3>Retail storefront</h3>
              <div className="text-sm font-normal">Ground floor</div>
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
              <h3>Industrial warehouse</h3>
              <div className="text-sm font-normal">Logistics zone</div>
            </div>
            <div className="text-md md:text-lg">$3,800,000</div>
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
              <h3>Medical plaza</h3>
              <div className="text-sm font-normal">Healthcare hub</div>
            </div>
            <div className="text-md md:text-lg">$2,100,000</div>
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
              <h3>Tech park office</h3>
              <div className="text-sm font-normal">Innovation district</div>
            </div>
            <div className="text-md md:text-lg">$1,950,000</div>
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
              <h3>Mixed-use complex</h3>
              <div className="text-sm font-normal">Urban center</div>
            </div>
            <div className="text-md md:text-lg">$4,500,000</div>
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
