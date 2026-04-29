"use client";

import React from "react";
import { EmailCta } from "@/components/shared/EmailCta";

export function Cta32() {
  return (
    <EmailCta
      heading="Can't find what you're looking for?"
      subheading="Tell us your requirements and we'll match you with the right property"
      buttonLabel="Send requirements"
      source="property_listings_cta"
      imageSrc="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1400&q=80&auto=format&fit=crop"
    />
  );
}
