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
            Everything you need to know about searching and viewing properties
            on our platform.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              How do I filter properties?
            </h2>
            <p>
              Use our Property Filter Results page to narrow down listings by
              price, location, bedrooms, and property type. You can also view
              properties on our Map View to see them geographically.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Can I save favorite properties?
            </h2>
            <p>
              Yes. Create an account to save properties you're interested in and
              receive updates when similar listings become available in your
              preferred areas.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              How do I schedule a site visit?
            </h2>
            <p>
              Visit our Book Site Visit page to request a tour of any property.
              You can also contact us directly through WhatsApp for immediate
              assistance with scheduling.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              What properties are currently available?
            </h2>
            <p>
              Browse our Property Listings page for all current offerings. Check
              our New Launches section for recently added properties and our
              Luxury Properties page for premium options.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Do you have commercial properties?
            </h2>
            <p>
              We specialize in both residential and commercial properties. Visit
              our Commercial Properties page to explore business spaces, or
              contact our Commercial Sales team for investment opportunities.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              How can I get investment advice?
            </h2>
            <p>
              Our Investment Advisory team is ready to help. Reach out through
              our Contact page or use WhatsApp Integration to discuss your real
              estate investment goals.
            </p>
          </div>
        </div>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Need more help?
          </h4>
          <p className="md:text-md">Get in touch with our team anytime.</p>
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
