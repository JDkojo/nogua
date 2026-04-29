"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

const CARDS = [
  {
    tag: "Local",
    title: "Deep roots in every neighborhood",
    body: "We've walked these streets. We know the value.",
    cta: "Discover",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=75&auto=format&fit=crop",
    alt: "Residential street with houses",
  },
  {
    tag: "Honest",
    title: "No games, just straight talk",
    body: "Every listing verified. Every price fair. That's our word.",
    cta: "Verify",
    img: "https://images.unsplash.com/photo-1582407947304-fd86f28320be?w=800&q=75&auto=format&fit=crop",
    alt: "Handshake closing a property deal",
  },
  {
    tag: "Personal",
    title: "Your needs matter to us",
    body: "We listen. We understand. We find your place.",
    cta: "Connect",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=75&auto=format&fit=crop",
    alt: "Agent consulting with clients",
  },
];

export function Layout394() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Why</p>
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            We know this market
          </h1>
          <p className="md:text-md">Years of experience built on solid ground</p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          {CARDS.map((card) => (
            <div key={card.tag} className="flex flex-col border border-border-primary">
              <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
                <div>
                  <p className="mb-2 font-semibold">{card.tag}</p>
                  <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                    {card.title}
                  </h2>
                  <p>{card.body}</p>
                </div>
                <div className="mt-5 md:mt-6">
                  <Button title={card.cta} variant="link" size="link" iconRight={<RxChevronRight />}>
                    {card.cta}
                  </Button>
                </div>
              </div>
              <div className="flex w-full flex-col items-center justify-center self-start overflow-hidden">
                <img
                  src={card.img}
                  alt={card.alt}
                  className="w-full object-cover aspect-[3/2]"
                  loading="lazy"
                  width={800}
                  height={533}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
