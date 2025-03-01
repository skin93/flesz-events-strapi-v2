import React from "react";
import { Button } from "../button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ButtonLink({ href, children, className }) {
  return (
    <Button
      aria-label="button-link"
      className={cn(className, "uppercase")}
      variant={"ghost"}
    >
      <Link aria-label={`Link to ${href}`} href={href}>
        {children}
      </Link>
    </Button>
  );
}

export function ReadMoreLink({ href, className }) {
  return (
    <Button
      aria-label="read-more-button"
      className={cn(className, "uppercase m-8 font-bold")}
      variant={"outline"}
    >
      <Link href={href}>ZOBACZ WIĘCEJ</Link>
    </Button>
  );
}
