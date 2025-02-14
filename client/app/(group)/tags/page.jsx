import { notFound } from "next/navigation";
import React from "react";
import { ButtonLink } from "@/components/ui/custom/button-link";
import { connection } from "next/server";
import { ALL_TAGS_QUERY } from "@/lib/queries/tags/allTagsQuery";
import { fetchWithArgs } from "@/lib/fetcher";
import CustomPagination from "@/components/ui/custom/pagination";

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

export default async function TagsPage({ searchParams }) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 40;
  const start = currentPage * limit - limit;
  const { tags, tagsConnection } = await fetchWithArgs(ALL_TAGS_QUERY, {
    start,
    limit,
  });

  const total = tagsConnection.aggregate.totalCount;

  const pageCount = Math.ceil(total / limit);

  if (!tags || tags.length === 0) {
    notFound();
  }

  return (
    <main>
      <section aria-label="Tags">
        <h1 className="my-8 text-center font-bold uppercase">TAGI</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
          {tags.map((tag) => (
            <ButtonLink key={tag.id} href={`/tags/${tag.slug}`}>
              #{tag.name}
            </ButtonLink>
          ))}
        </div>
        <div className="my-8" />
        <CustomPagination
          currentPage={currentPage}
          pageCount={Number(pageCount)}
        />
      </section>
    </main>
  );
}
