"use client";

import React from "react";
import  Container  from "@/components/Container";

import Image from "next/image";

import { motion } from "framer-motion";

const logos = [
  "/assets/img/logo/googlecloud.png",
  "/assets/img/logo/nextjs.png",
  "/assets/img/logo/prisma.png",
  "/assets/img/logo/react.png",
  "/assets/img/logo/googlecloud.png",
  "/assets/img/logo/nextjs.png",
  "/assets/img/logo/prisma.png",
  "/assets/img/logo/react.png",
  "/assets/img/logo/googlecloud.png",
  "/assets/img/logo/nextjs.png",
  "/assets/img/logo/prisma.png",
  "/assets/img/logo/react.png",
  "/assets/img/logo/googlecloud.png",
  "/assets/img/logo/nextjs.png",
  "/assets/img/logo/prisma.png",
  "/assets/img/logo/react.png",

];

export const LogoTicker = () => {
  return (
    <section className="py-20 md:py-24">
      <Container className="p-4 md:p-8">
        <div className="flex flex-col md:items-center md:justify-center gap-5">
          <div className="flex-1 flex items-center justify-center md:flex-none">
            <h3>Powered by Innovative Techs</h3>
          </div>
          <div className="flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <motion.div
              initial={{ translateX: "-50%" }}
              animate={{ translateX: "0" }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="flex flex-none gap-8 -translate-x-1/2 md:pr-8"
            >
              {logos.map((logo, index) => (
                <Image
                  key={index}
                  src={logo}
                  alt={`Tech logo ${index + 1}`}
                  width={100}
                  height={24}
                  className="h-12 w-auto grayscale invert brightness-0 transition"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};