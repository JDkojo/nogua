"use client";
import React from "react";
import { Navbar5 } from "./components/Navbar5";
import { Header64 } from "./components/Header64";
import { Layout370 } from "./components/Layout370";
import { PropertyGrid } from "./components/PropertyGrid";
import { Layout141 } from "./components/Layout141";
import { Layout13 } from "./components/Layout13";
import { Cta32 } from "./components/Cta32";
import { Faq13 } from "./components/Faq13";
import { Footer7 } from "./components/Footer7";

export default function Page() {
  return (
    <div>
      <Navbar5 />
      <Header64 />
      <Layout370 />
      {/* Dynamic property grid replaces static Product9 */}
      <PropertyGrid />
      <Layout141 />
      <Layout13 />
      <Cta32 />
      <Faq13 />
      <Footer7 />
    </div>
  );
}
