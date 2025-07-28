"use client";
import React from "react";
import Link from "next/link";
import { Facebook, Linkedin, Github } from "lucide-react";
import Container from "@/components/Container";

export const Footer = () => {
  return (
    <footer className="py-5 border-t border-white/15">
      <Container className="p-4 md:px-12 md:py-2">
        <div className="flex flex-col lg:flex-row items-center gap-8 ">
          <div className="font-bold text-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
            AI Interior Designer
          </div>

          <nav className="flex flex-col lg:flex-row items-center gap-5 lg:flex-1 lg:justify-center">
            <Link
              href={"#"}
              className="text-white/70 hover:text-white text-xs md:text-sm transition"
            >
              Features
            </Link>
            <Link
              href={"#"}
              className="text-white/70 hover:text-white text-xs md:text-sm transition"
            >
              Developers
            </Link>
            <Link
              href={"#"}
              className="text-white/70 hover:text-white text-xs md:text-sm transition"
            >
              Company
            </Link>
            <Link
              href={"#"}
              className="text-white/70 hover:text-white text-xs md:text-sm transition"
            >
              Blog
            </Link>
            <Link
              href={"#"}
              className="text-white/70 hover:text-white text-xs md:text-sm transition"
            >
              Changelog
            </Link>
          </nav>

          <div className="flex gap-5 items-center lg:flex-1 lg:justify-end">
            
            <Link href={"https://www.linkedin.com/in/abid-johar786/"}>
              <Linkedin className="text-white/40 hover:text-white transition" />
            </Link>
            <Link href={""}>
              <Github className="text-white/40 hover:text-white transition" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
