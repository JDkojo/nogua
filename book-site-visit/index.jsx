"use client";
import React from "react";
import { Navbar5 } from "./components/Navbar5";
import { Header64 } from "./components/Header64";
import { Cta31 } from "./components/Cta31";
import { Cta32 } from "./components/Cta32";
import { Layout19 } from "./components/Layout19";
import { Layout19_1 } from "./components/Layout19_1";
import { Faq13 } from "./components/Faq13";
import { Contact15 } from "./components/Contact15";
import { Footer7 } from "./components/Footer7";
import { BookingForm } from "./components/BookingForm";

export default function Page() {
  return (
    <div>
      <Navbar5 />
      <Header64 />
      <Cta31 />
      <Cta32 />
      {/* Functional booking form injected into the page */}
      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container flex justify-center">
          <BookingForm />
        </div>
      </section>
      <Layout19 />
      <Layout19_1 />
      <Faq13 />
      <Contact15 />
      <Footer7 />
    </div>
  );
}
