"use client";

import { Button } from "@relume_io/relume-ui";
import React, { Fragment } from "react";
import { RxChevronRight } from "react-icons/rx";

const STEPS = [
  {
    num: "01",
    label: "Search listings",
    heading: "Find what fits your needs",
    body: "Start with our filters. Narrow by location, price, and property type. The right place is waiting.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop",
    alt: "Browsing property listings on a device",
  },
  {
    num: "02",
    label: "Connect with agents",
    heading: "Talk to someone who knows",
    body: "Our agents are local experts. They'll answer your questions and arrange viewings at your convenience.",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80&auto=format&fit=crop",
    alt: "Real estate agent meeting with clients",
  },
  {
    num: "03",
    label: "Close the deal",
    heading: "Move in with confidence",
    body: "We handle the paperwork, negotiations, and handover. You just show up on moving day.",
    img: "https://images.unsplash.com/photo-1582407947304-fd86f28320be?w=1200&q=80&auto=format&fit=crop",
    alt: "Keys being handed over at property closing",
  },
];

export function Layout356() {
  return (
    <section id="relume">
      <div className="sticky top-0">
        {STEPS.map((step, idx) => (
          <Fragment key={step.num}>
            <div className="relative -top-32 h-0" />
            <div
              className="relative border-t border-border-primary bg-neutral-white pb-8 md:pb-14 lg:sticky lg:pb-0"
              style={{ top: `${idx * 4}rem`, marginBottom: idx < STEPS.length - 1 ? `${(STEPS.length - idx) * 4}rem` : "4rem" }}
            >
              <div className="px-[5%]">
                <div className="container">
                  <a href="#" className="flex h-16 w-full items-center underline">
                    <span className="mr-5 font-semibold md:mr-6 md:text-md">{step.num}</span>
                    <h1 className="font-semibold md:text-md">{step.label}</h1>
                  </a>
                  <div className="py-8 md:py-10 lg:py-12">
                    <div className="grid grid-cols-1 gap-y-12 md:items-center md:gap-x-12 lg:grid-cols-2 lg:gap-x-20">
                      <div>
                        <p className="mb-3 font-semibold md:mb-4">Step {step.num}</p>
                        <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                          {step.heading}
                        </h2>
                        <p className="md:text-md">{step.body}</p>
                        <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                          <Button title="Explore" variant="secondary">Explore</Button>
                          <Button title="Learn" variant="link" size="link" iconRight={<RxChevronRight />}>
                            Learn
                          </Button>
                        </div>
                      </div>
                      <div className="relative overflow-hidden">
                        <img
                          src={step.img}
                          className="h-[25rem] w-full object-cover sm:h-[30rem] lg:h-[60vh]"
                          alt={step.alt}
                          loading="lazy"
                          width={1200}
                          height={800}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
