"use client";

import React from "react";
import { EmailCta } from "@/components/shared/EmailCta";

export function Cta32() {
  return (
    <EmailCta
      heading="Find your dream home"
      subheading="Get personalised residential listings delivered to your inbox"
      buttonLabel="Get listings"
      source="residential_sales_cta"
      imageSrc="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1400&q=80&auto=format&fit=crop"
    />
  );
}
