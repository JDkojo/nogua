"use client";

import React from "react";
import { EmailCta } from "@/components/shared/EmailCta";

export function Cta32() {
  return (
    <EmailCta
      heading="Ready to book your visit?"
      subheading="Leave your email and we'll confirm your site visit details"
      buttonLabel="Book now"
      source="book_visit_cta"
      imageSrc="https://images.unsplash.com/photo-1582407947304-fd86f28320be?w=1400&q=80&auto=format&fit=crop"
    />
  );
}
