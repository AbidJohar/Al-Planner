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

interface toggleContainerProps {
  isAuthenticated?: boolean;
}

export default function ToggleContainer({
  isAuthenticated,
}: toggleContainerProps) {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="min-md:hidden" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <div className=" p-6 space-y-7">
           <NavMenu isMobile />
           <GenerateButton label="Generate" />
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
