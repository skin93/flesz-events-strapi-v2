import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <main>
      <section className="my-8">
        <div className="flex flex-row gap-4">
          <Skeleton className="w-[50px] sm:w-[75px] md:w-[100px] xl:w-[165px] h-[33px] rounded-none" />
          <Skeleton className="w-[50px] sm:w-[75px] md:w-[100px] xl:w-[165px] h-[33px] rounded-none" />
          <Skeleton className="w-[50px] sm:w-[75px] md:w-[100px] xl:w-[165px] h-[33px] rounded-none" />
        </div>
        <Skeleton className="w-full h-[50px] my-4 rounded-none" />
        <Skeleton className="w-full h-[3px] my-4" />
        <div className="grid grid-cols-1 xl:grid-cols-[50%_40%] gap-2 justify-between">
          <div className=" w-full">
            <Skeleton className="aspect-video w-full h-100 rounded-sm" />
            <Skeleton className="w-full h-[3px] my-4" />
            <Skeleton className="w-full h-[100px] my-4 rounded-none" />
            <Skeleton className="w-full h-[100px] my-4 rounded-none" />
            <Skeleton className="w-full h-[100px] my-4 rounded-none" />
            <Skeleton className="w-full h-[100px] my-4 rounded-none" />
            <Skeleton className="w-full h-[3px] my-4" />
          </div>

          <div className="w-full flex-col justify-between items-start">
            <Skeleton className="w-[50%] h-[50px] rounded-none my-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 justify-center gap-4 mx-auto">
              <Skeleton className="aspect-video w-full 50 my-2 rounded-sm" />
              <Skeleton className="aspect-video w-full 50 my-2 rounded-sm" />
              <Skeleton className="aspect-video w-full 50 my-2 rounded-sm" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
