"use client";

import React, { useEffect, useRef } from "react";
import  Container  from "@/components/Container";
import {
  DotLottieCommonPlayer,
  DotLottiePlayer,
} from "@dotlottie/react-player";
import Image from "next/image";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
  ValueAnimationTransition,
} from "framer-motion";

interface TabsProps {
  icon: string;
  title: string;
  isNew: boolean;
  backgroundPositionX: number;
  backgroundPositionY: number;
  backgroundSizeX: number;
}

const tabs: TabsProps[] = [
  {
    icon: "/assets/lottie/vroom.lottie",
    title: "Clean & Intuitive Dashboard",
    isNew: false,
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    backgroundSizeX: 150,
  },
  {
    icon: "/assets/lottie/click.lottie",
    title: "One Click Redesign",
    isNew: true,
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    backgroundSizeX: 150,
  },
  {
    icon: "/assets/lottie/stars.lottie",
    title: "AI-Powered Image Analysis",
    isNew: false,
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    backgroundSizeX: 150,
  },
];

export const Features = () => {
  return (
    <section className="py-20 md:py-24">
      <Container className="p-4 md:p-8">
        <h2 className="text-5xl md:text-6xl font-medium text-center tracking-tighter">
          Transform Your Room with AI
        </h2>
        <p className="text-white/70 text-lg md:text-lg max-w-2xl mx-auto tracking-tight text-center mt-5">
          Upload any room image and let our intelligent design engine analyze
          and reimagine your space like never before.
        </p>

        <div className="mt-10 flex flex-col lg:flex-row gap-3">
          {tabs.map((tab) => (
            <FeatureTab key={tab.title} {...tab} />
          ))}
        </div>

        <div className="border border-white/20 p-2.5 rounded-xl mt-8">
          <div
            className="aspect-video bg-cover bg-no-repeat bg-center border border-white/20 rounded-lg"
            style={{ backgroundImage: "url(/assets/img/features.jpg)" }}
          ></div>
        </div>
      </Container>
    </section>
  );
};

const FeatureTab = (tab: TabsProps) => {
  const dotLottieRef = useRef<DotLottieCommonPlayer>(null);

  const xPerencetage = useMotionValue(0);
  const yPerecetage = useMotionValue(0);

  const tabRef = useRef<HTMLDivElement>(null);

  const maskImage = useMotionTemplate`radial-gradient(80px 80px at ${xPerencetage}% ${yPerecetage}%, black ,transparent)`;

  useEffect(() => {
    if (!tabRef.current) return;
    const { height, width } = tabRef.current?.getBoundingClientRect();
    const circumference = height * 2 + width * 2;
    const times = [
      0,
      width / circumference,
      (width + height) / circumference,
      (width * 2 + height) / circumference,
      1,
    ];
    const options: ValueAnimationTransition = {
      times,
      duration: 4,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop",
    };

    animate(xPerencetage, [0, 100, 100, 0, 0], options);

    animate(yPerecetage, [0, 0, 100, 100, 0], options);
  }, []);

  const handleTabHover = () => {
    if (dotLottieRef.current === null) return;
    // push the animation to starting to run one more time
    dotLottieRef.current.seek(0);
    dotLottieRef.current.play();
  };

  return (
    <div
      ref={tabRef}
      onMouseEnter={handleTabHover}
      className="border border-white/15 flex p-2.5 rounded-xl gap-2.5 items-center lg:flex-1 relative"
    >
      <motion.div
        style={{ maskImage }}
        className="absolute inset-0 -m-px rounded-lg border border-[#A369FF]"
      ></motion.div>
      <div className="h-12 w-12 border border-white/15 rounded-lg inline-flex items-center justify-center">
        <DotLottiePlayer
          ref={dotLottieRef}
          src={tab.icon}
          className="h-5 w-5"
            autoplay
        />
      </div>
      <div className="font-medium">{tab.title}</div>
      {tab.isNew && (
        <div className="text-xs rounded-full px-2 py-0.5 bg-[#8c44ff] text-black font-semibold">
          new
        </div>
      )}
    </div>
  );
};