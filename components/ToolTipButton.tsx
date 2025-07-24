 "use client"

 import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";

type ButtonVariant = "default" | "outline" | "ghost" | "destructive" | "link" | "secondry" | null | undefined;
type ButtonSize = "default" |  "sm" | "md" | "icon";

interface tooltipButtonProps {
     content : string,
     icon : React.ReactNode,
     onClick : ()=> void,
     label? : string,
     buttonVariant? : ButtonVariant,
     buttonSize? : ButtonSize,
     buttonClassName? : string,
     delay?: number,
     disable?: boolean,
     loading? : boolean,
     tooltipContent?: React.ReactNode
}

const ToolTipButton = ( {
    content,
    icon,
    onClick,
    label,
    buttonVariant = "ghost",
    buttonSize ="icon",
    buttonClassName = "",
    delay = 0,
    disable = false,
    loading = false,
    tooltipContent
} : tooltipButtonProps) => {
  return <TooltipProvider delayDuration={delay}>
<Tooltip>
  <TooltipTrigger asChild className={`${disable ? "cursor-not-allowed" : "cursor-pointer"}`}>
    <Button 
    aria-label={label || content}
     size = {buttonSize}
     variant = {buttonVariant}
     disabled = {disable}
     className= {buttonClassName}
     onClick= {onClick}
    >
    { loading ? <Loader className="min-w-4 min-h-4 animate-spin" /> : <>
     {icon}
     {label && <span className="mr-2"> {label}</span>}
    </>}
    </Button>
    </TooltipTrigger>
  <TooltipContent>
    <p>{tooltipContent || (loading ? "loading.." : content)}</p>
  </TooltipContent>
</Tooltip>
  </TooltipProvider>
}

export default ToolTipButton
