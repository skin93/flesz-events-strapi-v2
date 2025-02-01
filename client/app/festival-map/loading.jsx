import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function MapLoading() {
  return (
    <Skeleton className="absolute top-[560px] inset-0 h-[calc(100svh-56px])] w-full" />
  );
}
