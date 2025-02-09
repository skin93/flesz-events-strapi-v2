import Link from "next/link";
import BaseCard from "../ui/custom/base-card";
import { ReadMoreLink } from "../ui/custom/button-link";

export default function News({ news }) {
  return (
    <section
      aria-label="Latest news"
      className="flex flex-col justify-center items-center"
    >
      <h1 className="my-8 text-center text-4xl font-bold">OSTATNIE NEWSY</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {news?.map((article) => (
          <div key={article.id}>
            <Link href={`/articles/${article.slug}`}>
              <BaseCard article={article} />
            </Link>
          </div>
        ))}
      </div>
      <ReadMoreLink href="/categories/newsy" />
    </section>
  );
}
