"use client";

import React from "react";
import { EmailCta } from "@/components/shared/EmailCta";

export function Cta32() {
  return (
    <EmailCta
      heading="Get property alerts by location"
      subheading="We'll notify you when new listings appear in your chosen area"
      buttonLabel="Set alert"
      source="map_view_cta"
      imageSrc="https://images.unsplash.com/photo-1524813686514-a57563d77965?w=1400&q=80&auto=format&fit=crop"
    />
  );
}
