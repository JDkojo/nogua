"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Cta31() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container flex flex-col items-center">
        <div className="mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Ready to see it in person
          </h2>
          <p className="md:text-md">
            Schedule a site visit and walk through your possibilities
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
            <Button title="Book">Book</Button>
            <Button title="Contact" variant="secondary">Contact</Button>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80&auto=format&fit=crop"
          className="size-full object-cover"
          alt="Luxury house with pool and landscaping"
          loading="lazy"
          width={1400}
          height={800}
        />
      </div>
    </section>
  );
}
