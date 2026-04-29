"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout370() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Search</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Find properties fast
            </h2>
            <p className="md:text-md">
              Filter by location, price, and property type instantly
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <div className="flex flex-col border border-border-primary">
              <div className="flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=75&auto=format&fit=crop"
                  alt="Real estate agents in a meeting"
                  className="w-full object-cover aspect-[3/2]"
                  loading="lazy"
                  width={600}
                  height={400}
                />
              </div>
              <div className="flex flex-col justify-center p-6">
                <div>
                  <p className="mb-2 text-sm font-semibold">Agents</p>
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    Expert local agents
                  </h3>
                  <p>Experienced professionals ready to guide your search</p>
                </div>
                <div className="mt-5 flex items-center gap-4 md:mt-6">
                  <Button title="Learn" variant="link" size="link" iconRight={<RxChevronRight />}>
                    Learn
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col border border-border-primary">
              <div className="flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=75&auto=format&fit=crop"
                  alt="Property handover and keys"
                  className="w-full object-cover aspect-[3/2]"
                  loading="lazy"
                  width={600}
                  height={400}
                />
              </div>
              <div className="flex flex-col justify-center p-6">
                <div>
                  <p className="mb-2 text-sm font-semibold">Listings</p>
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    Thousands of verified listings
                  </h3>
                  <p>Every property checked and ready to view</p>
                </div>
                <div className="mt-5 flex items-center gap-4 md:mt-6">
                  <Button title="Browse" variant="link" size="link" iconRight={<RxChevronRight />}>
                    Browse
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 border border-border-primary sm:col-span-2 sm:row-span-1 sm:grid-cols-2">
              <div className="flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=75&auto=format&fit=crop"
                  alt="Beautiful residential property exterior"
                  className="size-full object-cover"
                  loading="lazy"
                  width={800}
                  height={960}
                />
              </div>
              <div className="flex flex-1 flex-col justify-center p-6">
                <div>
                  <p className="mb-2 text-sm font-semibold">
                    Thousands of properties waiting
                  </p>
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    Residential, commercial, and luxury options available
                  </h3>
                  <p>Explore</p>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-4 md:mt-6">
                  <Button title="Explore" variant="link" size="link" iconRight={<RxChevronRight />}>
                    Explore
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
