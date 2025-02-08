import React from "react";
import { Button } from "../button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ButtonLink({ href, children, className }) {
  return (
    <Button className={cn(className, "uppercase")} variant={"ghost"}>
      <Link href={href}>{children}</Link>
    </Button>
  );
}

export function ReadMoreLink({ href, className }) {
  return (
    <Button
      className={cn(className, "uppercase m-8 font-bold")}
      variant={"default"}
    >
      <Link href={href}>ZOBACZ WIĘCEJ</Link>
    </Button>
  );
}
