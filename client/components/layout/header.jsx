"use client";

import React from "react";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import { Facebook, Youtube, Menu } from "lucide-react";

import Image from "next/image";

import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { ButtonLink } from "../ui/custom/button-link";
import SearchDialog from "../ui/custom/search-dialog";

const navLinks1 = [
  { title: "newsy", path: "/kategorie/newsy" },
  { title: "single", path: "/kategorie/single" },
  { title: "festiwale", path: "/kategorie/festiwale" },
  { title: "koncerty", path: "/kategorie/koncerty" },
  { title: "patronat", path: "/kategorie/patronat" },
  { title: "relacje", path: "/kategorie/relacje" },
  { title: "wywiady", path: "/kategorie/wywiady" },
];

const navLinks2 = [
  { title: "mapa", path: "/festiwalowa-mapa" },
  { title: "galerie", path: "/galerie" },
  { title: "kontakt", path: "/kontakt" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-md ">
      <div className="container flex h-14 items-center justify-between">
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
            <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent hover:text-accent-foreground py-2 px-4">
              WPISY
            </DropdownMenuTrigger>

            <DropdownMenuContent>
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
          <Drawer direction="right">
            <DrawerTrigger>
              <Menu />
            </DrawerTrigger>
            <DrawerContent>
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
