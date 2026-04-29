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
            Find answers about the property and what comes next
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              What's included in the sale?
            </h2>
            <p>
              The property transfers with all fixtures and fittings as listed.
              Appliances, window treatments, and built-in systems remain. We'll
              provide a complete inventory before closing.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              How long is the inspection period?
            </h2>
            <p>
              Standard inspection periods run fourteen days from contract
              signing. This gives you time to have professionals examine the
              structure, systems, and any concerns. Extensions can be
              negotiated.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              What are the financing options?
            </h2>
            <p>
              Most buyers work with conventional loans, though we can discuss
              FHA and other programs. We recommend connecting with a lender
              early to understand your position before making an offer.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              When can I move in?
            </h2>
            <p>
              Settlement typically occurs thirty to forty-five days after
              contract execution. We can discuss timing that works for your
              situation during negotiations.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Are there HOA fees or restrictions?
            </h2>
            <p>
              This property has no HOA obligations. You own the land outright
              with no monthly assessments or architectural restrictions. Full
              details are in the disclosure documents.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              What about property taxes?
            </h2>
            <p>
              Current annual taxes are available in the listing details. Tax
              assessments can change with ownership transfer. We recommend
              consulting a tax professional about your specific situation.
            </p>
          </div>
        </div>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Need more information?
          </h4>
          <p className="md:text-md">
            Reach out to the agent handling this property
          </p>
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
