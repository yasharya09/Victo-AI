'use client';

import React from "react";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";
import { CallToAction } from "@/components/home/CallToAction";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#030014] overflow-hidden">
      <Hero />
      <Stats />
      <Features />
      <Testimonials />
      <CallToAction />
    </div>
  );
}