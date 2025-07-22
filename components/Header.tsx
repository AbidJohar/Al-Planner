"use client"

import Container from "./Container";
import NavMenu from "./NavMenu";

 
const Header = () => {
  return (
     <header className="p-4 min-md:px-6  min-md:py-8  border-b border-input sticky top-2  z-10 backdrop-blur min-md:backdrop-blur-none">

      <Container >
       <div className="min-md:border-white/15 rounded-xl p-2.5 flex items-center max-w-4xl mx-auto min-md:backdrop-blur-md justify-between border border-transparent">

       {/* logo */}
       <div className="font-bold text-lg bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
        AI Interior Planner
       </div>
       {/* menu */}
       <div className="hidden min-md:block">
        <NavMenu/>
       </div>
       {/* toggle */}

       </div>

        
      </Container>
     </header>
  )
}

export default Header;