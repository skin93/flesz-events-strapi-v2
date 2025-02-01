"use client";
import dynamic from "next/dynamic";
import { Skeleton } from "../skeleton";

const LazyMap = dynamic(() => import("@/components/ui/custom/map"), {
  ssr: false,
  loading: () => (
    <Skeleton className="absolute top-[560px] inset-0 h-[calc(100svh-56px])] w-full" />
  ),
});

export default LazyMap;
