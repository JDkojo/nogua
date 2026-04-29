"use client";

import { Button } from "@relume_io/relume-ui";
import React, { Fragment } from "react";
import { RxChevronRight } from "react-icons/rx";

export function Stats41() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-x-12 lg:mb-20 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Numbers</p>
            <h2 className="text-5xl font-bold md:text-7xl lg:text-8xl">
              Built on solid ground
            </h2>
          </div>
          <div>
            <p className="md:text-md">
              These aren't just figures. They represent homes found, families
              settled, and deals done right. We've been doing this long enough
              to know what matters.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Our story" variant="secondary">
                Our story
              </Button>
              <Button
                title="→"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                →
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Fragment>
            <div className="first:group first:is-first border border-border-primary p-8 first:flex first:flex-col first:md:col-span-2 first:md:row-span-1 first:lg:col-span-1 first:lg:row-span-2 [&:nth-last-child(2)]:order-last [&:nth-last-child(2)]:md:order-none">
              <h3 className="mb-8 text-md font-bold leading-[1.4] md:mb-10 md:text-xl lg:mb-12">
                Years in business
              </h3>
              <p className="text-right text-10xl font-bold leading-[1.3] md:text-[4rem] lg:text-[5rem] mt-auto">
                18
              </p>
              <div className="my-4 h-px w-full bg-border-primary" />
              <p className="text-right">
                Long enough to see markets shift and stay steady.
              </p>
            </div>
          </Fragment>
          <Fragment>
            <div>
              <img
                className="aspect-[3/2] size-full object-cover"
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format&fit=crop"
                alt="Relume placeholder image"
              />
            </div>
          </Fragment>
          <Fragment>
            <div className="first:group first:is-first border border-border-primary p-8 first:flex first:flex-col first:md:col-span-2 first:md:row-span-1 first:lg:col-span-1 first:lg:row-span-2 [&:nth-last-child(2)]:order-last [&:nth-last-child(2)]:md:order-none">
              <h3 className="mb-8 text-md font-bold leading-[1.4] md:mb-10 md:text-xl lg:mb-12">
                Years in business
              </h3>
              <p className="text-right text-10xl font-bold leading-[1.3] md:text-[4rem] lg:text-[5rem]">
                18
              </p>
              <div className="my-4 h-px w-full bg-border-primary" />
              <p className="text-right">
                Long enough to see markets shift and stay steady.
              </p>
            </div>
          </Fragment>
          <Fragment>
            <div className="first:group first:is-first border border-border-primary p-8 first:flex first:flex-col first:md:col-span-2 first:md:row-span-1 first:lg:col-span-1 first:lg:row-span-2 [&:nth-last-child(2)]:order-last [&:nth-last-child(2)]:md:order-none">
              <h3 className="mb-8 text-md font-bold leading-[1.4] md:mb-10 md:text-xl lg:mb-12">
                Years in business
              </h3>
              <p className="text-right text-10xl font-bold leading-[1.3] md:text-[4rem] lg:text-[5rem]">
                18
              </p>
              <div className="my-4 h-px w-full bg-border-primary" />
              <p className="text-right">
                Long enough to see markets shift and stay steady.
              </p>
            </div>
          </Fragment>
          <Fragment>
            <div>
              <img
                className="aspect-[3/2] size-full object-cover"
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format&fit=crop"
                alt="Relume placeholder image"
              />
            </div>
          </Fragment>
        </div>
      </div>
    </section>
  );
}
