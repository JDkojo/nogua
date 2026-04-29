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
            Everything you need to know about reaching us through WhatsApp.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              How do I start chatting
            </h2>
            <p>
              Click the chat button above or save our WhatsApp number to your
              contacts. Send us a message with your property interests and we'll
              respond immediately with available options and details.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              What hours do you respond
            </h2>
            <p>
              Our team monitors WhatsApp during business hours and responds to
              all inquiries within one hour. For urgent matters outside these
              hours, leave a message and we'll get back to you first thing.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Can I send property photos
            </h2>
            <p>
              Yes. Share photos, videos, or documents directly through WhatsApp.
              This helps us understand your preferences and provide better
              recommendations for properties that match your needs.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Is my information secure
            </h2>
            <p>
              WhatsApp uses end-to-end encryption for all messages. Your
              personal information is protected and we never share your details
              with third parties without consent.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Can I schedule a site visit
            </h2>
            <p>
              Absolutely. Message us your preferred dates and times and we'll
              confirm availability. You can also visit our Book Site Visit page
              to schedule directly through our system.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Do you offer investment advice
            </h2>
            <p>
              Yes. Our investment advisory team can discuss market trends,
              property appreciation potential, and rental yields. Connect with
              us on WhatsApp to explore investment opportunities tailored to
              your goals.
            </p>
          </div>
        </div>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Need more help
          </h4>
          <p className="md:text-md">
            Visit our contact page or call us directly.
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
