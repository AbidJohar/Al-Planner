import { NavRoutes } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs"
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavMenuProps {
    isMobile? : boolean
}

export default function NavMenu({isMobile}: NavMenuProps){
 
    const {isSignedIn} = useAuth();

    const pathname = usePathname();

    const filterRoues = NavRoutes.filter(route => !route.protected || isSignedIn)

    return (
        <div className={cn("flex gap-8", isMobile && "flex-col items-start gap-10")}>
          {
            filterRoues.map((route)=> {
                //   const isActive = pathname.startsWith(route.link);
                const isActive = route.link === "/" ? pathname === "/" : pathname.startsWith(route.link)

                return(
                     <Link className={cn("text-white/60 hover:text-white transition", isActive && "font-semibold text-white")} key={route.link} href={route.link}>{route.label}</Link>
                )
            })
          }
        </div>
    )
}