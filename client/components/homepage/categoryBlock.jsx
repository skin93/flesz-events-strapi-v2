import Link from "next/link";
import BaseCard from "../ui/custom/base-card";
import { ReadMoreLink } from "../ui/custom/button-link";

export default function CategoryBlock({ articles, name, slug }) {
  return (
    <section
      aria-label={`Latest ${name}`}
      className="flex flex-col justify-center items-center"
    >
      <h1 className="my-8 text-center font-bold">{slug.toUpperCase()}</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {articles?.map((article) => (
          <div key={article.id}>
            <Link href={`/articles/${article.slug}`}>
              <BaseCard article={article} />
            </Link>
          </div>
        ))}
      </div>
      <ReadMoreLink href={`/categories/${slug}`} />
    </section>
  );
}
