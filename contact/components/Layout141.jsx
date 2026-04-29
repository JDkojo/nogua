"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout141() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
            <div className="w-full max-w-lg">
              <p className="mb-3 font-semibold md:mb-4">Location</p>
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Visit us in the heart of Sydney
              </h2>
              <p className="md:text-md">
                Our office is centrally located on Pitt Street. Stop by to
                discuss your property needs with our team in person.
              </p>
              <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
                <Button title="Directions" variant="secondary">
                  Directions
                </Button>
                <Button
                  title="Maps"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Maps
                </Button>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80&auto=format&fit=crop"
              className="size-full object-cover"
              alt="Modern office building exterior in city centre"
              loading="lazy"
              width={1400}
              height={800}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
