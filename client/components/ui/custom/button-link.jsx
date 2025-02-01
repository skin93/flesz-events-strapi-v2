import React from "react";
import { Button } from "../button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ButtonLink({ href, children, className }) {
  return (
    <Button className={cn(className, "uppercase")} variant={"ghost"}>
      <Link href={href} className="text-foreground hover:text-foreground">
        {children}
      </Link>
    </Button>
  );
}

export function ReadMoreLink({ href, className }) {
  return (
    <Button className={cn(className, "uppercase")} variant={"outline"}>
      <Link href={href} className="text-foreground">
        ZOBACZ WIĘCEJ
      </Link>
    </Button>
  );
}
