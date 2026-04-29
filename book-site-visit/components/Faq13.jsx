"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Faq13() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 w-full max-w-lg md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            FAQs
          </h2>
          <p className="md:text-md">
            Get answers about what to expect when you visit.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              What should I bring?
            </h2>
            <p>
              Bring a valid ID and wear comfortable shoes. You'll be walking
              through the property and the grounds. Have your phone ready in
              case our agent needs to reach you.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              How long does a visit take?
            </h2>
            <p>
              Most visits run thirty to forty-five minutes. We show you the
              property, answer your questions, and discuss what comes next. Time
              depends on the size of the place.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Can I bring someone with me?
            </h2>
            <p>
              Yes. Bring family or a trusted advisor. More eyes see more
              details. Just let us know when you book so we can plan
              accordingly.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              What if I need to reschedule?
            </h2>
            <p>
              Contact us at least twenty-four hours before your scheduled time.
              We'll find another slot that works. Life happens. We understand.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Is the property safe to visit?
            </h2>
            <p>
              All properties are inspected and secure. Our agents meet you
              there. You're never alone. Safety is our priority.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Can I take photos?
            </h2>
            <p>
              Yes. Take all the photos you need. Document what matters to you.
              Share them with your family or advisors later.
            </p>
          </div>
        </div>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Need more help?
          </h4>
          <p className="md:text-md">Reach out to our team directly.</p>
          <div className="mt-6 md:mt-8">
            <Button title="Contact" variant="secondary">
              Contact
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
