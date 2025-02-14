"use client";

import React from "react";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import { Facebook, Youtube, Menu } from "lucide-react";

import Image from "next/image";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { ButtonLink } from "../ui/custom/button-link";
import SearchDialog from "../ui/custom/search-dialog";

const navLinks1 = [
  { title: "newsy", path: "/categories/newsy" },
  { title: "single", path: "/categories/single" },
  { title: "festiwale", path: "/categories/festiwale" },
  { title: "koncerty", path: "/categories/koncerty" },
  { title: "relacje", path: "/categories/relacje" },
  { title: "wywiady", path: "/categories/wywiady" },
];

const navLinks2 = [
  { title: "patronat", path: "/categories/patronat" },
  { title: "mapa", path: "/festival-map" },
  // { title: "galerie", path: "/galleries" },
  { title: "kontakt", path: "/contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-md ">
      <div className="flex h-14 items-center justify-between">
        <Link
          href="/"
          className="flex shrink-0 justify-start items-center relative w-[100px] h-full mr-4"
        >
          <Image
            priority
            fill
            src="/FE_1_baner.svg"
            className="cursor-pointer w-full h-full "
            alt="logo"
          />
          <Image
            priority
            fill
            src="/FE_2_baner.svg"
            className="cursor-pointer w-full h-full dark:hidden"
            alt="logo"
          />
        </Link>

        <nav
          aria-label="main-navigation"
          className="hidden xl:flex justify-start items-center gap-2 flex-1"
        >
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:cursor-pointer hover:bg-foreground bg-background dark:hover:bg-accent hover:text-accent-foreground py-2 px-4">
              WPISY
            </DropdownMenuTrigger>

            <DropdownMenuContent className="z-1000">
              {navLinks1.map(({ title, path }) => (
                <DropdownMenuItem className="h-10" key={title}>
                  <Link className="uppercase" href={path}>
                    {title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {navLinks2.map(({ title, path }) => (
            <ButtonLink key={title} href={path}>
              {title}
            </ButtonLink>
          ))}
        </nav>
        <div className="hidden xl:flex justify-end items-center gap-2">
          <ButtonLink href="https://facebook.com/flesz.events">
            <Facebook />
          </ButtonLink>
          <ButtonLink href="https://www.youtube.com/channel/UCtJGqTQUcJRNVi4gBqVqAfg">
            <Youtube />
          </ButtonLink>
          <ModeToggle />
          <SearchDialog />
        </div>
        <div className="xl:hidden">
          <Drawer direction="bottom">
            <DrawerTrigger>
              <Menu />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="hidden">
                <DrawerTitle>Menu</DrawerTitle>
                <DrawerDescription>Menu with nav links</DrawerDescription>
              </DrawerHeader>
              {navLinks1.map(({ title, path }) => (
                <ButtonLink key={title} href={path}>
                  {title}
                </ButtonLink>
              ))}
              {navLinks2.map(({ title, path }) => (
                <ButtonLink key={title} href={path}>
                  {title}
                </ButtonLink>
              ))}
              <ButtonLink href="https://facebook.com/flesz.events">
                <Facebook />
              </ButtonLink>
              <ButtonLink href="https://www.youtube.com/channel/UCtJGqTQUcJRNVi4gBqVqAfg">
                <Youtube />
              </ButtonLink>
              <SearchDialog />
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}
