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
              <p className="mb-3 font-semibold md:mb-4">Mobile</p>
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Browse the map on any screen size
              </h2>
              <p className="md:text-md">
                Your phone, tablet, or desktop works the same. The map moves
                with you, filters respond instantly, and every property detail
                loads fast no matter where you are.
              </p>
              <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
                <Button title="Adapt" variant="secondary">
                  Adapt
                </Button>
                <Button
                  title="Expand"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Expand
                </Button>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80&auto=format&fit=crop"
              className="size-full object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
