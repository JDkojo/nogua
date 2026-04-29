"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout149() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="mb-12 md:mb-18 lg:mb-20">
            <div className="mx-auto flex max-w-lg flex-col items-center text-center">
              <p className="mb-3 font-semibold md:mb-4">Interested</p>
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Get details on any property today
              </h2>
              <p className="mb-5 md:mb-6 md:text-md">
                Fill out the form below. We'll send you everything you need to
                know about the property that caught your eye.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 py-2">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/webflow-logo.svg"
                  alt="Webflow logo 1"
                  className="max-h-14"
                />
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-logo.svg"
                  alt="Relume logo 1"
                  className="max-h-14"
                />
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/webflow-logo.svg"
                  alt="Webflow logo 2"
                  className="max-h-14"
                />
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-logo.svg"
                  alt="Relume logo 2"
                  className="max-h-14"
                />
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
                <Button title="Inquire" variant="secondary">
                  Inquire
                </Button>
                <Button
                  title="Learn"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Learn
                </Button>
              </div>
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
    </section>
  );
}
