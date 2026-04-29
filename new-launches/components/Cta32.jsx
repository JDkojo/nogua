"use client";

import React from "react";
import { EmailCta } from "@/components/shared/EmailCta";

export function Cta32() {
  return (
    <EmailCta
      heading="Be first to know about new launches"
      subheading="Register your interest and get early access to new developments"
      buttonLabel="Register interest"
      source="new_launches_cta"
      imageSrc="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80&auto=format&fit=crop"
    />
  );
}
