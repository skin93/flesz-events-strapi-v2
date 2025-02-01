import { Facebook, Youtube } from "lucide-react";
import { ButtonLink } from "../ui/custom/button-link";

export default function Footer() {
  const navLinks = [
    { title: "newsy", path: "/kategorie/newsy" },
    { title: "festiwale", path: "/kategorie/festiwale" },
    { title: "koncerty", path: "/kategorie/koncerty" },
    { title: "patronat", path: "/kategorie/patronat" },
    { title: "relacje", path: "/kategorie/relacje" },
    { title: "wywiady", path: "/kategorie/wywiady" },
    { title: "galerie", path: "/galerie" },
  ];

  const items = [
    { title: "tagi", path: "/tagi" },
    { title: "kontakt", path: "/kontakt" },
  ];

  return (
    <footer className="w-full my-8">
      <div className="container flex flex-row justify-between items-center">
        <div className="flex flex-col items-start">
          {navLinks.map(({ title, path }) => (
            <ButtonLink className="ml-[-1rem]" key={title} href={path}>
              {title}
            </ButtonLink>
          ))}
        </div>
        <div className="flex flex-col items-start">
          {items.map(({ title, path }) => (
            <ButtonLink className="mx-auto" key={title} href={path}>
              {title}
            </ButtonLink>
          ))}
        </div>

        <div className="flex flex-col items-start">
          <ButtonLink
            className="mr-[-1rem]"
            href="https://facebook.com/flesz.events"
          >
            <Facebook />
          </ButtonLink>
          <ButtonLink
            className="mr-[-1rem]"
            href="https://www.youtube.com/channel/UCtJGqTQUcJRNVi4gBqVqAfg"
          >
            <Youtube />
          </ButtonLink>
        </div>
      </div>
      <p className="text-center mt-8">&copy; FleszEvents</p>
    </footer>
  );
}
