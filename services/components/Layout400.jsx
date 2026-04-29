"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout400() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Services</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              What we offer you
            </h2>
            <p className="md:text-md">
              Each service built to match your real estate goals and timeline.
            </p>
          </div>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <div className="flex flex-col border border-border-primary">
            <div className="flex w-full flex-col items-center justify-center self-start">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80&auto=format&fit=crop"
                alt="Relume placeholder image 1"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-6">
              <div>
                <p className="mb-2 text-sm font-semibold">Buying</p>
                <h3 className="mb-2 text-lg font-bold leading-[1.4] md:text-2xl">
                  Find and secure residential properties that fit your needs.
                </h3>
                <p>Explore</p>
              </div>
              <div className="mt-5 md:mt-6">
                <Button
                  title="Button"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Button
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col border border-border-primary">
            <div className="flex w-full flex-col items-center justify-center self-start">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80&auto=format&fit=crop"
                alt="Relume placeholder image 1"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-6">
              <div>
                <p className="mb-2 text-sm font-semibold">Selling</p>
                <h3 className="mb-2 text-lg font-bold leading-[1.4] md:text-2xl">
                  Market commercial spaces to qualified buyers and investors.
                </h3>
                <p>Explore</p>
              </div>
              <div className="mt-5 md:mt-6">
                <Button
                  title="Button"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Button
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col border border-border-primary">
            <div className="flex w-full flex-col items-center justify-center self-start">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80&auto=format&fit=crop"
                alt="Relume placeholder image 1"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-6">
              <div>
                <p className="mb-2 text-sm font-semibold">Managing</p>
                <h3 className="mb-2 text-lg font-bold leading-[1.4] md:text-2xl">
                  Handle tenant relations and maintenance with full
                  transparency.
                </h3>
                <p>Explore</p>
              </div>
              <div className="mt-5 md:mt-6">
                <Button
                  title="Button"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Button
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col border border-border-primary">
            <div className="flex w-full flex-col items-center justify-center self-start">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80&auto=format&fit=crop"
                alt="Relume placeholder image 1"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-6">
              <div>
                <p className="mb-2 text-sm font-semibold">Investing</p>
                <h3 className="mb-2 text-lg font-bold leading-[1.4] md:text-2xl">
                  Build wealth through strategic property acquisitions and
                  growth.
                </h3>
                <p>Explore</p>
              </div>
              <div className="mt-5 md:mt-6">
                <Button
                  title="Button"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Button
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
