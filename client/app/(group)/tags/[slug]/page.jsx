import BaseCard from "@/components/ui/custom/base-card";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchWithArgs } from "@/lib/fetcher";
import { SINGLE_TAG_QUERY } from "@/lib/queries/tags/singleTagQuery";

export default async function TagPage({ params }) {
  const { slug } = await params;
  const { tags } = await fetchWithArgs(SINGLE_TAG_QUERY, {
    slug,
  });

  if (!tags[0] || tags[0].length === 0) {
    notFound();
  }

  const articles = tags[0].articles;

  return (
    <main>
      <section
        aria-label={`${tags[0].name} content`}
        className="flex flex-col justify-center items-center"
      >
        <h1 className="my-8 text-center text-4xl font-bold uppercase">
          {tags[0].name}
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <div key={article.id}>
              <Link href={`/articles/${article.slug}`}>
                <BaseCard article={article} />
              </Link>
            </div>
          ))}
        </div>
        <div className="m-8" />
      </section>
    </main>
  );
}
