

import { Features } from "@/components/sections/Features";
import {Hero} from "@/components/sections/Hero";
import { LogoTicker } from "@/components/sections/logo-ticker";
import { auth} from "@clerk/nextjs/server";

// export const revalidate = 86400; // Revalidate every 24 hours (because of auth(), its not full static)

 
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
