import Link from "next/link";
import BaseCard from "../ui/custom/base-card";
import { ReadMoreLink } from "../ui/custom/button-link";

export default function Singles({ singles }) {
  return (
    <section
      aria-label="Latest singles"
      className="flex flex-col justify-center items-center"
    >
      <h1 className="my-8 text-center text-4xl font-bold">OSTATNIE SINGLE</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {singles?.map((article) => (
          <div key={article.id}>
            <Link href={`/articles/${article.slug}`}>
              <BaseCard article={article} />
            </Link>
          </div>
        ))}
      </div>
      <ReadMoreLink href="/categories/singles" />
    </section>
  );
}
