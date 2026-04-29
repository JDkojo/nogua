"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Product3() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="font-semibold">Listed</p>
            <h1 className="mt-3 text-5xl font-bold md:mt-4 md:text-7xl lg:text-8xl">
              Properties
            </h1>
            <p className="mt-5 text-base md:mt-6 md:text-md">
              Click a pin to see the details here
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 justify-items-start gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16 lg:grid-cols-4">
          <a href="#" className="text-center font-semibold md:text-md">
            <div className="mb-3 aspect-[5/6] md:mb-4">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&auto=format&fit=crop"
                alt="Relume placeholder image"
                className="size-full object-cover"
              />
            </div>
            <div className="mb-2">
              <h3>Downtown loft</h3>
              <div className="text-sm font-normal">Residential</div>
            </div>
            <div className="text-md md:text-lg">$485,000</div>
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
              <h3>Riverside estate</h3>
              <div className="text-sm font-normal">Residential</div>
            </div>
            <div className="text-md md:text-lg">$720,000</div>
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
              <h3>Office complex</h3>
              <div className="text-sm font-normal">Commercial</div>
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
              <h3>Hillside villa</h3>
              <div className="text-sm font-normal">Luxury</div>
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
              <h3>Suburban home</h3>
              <div className="text-sm font-normal">Residential</div>
            </div>
            <div className="text-md md:text-lg">$395,000</div>
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
              <div className="text-sm font-normal">Commercial</div>
            </div>
            <div className="text-md md:text-lg">$650,000</div>
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
              <h3>Penthouse suite</h3>
              <div className="text-sm font-normal">Luxury</div>
            </div>
            <div className="text-md md:text-lg">$3,500,000</div>
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
              <h3>Garden cottage</h3>
              <div className="text-sm font-normal">Residential</div>
            </div>
            <div className="text-md md:text-lg">$325,000</div>
          </a>
        </div>
        <div className="mt-10 flex justify-center md:mt-14 lg:mt-16">
          <Button variant="secondary" size="primary" title="View all">
            View all
          </Button>
        </div>
      </div>
    </section>
  );
}
