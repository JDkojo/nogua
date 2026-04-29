"use client";

import React from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";

export function Contact15() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div>
          <div className="mb-12 grid auto-cols-fr grid-cols-1 gap-x-12 gap-y-12 md:mb-20 md:grid-cols-[1fr_.75fr] md:gap-x-20 md:gap-y-16">
            <div className="rb-12 max-w-lg">
              <p className="mb-3 font-semibold md:mb-4">Reach</p>
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Get in touch
              </h2>
              <p className="md:text-md">
                Contact us directly and we'll respond within one business day
              </p>
            </div>
            <div className="flex flex-col">
              <div className="grid auto-cols-fr grid-cols-1 gap-x-4 gap-y-6 py-2">
                <div className="flex flex-row">
                  <div className="mr-4 md:mb-4">
                    <BiEnvelope className="size-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-md font-bold leading-[1.4] md:text-xl">
                      Email
                    </h3>
                    <a className="underline" href="#">
                      hello@relume.io
                    </a>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="mr-4 md:mb-4">
                    <BiPhone className="size-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-md font-bold leading-[1.4] md:text-xl">
                      Phone
                    </h3>
                    <a className="underline" href="#">
                      +61 2 9000 0000
                    </a>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="mr-4 md:mb-4">
                    <BiMap className="size-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-md font-bold leading-[1.4] md:text-xl">
                      Office
                    </h3>
                    <p>Level 5, 123 Pitt Street, Sydney NSW 2000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80&auto=format&fit=crop"
            className="w-full object-cover"
            alt="Bright modern office interior"
            loading="lazy"
            width={1400}
            height={700}
          />
        </div>
      </div>
    </section>
  );
}
