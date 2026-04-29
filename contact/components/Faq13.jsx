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
            Find answers to common questions about our services and how we work
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              How long does a response take?
            </h2>
            <p>
              We aim to respond to all inquiries within 24 hours during business
              days. For urgent matters, call us directly or use our WhatsApp
              service for faster communication.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Can I schedule a property viewing?
            </h2>
            <p>
              Yes. Visit our Book Site Visit page to schedule a viewing at your
              preferred time. We offer flexible scheduling to accommodate your
              availability.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Do you offer property management services?
            </h2>
            <p>
              We do. Our property management team handles everything from tenant
              relations to maintenance. Visit our Services page to learn more
              about what we offer.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              What areas do you cover?
            </h2>
            <p>
              We specialize in residential and commercial properties across
              Sydney and surrounding regions. Check our Property Listings page
              to see available properties in your area.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              How do I find investment properties?
            </h2>
            <p>
              Our Investment Advisory service helps identify properties with
              strong growth potential. Contact us to discuss your investment
              goals and timeline.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Is there a mobile app?
            </h2>
            <p>
              Our website is fully mobile responsive, so you can browse
              properties on any device. We're always improving our platform to
              serve you better.
            </p>
          </div>
        </div>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Need more help?
          </h4>
          <p className="md:text-md">
            Reach out to our team using the contact form below
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
