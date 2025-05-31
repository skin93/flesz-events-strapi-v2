import { Facebook, Youtube } from "lucide-react";
import { ButtonLink } from "../ui/custom/button-link";

export default function Footer() {
  const navLinks = [
    { title: "newsy", path: "/categories/newsy" },
    { title: "premiery", path: "/categories/premiery" },
    { title: "festiwale", path: "/categories/festiwale" },
    { title: "koncerty", path: "/categories/koncerty" },
    { title: "patronat", path: "/categories/patronat" },
    { title: "relacje", path: "/categories/relacje" },
    { title: "wywiady", path: "/categories/wywiady" },
  ];

  const items = [
    { title: "festiwalowa mapa", path: "/festival-map" },
    // { title: "galerie", path: "/galleries" },
    { title: "kontakt", path: "/contact" },
    { title: "tagi", path: "/tags" },
  ];

  return (
    <footer className="w-full my-8">
      <div className="flex flex-row justify-around items-center">
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
