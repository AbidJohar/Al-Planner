"use client";

import React, { useRef } from "react";
import Container from "@/components/Container";
import GenerateButton from "@/components/GenerateButton";
import Link from "next/link";
import starsBg from "@/assets/img/stars.png";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

interface HeroProps {
  isAuthenticated: boolean;
  userId: string | null;
}

export const Hero = ({ isAuthenticated, userId }: HeroProps) => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // useMotionValueEvent(scrollYProgress, "change", (value) => {
  //   console.log("scrollYProgress", value);
  // }); =

  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    [-300, 300]
  );

  return (
    <motion.section
      ref={sectionRef}
      style={{ backgroundImage: `url(${starsBg.src})`, backgroundPositionY }}
      animate={{ backgroundPositionX: starsBg.width }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="h-[492px] md:h-[800px] flex items-center overflow-hidden relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
    >
      {/* absolute circle first layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#facc10,_transparent_60%)] opacity-70 pointer-events-none z-0"></div>
      {/* start planet */}
      <div
        className="absolute h-64 w-64 md:h-96 md:w-96 
  rounded-full 
  border border-white/20 
  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
  bg-[radial-gradient(50%_50%_at_16.8%_18.3%,#fff8dc,_#facc15_40%,#facc15_60%,#dc2626)] 
  shadow-[-20px_-20px_50px_rgba(255,255,200,0.5),-20px_-20px_80px_rgba(255,200,0,0.2),0_0_120px_rgba(255,165,0,0.7)]"
      ></div>
      {/* end planet */}

      {/* ring 1 */}
      <motion.div
        animate={{ rotate: "1turn" }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute h-[344px] w-[344px] min-md:w-[580px] min-md:h-[580px] border border-white opacity-20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
      >
        <div className="absolute h-2 w-2 left-0 bg-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2 "></div>
        <div className="absolute h-2 w-2 left-1/2 bg-white rounded-full top-0 -translate-x-1/2 -translate-y-1/2 "></div>
        <div className="absolute h-5 w-5 left-full border border-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2  inline-flex items-center justify-center">
          <div className="h-2 w-2 bg-white rounded-full"></div>
        </div>
      </motion.div>

      {/* ring 2 */}
      <motion.div
        animate={{ rotate: "-1turn" }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        className="absolute h-[444px] w-[444px] min-md:h-[780px] min-md:w-[780px] rounded-full border border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed"
      ></motion.div>
      {/* ring 3 */}
      <motion.div
        animate={{ rotate: "1turn" }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        className="absolute h-[544px] w-[544px] min-md:w-[980px] min-md:h-[980px] rounded-full border border-white opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute h-2 w-2 left-0 bg-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2 "></div>
        <div className="absolute h-2 w-2 left-full bg-white rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2 "></div>
      </motion.div>
      {/* create this first */}
      <Container className="relative md:-mt-64">
        <h1 className="text-5xl md:text-[128px] details-content:leading-none capitalize font-semibold tracking-tighter bg-white bg-[radial-gradient(100%_100%_at_top_left,white,white,rgba(74,32,138,.5))] text-transparent bg-clip-text text-center">
          AI Interior Design
        </h1>
        <p className="text-lg min-md:text-xl max-w-xl mx-auto text-white mt-5 text-center">
          Elevate your room's visibility effortlessly with AI, where smart
          technology meets intuitive design.
        </p>
        <div className="flex justify-center mt-3">
          <Link  href={isAuthenticated ? "/dashboard" : "/sign-in"}>
          <button className="py-2 px-3 rounded-full font-semibold text-black shadow-lg shadow-black/50 bg-white bg-[radial-gradient(100%_100%_at_top_left,white,white,rgba(74,32,138,.5))]">
             Generate Room

          </button>
          </Link>
        </div>
      </Container>
    </motion.section>
  );
};
