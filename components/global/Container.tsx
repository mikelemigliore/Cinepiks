import { cn } from "@/lib/utils";
import React from "react";


function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto max-w-full", className)}>{children}</div>;
}

export default Container;

//This Container component acts as a wrapper where the other components (Logo, Movie,Series,etc.) are put inside of.
//The children in the Container component refers to any content or JSX elements that are passed inside the Container when it is used.
//Why use a Container: To ensure that each component (Logo, Movies, etc.) is positioned within a consistent layout,
//while keeping layout concerns separate from the individual component logic.
