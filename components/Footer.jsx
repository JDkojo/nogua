"use client";

import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <footer className="px-[5%] py-12 md:py-18 lg:py-20">
      <div className="container">
        <div className="flex flex-col items-center pb-12 md:pb-18 lg:pb-20">
          <Link href="/" className="mb-8">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/logo-image.svg"
              alt="Real Estate Portal"
              className="inline-block"
            />
          </Link>
          <ul className="grid grid-flow-row grid-cols-1 items-start justify-center justify-items-center gap-6 md:grid-flow-col md:grid-cols-[max-content] md:justify-center md:justify-items-start">
            <li className="font-semibold"><Link href="/property-listings">Property Listings</Link></li>
            <li className="font-semibold"><Link href="/about-us">About Us</Link></li>
            <li className="font-semibold"><Link href="/services">Our Services</Link></li>
            <li className="font-semibold"><Link href="/contact">Contact Us</Link></li>
            <li className="font-semibold"><Link href="/book-site-visit">Book Visit</Link></li>
          </ul>
        </div>
        <div className="h-px w-full bg-black" />
        <div className="flex flex-col-reverse items-center justify-between pb-4 pt-6 text-center text-sm md:flex-row md:pb-0 md:pt-8">
          <p className="mt-8 md:mt-0">© {new Date().getFullYear()} Real Estate Portal. All rights reserved.</p>
          <ul className="grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0">
            <li className="underline decoration-black underline-offset-1">
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li className="underline decoration-black underline-offset-1">
              <a href="#">Terms of Service</a>
            </li>
            <li className="underline decoration-black underline-offset-1">
              <a href="#">Cookie Settings</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
