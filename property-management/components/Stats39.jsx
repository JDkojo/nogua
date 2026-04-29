"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Stats39() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Track record</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Numbers that speak for themselves
          </h2>
          <p className="md:text-md">
            We've built our reputation on results. These figures prove it.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="border border-border-primary p-8">
            <h3 className="mb-8 text-md font-bold leading-[1.4] md:mb-10 md:text-xl lg:mb-12">
              Properties managed
            </h3>
            <p className="text-right text-10xl font-bold leading-[1.3] md:text-[4rem] lg:text-[5rem]">
              850
            </p>
            <div className="my-4 h-px w-full bg-border-primary" />
            <p className="text-right">
              Across Sydney, Melbourne, and Brisbane combined.
            </p>
          </div>
          <div className="border border-border-primary p-8">
            <h3 className="mb-8 text-md font-bold leading-[1.4] md:mb-10 md:text-xl lg:mb-12">
              Average occupancy
            </h3>
            <p className="text-right text-10xl font-bold leading-[1.3] md:text-[4rem] lg:text-[5rem]">
              96%
            </p>
            <div className="my-4 h-px w-full bg-border-primary" />
            <p className="text-right">
              Consistently higher than market averages in all regions.
            </p>
          </div>
          <div className="border border-border-primary p-8">
            <h3 className="mb-8 text-md font-bold leading-[1.4] md:mb-10 md:text-xl lg:mb-12">
              Years of experience
            </h3>
            <p className="text-right text-10xl font-bold leading-[1.3] md:text-[4rem] lg:text-[5rem]">
              18
            </p>
            <div className="my-4 h-px w-full bg-border-primary" />
            <p className="text-right">
              Managing residential and commercial properties since 2006.
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-4 md:mt-14 lg:mt-16">
          <Button title="Learn" variant="secondary">
            Learn
          </Button>
          <Button
            title="Explore"
            variant="link"
            size="link"
            iconRight={<RxChevronRight />}
          >
            Explore
          </Button>
        </div>
      </div>
    </section>
  );
}
