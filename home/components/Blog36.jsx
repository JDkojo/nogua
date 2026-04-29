"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

const POSTS = [
  {
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=75&auto=format&fit=crop",
    alt: "Real estate agent showing property to buyers",
    tag: "Market",
    readTime: "3 min read",
    title: "What buyers want in today's market",
    excerpt: "Understanding current buyer preferences shapes successful listings",
  },
  {
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=75&auto=format&fit=crop",
    alt: "Investment charts and financial planning",
    tag: "Investment",
    readTime: "4 min read",
    title: "Smart strategies for property investment returns",
    excerpt: "Building wealth through real estate requires knowledge and timing",
  },
  {
    img: "https://images.unsplash.com/photo-1582407947304-fd86f28320be?w=800&q=75&auto=format&fit=crop",
    alt: "House prepared for sale with curb appeal",
    tag: "Selling",
    readTime: "5 min read",
    title: "Preparing your home for the market",
    excerpt: "First impressions matter when selling your property",
  },
];

export function Blog36() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto w-full max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Insights</p>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Real estate news and trends
            </h2>
            <p className="md:text-md">
              Stay informed with the latest market updates and advice
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
          {POSTS.map((post) => (
            <div key={post.title} className="flex size-full flex-col items-center justify-start border border-border-primary">
              <a href="#" className="w-full overflow-hidden">
                <img
                  src={post.img}
                  alt={post.alt}
                  className="aspect-[3/2] size-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  width={800}
                  height={533}
                />
              </a>
              <div className="px-5 py-6 md:p-6">
                <div className="rb-4 mb-4 flex w-full items-center justify-start">
                  <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                    {post.tag}
                  </p>
                  <p className="inline text-sm font-semibold">{post.readTime}</p>
                </div>
                <a className="mb-2 block max-w-full" href="#">
                  <h2 className="text-xl font-bold md:text-2xl">{post.title}</h2>
                </a>
                <p>{post.excerpt}</p>
                <Button
                  title="Read more"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                  className="mt-6 flex items-center justify-center gap-x-2"
                >
                  Read more
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <Button
            title="View all"
            variant="secondary"
            className="mt-10 md:mt-14 lg:mt-16"
          >
            View all
          </Button>
        </div>
      </div>
    </section>
  );
}
