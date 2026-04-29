"use client";

import { Button, useMediaQuery } from "@relume_io/relume-ui";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { Fragment, useRef } from "react";
import { RxChevronRight } from "react-icons/rx";

const ConditionalRender = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};

const useRelume = () => {
  const containerRef = useRef(null);
  const data = [
    {
      heading: "01 Feature one",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      image: { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&auto=format&fit=crop", alt: "Relume placeholder image 1" },
      imageMobile: { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop", alt: "Relume placeholder image 1" },
    },
    {
      heading: "02 Feature two",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      image: { src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80&auto=format&fit=crop", alt: "Relume placeholder image 2" },
      imageMobile: { src: "https://images.unsplash.com/photo-1582407947304-fd86f28320be?w=1200&q=80&auto=format&fit=crop", alt: "Relume placeholder image 2" },
    },
    {
      heading: "03 Feature three",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      image: { src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=80&auto=format&fit=crop", alt: "Relume placeholder image 3" },
      imageMobile: { src: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80&auto=format&fit=crop", alt: "Relume placeholder image 3" },
    },
    {
      heading: "04 Feature four",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      image: { src: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80&auto=format&fit=crop", alt: "Relume placeholder image 4" },
      imageMobile: { src: "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=1400&q=80&auto=format&fit=crop", alt: "Relume placeholder image 4" },
    },
  ];
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const getStyles = (index) => {
    const startProgress = index / data.length;
    const endProgress = (index + 1) / data.length;
    const opacity = useTransform(
      scrollYProgress,
      [
        Math.max(0, startProgress - 0.07),
        startProgress,
        endProgress - 0.07,
        Math.min(1, endProgress),
      ],
      [0, 1, 1, 0],
    );
    const y = useTransform(
      scrollYProgress,
      [
        Math.max(0, startProgress - 0.1),
        startProgress,
        endProgress - 0.1,
        Math.min(1, endProgress),
      ],
      [100, 0, 0, -100],
    );
    return { opacity, y };
  };
  return { containerRef, getStyles };
};

const useMobile = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  return { isMobile };
};

const useTablet = () => {
  const isTablet = useMediaQuery("(min-width: 768px)");
  return { isTablet };
};

export function Layout513() {
  const { isTablet } = useTablet();
  const { isMobile } = useMobile();
  const render = { isTablet, isMobile };
  const useSctoll = useRelume();
  return (
    <section
      ref={useSctoll.containerRef}
      id="relume"
      className="px-[5%] py-16 md:py-24 lg:py-28"
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-start md:gap-20">
          <div className="flex flex-col gap-y-16 md:sticky md:top-20 md:mt-20 md:h-[calc(100vh_-10rem)] md:justify-center">
            <div className="flex flex-col">
              <p className="mb-3 font-semibold md:mb-4">Refine</p>
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Narrow down by what matters most
              </h2>
              <p className="md:text-md">
                Set your price limits and bedroom count. Choose residential or
                commercial. Pick your neighborhood and watch the map shift to
                show only what fits.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                <Button title="Apply" variant="secondary">
                  Apply
                </Button>
                <Button
                  title="Reset"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Reset
                </Button>
              </div>
            </div>
            <div className="flex flex-col justify-start gap-y-8">
              <AnimatePresence>
                <Fragment>
                  <ConditionalRender condition={render.isMobile}>
                    <div>
                      <h5 className="mb-3 text-xl font-bold">Price range</h5>
                      <p>Select residential, commercial, or luxury listings</p>
                      <div className="mt-4">
                        <img
                          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop"
                          alt="Relume placeholder image 1"
                          className="size-full"
                        />
                      </div>
                    </div>
                  </ConditionalRender>
                  <ConditionalRender condition={render.isTablet}>
                    <motion.div
                      style={{
                        opacity: useSctoll.getStyles(0).opacity,
                        y: useSctoll.getStyles(0).y,
                      }}
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="md:absolute first:md:relative"
                    >
                      <h5 className="font-bold md:mb-4 md:text-2xl">
                        Price range
                      </h5>
                      <p className="md:text-md">
                        Select residential, commercial, or luxury listings
                      </p>
                    </motion.div>
                  </ConditionalRender>
                </Fragment>
                <Fragment>
                  <ConditionalRender condition={render.isMobile}>
                    <div>
                      <h5 className="mb-3 text-xl font-bold">Property type</h5>
                      <p>Select residential, commercial, or luxury listings</p>
                      <div className="mt-4">
                        <img
                          src="https://images.unsplash.com/photo-1582407947304-fd86f28320be?w=1200&q=80&auto=format&fit=crop"
                          alt="Relume placeholder image 2"
                          className="size-full"
                        />
                      </div>
                    </div>
                  </ConditionalRender>
                  <ConditionalRender condition={render.isTablet}>
                    <motion.div
                      style={{
                        opacity: useSctoll.getStyles(1).opacity,
                        y: useSctoll.getStyles(1).y,
                      }}
                      initial={false}
                      animate={{}}
                      transition={{}}
                      className="md:absolute first:md:relative"
                    >
                      <h5 className="font-bold md:mb-4 md:text-2xl">
                        Property type
                      </h5>
                      <p className="md:text-md">
                        Select residential, commercial, or luxury listings
                      </p>
                    </motion.div>
                  </ConditionalRender>
                </Fragment>
                <Fragment>
                  <ConditionalRender condition={render.isMobile}>
                    <div>
                      <h5 className="mb-3 text-xl font-bold">
                        Bedrooms and bathrooms
                      </h5>
                      <p>Expand or contract your search area on the map</p>
                      <div className="mt-4">
                        <img
                          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80&auto=format&fit=crop"
                          alt="Relume placeholder image 3"
                          className="size-full"
                        />
                      </div>
                    </div>
                  </ConditionalRender>
                  <ConditionalRender condition={render.isTablet}>
                    <motion.div
                      style={{
                        opacity: useSctoll.getStyles(2).opacity,
                        y: useSctoll.getStyles(2).y,
                      }}
                      initial={false}
                      animate={{}}
                      transition={{}}
                      className="md:absolute first:md:relative"
                    >
                      <h5 className="font-bold md:mb-4 md:text-2xl">
                        Bedrooms and bathrooms
                      </h5>
                      <p className="md:text-md">
                        Expand or contract your search area on the map
                      </p>
                    </motion.div>
                  </ConditionalRender>
                </Fragment>
                <Fragment>
                  <ConditionalRender condition={render.isMobile}>
                    <div>
                      <h5 className="mb-3 text-xl font-bold">
                        Location radius
                      </h5>
                      <p>Select residential, commercial, or luxury listings</p>
                      <div className="mt-4">
                        <img
                          src="https://images.unsplash.com/photo-1524813686514-a57563d77965?w=1400&q=80&auto=format&fit=crop"
                          alt="Relume placeholder image 4"
                          className="size-full"
                        />
                      </div>
                    </div>
                  </ConditionalRender>
                  <ConditionalRender condition={render.isTablet}>
                    <motion.div
                      style={{
                        opacity: useSctoll.getStyles(3).opacity,
                        y: useSctoll.getStyles(3).y,
                      }}
                      initial={false}
                      animate={{}}
                      transition={{}}
                      className="md:absolute first:md:relative"
                    >
                      <h5 className="font-bold md:mb-4 md:text-2xl">
                        Location radius
                      </h5>
                      <p className="md:text-md">
                        Select residential, commercial, or luxury listings
                      </p>
                    </motion.div>
                  </ConditionalRender>
                </Fragment>
              </AnimatePresence>
            </div>
          </div>
          <div className="hidden md:grid md:grid-cols-1 md:gap-4">
            <div className="h-screen overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&auto=format&fit=crop"
                alt="Relume placeholder image 1"
                className="size-full"
              />
            </div>
            <div className="h-screen overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80&auto=format&fit=crop"
                alt="Relume placeholder image 2"
                className="size-full"
              />
            </div>
            <div className="h-screen overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=80&auto=format&fit=crop"
                alt="Relume placeholder image 3"
                className="size-full"
              />
            </div>
            <div className="h-screen overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80&auto=format&fit=crop"
                alt="Relume placeholder image 4"
                className="size-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
