"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  VideoIframe,
} from "@relume_io/relume-ui";
import React, { Fragment } from "react";
import { BiCheck } from "react-icons/bi";
import { FaCirclePlay } from "react-icons/fa6";
import { RxChevronDown } from "react-icons/rx";

const Star = () => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        const isFullStar = i < fullStars;
        const isHalfStar = hasHalfStar && i === fullStars;

        return (
          <div key={i}>
            {isFullStar ? (
              <BiSolidStar />
            ) : isHalfStar ? (
              <BiSolidStarHalf />
            ) : (
              <BiStar />
            )}
          </div>
        );
      })}
    </div>
  );
};

export function ProductHeader9() {
  return (
    <header id="relume" className="px-[5%] py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:gap-y-16 lg:grid-cols-[1.25fr_0.5fr] lg:gap-x-20">
          <div>
            <Breadcrumb className="mb-6 flex flex-wrap items-center text-sm">
              <BreadcrumbList>
                <Fragment>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Properties</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </Fragment>
                <Fragment>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Residential</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </Fragment>
                <Fragment>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Property detail</BreadcrumbLink>
                  </BreadcrumbItem>
                </Fragment>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="mb-3 text-4xl font-bold leading-[1.2] md:mb-4 md:text-5xl lg:text-6xl">
              Modern family home
            </h1>
            <p className="md:text-md">
              Built with care and attention to what matters.
            </p>
            <div className="my-8 border border-border-primary px-4 py-8 md:px-8">
              <p className="mb-3 font-semibold md:mb-4 md:text-md">Includes</p>
              <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-6">
                <div className="flex">
                  <div className="mr-4 self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Quiet established neighborhood</p>
                </div>
                <div className="flex">
                  <div className="mr-4 self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Quiet established neighborhood</p>
                </div>
                <div className="flex">
                  <div className="mr-4 self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Quiet established neighborhood</p>
                </div>
                <div className="flex">
                  <div className="mr-4 self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Quiet established neighborhood</p>
                </div>
                <div className="flex">
                  <div className="mr-4 self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Quiet established neighborhood</p>
                </div>
                <div className="flex">
                  <div className="mr-4 self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Quiet established neighborhood</p>
                </div>
                <div className="flex">
                  <div className="mr-4 self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Quiet established neighborhood</p>
                </div>
                <div className="flex">
                  <div className="mr-4 self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Quiet established neighborhood</p>
                </div>
              </div>
            </div>
            <h2 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              The essentials
            </h2>
            <Accordion type="multiple">
              <AccordionItem value="item-0">
                <AccordionTrigger
                  className="justify-start py-4 font-semibold md:py-5 md:text-md"
                  icon={
                    <RxChevronDown className="order-first mr-4 h-6 w-[1.75rem] shrink-0 text-text-primary transition-transform duration-300 md:size-6" />
                  }
                >
                  Square footage
                </AccordionTrigger>
                <AccordionContent className="md:pb-6">
                  Residential single-family zoning. No commercial use permitted.
                  The area maintains consistent character and property values.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-1">
                <AccordionTrigger
                  className="justify-start py-4 font-semibold md:py-5 md:text-md"
                  icon={
                    <RxChevronDown className="order-first mr-4 h-6 w-[1.75rem] shrink-0 text-text-primary transition-transform duration-300 md:size-6" />
                  }
                >
                  Year built
                </AccordionTrigger>
                <AccordionContent className="md:pb-6">
                  Residential single-family zoning. No commercial use permitted.
                  The area maintains consistent character and property values.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger
                  className="justify-start py-4 font-semibold md:py-5 md:text-md"
                  icon={
                    <RxChevronDown className="order-first mr-4 h-6 w-[1.75rem] shrink-0 text-text-primary transition-transform duration-300 md:size-6" />
                  }
                >
                  Lot size
                </AccordionTrigger>
                <AccordionContent className="md:pb-6">
                  Residential single-family zoning. No commercial use permitted.
                  The area maintains consistent character and property values.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger
                  className="justify-start py-4 font-semibold md:py-5 md:text-md"
                  icon={
                    <RxChevronDown className="order-first mr-4 h-6 w-[1.75rem] shrink-0 text-text-primary transition-transform duration-300 md:size-6" />
                  }
                >
                  Garage
                </AccordionTrigger>
                <AccordionContent className="md:pb-6">
                  Residential single-family zoning. No commercial use permitted.
                  The area maintains consistent character and property values.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger
                  className="justify-start py-4 font-semibold md:py-5 md:text-md"
                  icon={
                    <RxChevronDown className="order-first mr-4 h-6 w-[1.75rem] shrink-0 text-text-primary transition-transform duration-300 md:size-6" />
                  }
                >
                  Utilities
                </AccordionTrigger>
                <AccordionContent className="md:pb-6">
                  Residential single-family zoning. No commercial use permitted.
                  The area maintains consistent character and property values.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger
                  className="justify-start py-4 font-semibold md:py-5 md:text-md"
                  icon={
                    <RxChevronDown className="order-first mr-4 h-6 w-[1.75rem] shrink-0 text-text-primary transition-transform duration-300 md:size-6" />
                  }
                >
                  Foundation
                </AccordionTrigger>
                <AccordionContent className="md:pb-6">
                  Residential single-family zoning. No commercial use permitted.
                  The area maintains consistent character and property values.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger
                  className="justify-start py-4 font-semibold md:py-5 md:text-md"
                  icon={
                    <RxChevronDown className="order-first mr-4 h-6 w-[1.75rem] shrink-0 text-text-primary transition-transform duration-300 md:size-6" />
                  }
                >
                  Neighborhood
                </AccordionTrigger>
                <AccordionContent className="md:pb-6">
                  Residential single-family zoning. No commercial use permitted.
                  The area maintains consistent character and property values.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger
                  className="justify-start py-4 font-semibold md:py-5 md:text-md"
                  icon={
                    <RxChevronDown className="order-first mr-4 h-6 w-[1.75rem] shrink-0 text-text-primary transition-transform duration-300 md:size-6" />
                  }
                >
                  Zoning
                </AccordionTrigger>
                <AccordionContent className="md:pb-6">
                  Residential single-family zoning. No commercial use permitted.
                  The area maintains consistent character and property values.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div>
            <div className="lg:sticky lg:top-32">
              <Dialog>
                <DialogTrigger className="relative mb-5 flex w-full items-center justify-center md:mb-6">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-video-thumbnail-landscape.svg"
                    alt="Relume placeholder image"
                    className="size-full object-cover"
                  />
                  <span className="absolute inset-0 z-10 bg-black/50" />
                  <FaCirclePlay className="absolute z-20 size-16 text-white" />
                </DialogTrigger>
                <DialogContent>
                  <VideoIframe video="https://www.youtube.com/embed/8DKLYsikxTs?si=Ch9W0KrDWWUiCMMW" />
                </DialogContent>
              </Dialog>
              <div className="mb-7 flex flex-col flex-wrap sm:flex-row md:mb-8">
                <p className="text-2xl font-bold md:text-4xl">$485,000</p>
                <div className="mx-4 hidden w-px self-stretch bg-background-alternative sm:block" />
                <div className="flex flex-col gap-1">
                  <Star rating={3.5} />
                  <p className="text-sm">4.8 stars • 47 reviews</p>
                </div>
              </div>
              <div className="mb-4 mt-2 flex flex-col gap-y-4">
                <Button title="Schedule a showing">Schedule a showing</Button>
                <Button title="Make an offer" variant="secondary">
                  Make an offer
                </Button>
              </div>
              <p className="text-center text-xs">
                Inspection period guaranteed
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
