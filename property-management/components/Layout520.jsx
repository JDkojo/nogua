"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout520() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Operations</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              What we handle for you
            </h2>
            <p className="md:text-md">
              Three core services that keep properties running smoothly
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          <div className="relative p-6 md:p-8">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-black/50" />
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&auto=format&fit=crop"
                className="size-full object-cover"
                alt="Relume placeholder image"
              />
            </div>
            <div className="relative z-10">
              <div className="mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon-white.svg"
                  className="size-12"
                  alt="Relume logo"
                />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-text-alternative md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Tenant screening and placement
              </h3>
              <p className="text-text-alternative">
                We find reliable tenants who pay on time and respect the
                property
              </p>
              <div className="mt-5 flex items-center md:mt-6">
                <Button
                  variant="link-alt"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Learn
                </Button>
              </div>
            </div>
          </div>
          <div className="relative p-6 md:p-8">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-black/50" />
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&auto=format&fit=crop"
                className="size-full object-cover"
                alt="Relume placeholder image"
              />
            </div>
            <div className="relative z-10">
              <div className="mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon-white.svg"
                  className="size-12"
                  alt="Relume logo"
                />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-text-alternative md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Rent collection and accounting
              </h3>
              <p className="text-text-alternative">
                Payments arrive on schedule with full transparency and detailed
                records
              </p>
              <div className="mt-5 flex items-center md:mt-6">
                <Button
                  variant="link-alt"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Learn
                </Button>
              </div>
            </div>
          </div>
          <div className="relative p-6 md:p-8">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-black/50" />
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&auto=format&fit=crop"
                className="size-full object-cover"
                alt="Relume placeholder image"
              />
            </div>
            <div className="relative z-10">
              <div className="mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon-white.svg"
                  className="size-12"
                  alt="Relume logo"
                />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-text-alternative md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Maintenance and repairs
              </h3>
              <p className="text-text-alternative">
                Issues get fixed fast with trusted contractors and quality
                oversight
              </p>
              <div className="mt-5 flex items-center md:mt-6">
                <Button
                  variant="link-alt"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Learn
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
