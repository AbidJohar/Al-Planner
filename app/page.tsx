

import { Features } from "@/components/sections/Features";
import {Hero} from "@/components/sections/Hero";
import { LogoTicker } from "@/components/sections/logo-ticker";
import { auth} from "@clerk/nextjs/server";

 
const HomePage = async () => {
   
       const {userId, isAuthenticated} = await auth();
  return (
    <>
      
      <Hero userId={userId} isAuthenticated= {isAuthenticated} />
      <LogoTicker />
      <Features />
    </>
  );
};

export default HomePage;
