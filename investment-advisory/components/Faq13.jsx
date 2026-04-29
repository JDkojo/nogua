"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Faq13() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 w-full max-w-lg md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Questions
          </h2>
          <p className="md:text-md">
            Everything you need to know about real estate investment advisory
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              How much capital do I need?
            </h2>
            <p>
              There's no minimum. We work with investors at every level, from
              those starting with a single property to those managing
              substantial portfolios. We tailor our approach to your situation.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              What makes your advice different?
            </h2>
            <p>
              We don't sell properties. We sell strategy. Our advisors focus
              entirely on your returns and long-term wealth building, not on
              commissions or quick deals.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              How long does consultation take?
            </h2>
            <p>
              Initial consultations run about an hour. We listen more than we
              talk, asking hard questions about your goals, timeline, and risk
              tolerance before offering recommendations.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Do you manage properties too?
            </h2>
            <p>
              We offer property management services separately. Many advisory
              clients use both, but they're independent. You choose what works
              for your needs.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              What about international investments?
            </h2>
            <p>
              We advise on domestic and select international markets. Our
              network spans major cities across Asia-Pacific, giving you options
              beyond your local market.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              How do you charge for services?
            </h2>
            <p>
              We work on transparent fee structures based on portfolio size and
              service level. No hidden costs, no surprise charges. We'll outline
              everything upfront.
            </p>
          </div>
        </div>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Need more clarity?
          </h4>
          <p className="md:text-md">Reach out to our team directly</p>
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
