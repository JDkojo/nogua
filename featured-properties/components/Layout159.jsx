"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout159() {
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
            <div className="text-center">
              <div className="mx-auto flex max-w-lg flex-col items-center justify-start">
                <div className="rb-5 mx-auto mb-5 md:mb-6">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    className="size-20"
                    alt="Relume logo"
                  />
                </div>
                <p className="mb-3 font-semibold md:mb-4">Quick</p>
                <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                  Message us on WhatsApp anytime
                </h2>
                <p className="md:text-md">
                  Questions about a listing? Send a message directly through
                  WhatsApp and get answers fast. We're here when you need us.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
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
        </div>
      </div>
    </section>
  );
}
