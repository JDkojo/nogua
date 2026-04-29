"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout210() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-x-20">
          <div className="order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&auto=format&fit=crop"
              className="w-full object-cover"
              alt="Relume placeholder image"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="mb-3 font-semibold md:mb-4">Connect</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Talk to someone who knows the deal
            </h2>
            <p className="mb-5 md:mb-6 md:text-md">
              Questions about a property? Need advice on your next move? Message
              us on WhatsApp and get answers in minutes, not days.
            </p>
            <ul className="my-4 list-disc pl-5">
              <li className="my-1 self-start pl-2">
                <p>Instant responses from our team</p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>Real conversations about real properties</p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>No waiting, no runaround</p>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Button title="Message" variant="secondary">
                Message
              </Button>
              <Button
                title="Chat"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
