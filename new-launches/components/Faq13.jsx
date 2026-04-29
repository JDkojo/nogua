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
            Common questions about our newest properties and how to secure
            yours.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              When do properties launch?
            </h2>
            <p>
              New launches happen throughout the year as developments complete
              construction. We announce them first to our registered members,
              giving you a head start before public release.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              How do I book a site visit?
            </h2>
            <p>
              Use the booking form on this page or contact us directly through
              WhatsApp. We'll confirm your preferred time and send you
              directions to the property.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Can I reserve a property early?
            </h2>
            <p>
              Yes. Early registrations often come with special pricing or
              incentives. Reach out to our team to discuss reservation options
              for your chosen property.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              What's included in new launches?
            </h2>
            <p>
              Each launch includes modern amenities, quality finishes, and prime
              locations. Specific features vary by project. View the detailed
              listing for complete specifications.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Are financing options available?
            </h2>
            <p>
              We work with major lenders to arrange financing. Our team can
              connect you with partners who offer competitive rates and flexible
              terms.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              How far in advance should I register?
            </h2>
            <p>
              Register as soon as you see a launch that interests you. Early
              registrants often get priority scheduling and access to premium
              units.
            </p>
          </div>
        </div>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Need more help?
          </h4>
          <p className="md:text-md">
            Our team is ready to answer your questions.
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
