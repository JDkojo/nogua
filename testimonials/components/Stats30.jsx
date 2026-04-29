"use client";

import React, { Fragment } from "react";

export function Stats30() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-x-12 lg:mb-20 lg:gap-x-20">
          <div>
            <h3 className="text-4xl font-bold leading-[1.2] md:text-5xl lg:text-6xl">
              Numbers that matter to our clients
            </h3>
          </div>
          <div>
            <p className="md:text-md">
              We measure success by the satisfaction of those we serve. These
              figures tell the story of trust earned and deals completed with
              care.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Fragment>
            <div className="border border-border-primary p-8 first:flex first:flex-col first:md:col-span-2 first:md:row-span-1 first:lg:col-span-1 first:lg:row-span-2">
              <p className="mb-8 text-10xl font-bold leading-[1.3] md:mb-10 md:text-[4rem] lg:mb-12 lg:text-[5rem]">
                94%
              </p>
              <h3 className="text-md font-bold leading-[1.4] md:text-xl mt-auto">
                Would recommend us
              </h3>
              <p className="mt-2">Clients return to us again and again</p>
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
            <div className="border border-border-primary p-8">
              <p className="mb-8 text-10xl font-bold leading-[1.3] md:mb-10 md:text-[4rem] lg:mb-12 lg:text-[5rem]">
                94%
              </p>
              <h3 className="text-md font-bold leading-[1.4] md:text-xl">
                Would recommend us
              </h3>
              <p className="mt-2">Clients return to us again and again</p>
            </div>
          </Fragment>
          <Fragment>
            <div className="border border-border-primary p-8 [&:nth-last-child(2)]:order-last [&:nth-last-child(2)]:md:order-none">
              <p className="mb-8 text-10xl font-bold leading-[1.3] md:mb-10 md:text-[4rem] lg:mb-12 lg:text-[5rem]">
                94%
              </p>
              <h3 className="text-md font-bold leading-[1.4] md:text-xl">
                Would recommend us
              </h3>
              <p className="mt-2">Clients return to us again and again</p>
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
