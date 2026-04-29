"use client";

import React from "react";
import { EmailCta } from "@/components/shared/EmailCta";

export function Cta32() {
  return (
    <EmailCta
      heading="Get in touch today"
      subheading="Tell us what you're looking for and we'll send details"
      buttonLabel="Send"
      source="property_detail_cta"
      imageSrc="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80&auto=format&fit=crop"
    />
  );
}
