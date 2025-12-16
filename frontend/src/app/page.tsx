"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/Hero";
import WhyStash from "@/components/sections/WhyStash";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(heroScroll, [0.5, 0.8], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], [0, -40]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 0.94]);

  const { scrollYProgress: whyScroll } = useScroll({
    target: whyRef,
    offset: ["start end", "center center", "end start"],
  });

  const whyScale = useTransform(whyScroll, [0, 0.5, 1], [0.96, 1, 0.96]);
  const whyOpacity = useTransform(whyScroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div className="bg-linear-to-b from-[#FAEFE9] to-[#9a9389] w-full max-w-full pb-20">
      <Navbar />
      <motion.div
        ref={heroRef}
        style={{
          opacity: heroOpacity,
          y: heroY,
          scale: heroScale,
        }}
        className="will-change-transform origin-center"
      >
        <HeroSection />
      </motion.div>

      <motion.div
        ref={whyRef}
        style={{
          scale: whyScale,
          opacity: whyOpacity,
        }}
        className="will-change-transform origin-center"
      >
        <WhyStash />
      </motion.div>
    </div>
  );
}
