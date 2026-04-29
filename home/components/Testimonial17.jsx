"use client";

import React from "react";
import { BiSolidStar } from "react-icons/bi";

const TESTIMONIALS = [
  {
    quote: "They made buying my first home feel less overwhelming. Professional, patient, and genuinely invested in my success.",
    name: "Sarah Mitchell",
    role: "First-time buyer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format&fit=crop&crop=face",
  },
  {
    quote: "The team found us a commercial space that fit our growing business perfectly. Worth every moment of their time.",
    name: "James Chen",
    role: "Business owner",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop&crop=face",
  },
  {
    quote: "Selling was painless. They handled everything with care and got us the best price. Highly recommend.",
    name: "Emma Rodriguez",
    role: "Property seller",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80&auto=format&fit=crop&crop=face",
  },
];

export function Testimonial17() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Real stories
          </h2>
          <p className="md:text-md">Hear from those who found their place</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="flex w-full flex-col items-start justify-between border border-border-primary p-6 md:p-8">
              <div className="rb-5 mb-5 md:mb-6">
                <div className="mb-5 flex md:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <BiSolidStar key={i} className="mr-1 size-6" />
                  ))}
                </div>
                <blockquote className="md:text-md">"{t.quote}"</blockquote>
              </div>
              <div className="mt-5 flex w-full flex-col items-start md:mt-6 md:w-fit md:flex-row md:items-center">
                <img
                  src={t.avatar}
                  alt={`${t.name} testimonial photo`}
                  className="mb-4 size-12 min-h-12 min-w-12 rounded-full object-cover md:mb-0 md:mr-4"
                  loading="lazy"
                  width={48}
                  height={48}
                />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
