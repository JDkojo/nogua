"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout155() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80&auto=format&fit=crop"
              className="size-full object-cover"
              alt="Relume placeholder image"
            />
          </div>
          <div className="rb-12 mt-12 md:mt-18 lg:mt-20">
            <div className="mx-auto max-w-lg text-center">
              <p className="mb-3 font-semibold md:mb-4">Connect</p>
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Message agents instantly about any property
              </h2>
              <p className="md:text-md">
                Found something that caught your eye? Send a message directly
                through WhatsApp and get answers in real time. Our agents
                respond fast.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
                <Button title="Chat" variant="secondary">
                  Chat
                </Button>
                <Button
                  title="Message"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
