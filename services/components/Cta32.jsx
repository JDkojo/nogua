"use client";

import React from "react";
import { EmailCta } from "@/components/shared/EmailCta";

export function Cta32() {
  return (
    <EmailCta
      heading="Ready to get started?"
      subheading="Tell us what you need and we'll connect you with the right service"
      buttonLabel="Get started"
      source="services_cta"
      imageSrc="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=80&auto=format&fit=crop"
    />
  );
}
