import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
    className ? : string;
    children : ReactNode
}

export default function Container( {className, children}: ContainerProps){
    return (
        <div className={cn("container mx-auto", className)}>{children}</div>
    )
}

