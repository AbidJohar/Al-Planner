import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import NavMenu from "./NavMenu";
import GenerateButton from "./GenerateButton";
import { useState } from "react";

interface toggleContainerProps {
  isAuthenticated?: boolean;
}


export default function ToggleContainer({
  isAuthenticated,
}: toggleContainerProps) {
  
     const [open, setOpen] = useState<boolean>(false)



  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu className="min-md:hidden" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <div className=" p-6 space-y-7">
           <NavMenu isMobile onNavClick = {()=> setOpen(false)} />
           <GenerateButton label="Generate" />
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
