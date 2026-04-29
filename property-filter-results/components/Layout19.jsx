"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout19() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Chat</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Message us instantly on WhatsApp
            </h2>
            <p className="mb-5 md:mb-6 md:text-md">
              Ask questions about any property right now. Our team responds
              fast.
            </p>
            <ul className="my-4 list-disc pl-5">
              <li className="my-1 self-start pl-2">
                <p>Quick property questions answered</p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>Schedule viewings directly through chat</p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>Get pricing and negotiation details</p>
              </li>
            </ul>
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
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&auto=format&fit=crop"
              className="w-full object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
