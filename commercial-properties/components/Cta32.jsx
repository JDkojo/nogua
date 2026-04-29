"use client";

import React from "react";
import { EmailCta } from "@/components/shared/EmailCta";

export function Cta32() {
  return (
    <EmailCta
      heading="Find your ideal commercial space"
      subheading="Get notified when new commercial listings match your criteria"
      buttonLabel="Notify me"
      source="commercial_properties_cta"
      imageSrc="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80&auto=format&fit=crop"
    />
  );
}
