"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { BiLogoLinkedinSquare } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";

const TEAM = [
  {
    name: "Michael Torres",
    role: "Founder",
    bio: "Twenty years in real estate. Started here because the industry needed someone to tell the truth.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop&crop=face",
  },
  {
    name: "Lisa Park",
    role: "Director",
    bio: "Knows every corner of the city. Matches people to properties like it's an art form.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop&crop=face",
  },
  {
    name: "David Walsh",
    role: "Sales Lead",
    bio: "Closes deals without pressure. His clients come back because they trust him.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop&crop=face",
  },
  {
    name: "Sophie Bennett",
    role: "Operations",
    bio: "Keeps everything running smooth. Details matter to her, and they should.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop&crop=face",
  },
  {
    name: "Marcus Johnson",
    role: "Investment Advisor",
    bio: "Understands numbers and markets. Helps investors see what others miss.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&auto=format&fit=crop&crop=face",
  },
  {
    name: "Rachel Kim",
    role: "Property Manager",
    bio: "Treats rental properties like they're her own. Tenants and owners both know it.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop&crop=face",
  },
];

export function Team5() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">People</p>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Our team
          </h2>
          <p className="md:text-md">
            The ones who know the market and know how to listen.
          </p>
        </div>
        <div className="grid grid-cols-1 items-start justify-center gap-x-8 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          {TEAM.map((member) => (
            <div key={member.name} className="flex flex-col text-center">
              <div className="rb-5 mb-5 flex w-full items-center justify-center md:mb-6">
                <img
                  src={member.avatar}
                  alt={`${member.name}, ${member.role}`}
                  className="size-20 min-h-20 min-w-20 rounded-full object-cover"
                  loading="lazy"
                  width={80}
                  height={80}
                />
              </div>
              <div className="mb-3 md:mb-4">
                <h5 className="text-md font-semibold md:text-lg">{member.name}</h5>
                <h6 className="md:text-md">{member.role}</h6>
              </div>
              <p>{member.bio}</p>
              <div className="mt-6 grid grid-flow-col grid-cols-[max-content] gap-[0.875rem] self-center">
                <a href="#" aria-label={`${member.name} on LinkedIn`}>
                  <BiLogoLinkedinSquare className="size-6" />
                </a>
                <a href="#" aria-label={`${member.name} on X`}>
                  <FaXTwitter className="size-6 p-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-14 w-full max-w-md text-center md:mt-20 lg:mt-24">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            We're hiring
          </h4>
          <p className="md:text-md">Good people who care about doing right by others.</p>
          <div className="mt-6 flex items-center justify-center gap-x-4 text-center md:mt-8">
            <Button title="See positions" variant="secondary">See positions</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
