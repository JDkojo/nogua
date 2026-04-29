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
            Find answers about searching and filtering properties on our
            platform
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              How do I narrow down my search?
            </h2>
            <p>
              Use our filters to select price range, location, property type,
              and amenities. The results update instantly as you adjust your
              criteria, showing only properties that meet your needs.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Can I save properties I like?
            </h2>
            <p>
              Yes. Create an account and add properties to your favorites list.
              You can review them anytime and receive updates when similar
              listings become available in your area.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              What happens after I find one?
            </h2>
            <p>
              Contact us through the property page to schedule a site visit. Our
              team responds quickly and can arrange viewings at times that work
              for you.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Are the prices negotiable?
            </h2>
            <p>
              Many properties are open to discussion. Reach out to our agents to
              discuss pricing and terms. We handle negotiations on your behalf
              to get the best deal.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Do you offer financing help?
            </h2>
            <p>
              We provide investment advisory services and can connect you with
              trusted lenders. Our team guides you through the financial side of
              purchasing property.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              How current are these listings?
            </h2>
            <p>
              Our database updates daily with new properties and sold listings.
              You're always seeing the most recent market activity and available
              opportunities.
            </p>
          </div>
        </div>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Need more assistance?
          </h4>
          <p className="md:text-md">
            Our team is ready to help you find the right property
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
