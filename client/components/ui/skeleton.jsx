import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-foreground dark:bg-foreground",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
