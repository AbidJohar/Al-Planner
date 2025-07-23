"use client";

import Link from "next/link";
import Container from "./Container";
import NavMenu from "./NavMenu";
import GenerateButton from "./GenerateButton";
import { UserButton } from "@clerk/nextjs";
import ToggleContainer from "./ToggleContainer";

interface HeaderProps {
  isAuthenticated?: boolean;
}

const Header = ({ isAuthenticated }: HeaderProps) => {
  return (
    <header className="p-4 min-md:px-6 min-md:py-4  sticky top-2 z-10 backdrop-blur min-md:backdrop-blur-none">
      <Container>
        <div className="min-md:border-white/15 rounded-full p-2.5 flex items-center max-w-4xl mx-auto min-md:backdrop-blur-md justify-between border border-transparent">

          {/* Logo */}
          <div className="font-bold text-lg bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
            AI Interior Planner
          </div>

          {/* Nav Menu */}
          <div className="hidden min-md:block">
            <NavMenu />
          </div>

          {/* Right Side: Actions */}
          <div className="flex gap-5 items-center">
            {/* Conditional Render */}
            {isAuthenticated ? (
              <>
                <div className="hidden min-md:block">
                  <GenerateButton label="Generate" />
                </div>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <Link href="/sign-in">
                <div className="text-white/80 hover:text-white font-medium text-sm min-md:text-base transition-colors">
                  Sign In
                </div>
              </Link>
            )}

            {/* Toggle Theme / Settings */}
            <ToggleContainer isAuthenticated={isAuthenticated} />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
