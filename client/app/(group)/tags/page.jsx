import { notFound } from "next/navigation";
import React from "react";
import { ButtonLink } from "@/components/ui/custom/button-link";
import { connection } from "next/server";
import { ALL_TAGS_QUERY } from "@/lib/queries/tags/allTagsQuery";
import { fetcher } from "@/lib/fetcher";

export const revalidate = 60;

export async function generateMetadata() {
  return {
    title: "Tagi",
    description: "Zbiór wszystki tagów zawartych na stronie",
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    alternates: {
      canonical: "/tagi",
    },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: process.env.NEXT_PUBLIC_APP_DOMAIN,
      title: process.env.NEXT_PUBLIC_APP_NAME,
      description: "Zbiór wszystki tagów zawartych na stronie",
      siteName: process.env.NEXT_PUBLIC_APP_NAME,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/logo-publikacja.jpeg`,
          width: 1280,
          height: 630,
          alt: "Flesz.Events logo",
        },
      ],
    },
  };
}

export default async function TagsPage() {
  const { tags } = await fetcher(ALL_TAGS_QUERY);

  if (!tags || tags.length === 0) {
    notFound();
  }

  return (
    <main>
      <section aria-label="Tags">
        <h1 className="my-8 text-center font-bold uppercase">TAGI</h1>
        <div>
          {tags.map((tag) => (
            <ButtonLink
              className="text-wrap dark:text-neutral-400"
              key={tag.id}
              href={`/tags/${tag.slug}`}
            >
              #{tag.name}
            </ButtonLink>
          ))}
        </div>
        <div className="my-4" />
        {/* <CustomPagination
          currentPage={currentPage}
          pageCount={Number(pagination?.pageCount)}
        /> */}
      </section>
    </main>
  );
}
