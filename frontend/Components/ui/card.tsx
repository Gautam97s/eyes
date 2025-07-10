import { CardSpotlight } from "./card-spotlight";

import * as React from "react";
import { cn } from "@/Lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border bg-white text-black shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-white",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4 pt-0", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

export { Card, CardContent };
