"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout1() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Quick</p>
            <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Chat with us on WhatsApp
            </h1>
            <p className="md:text-md">
              Get instant answers to your questions. Our team responds quickly
              to help you find the right property or service.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Message" variant="secondary">
                Message
              </Button>
              <Button
                title="WhatsApp"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                WhatsApp
              </Button>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80&auto=format&fit=crop"
              className="w-full object-cover"
              alt="Modern real estate office reception"
              loading="lazy"
              width={1200}
              height={800}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
