import Link from "next/link";
import BaseCard from "../ui/custom/base-card";
import { ReadMoreLink } from "../ui/custom/button-link";

export default function Festivals({ festivals }) {
  return (
    <section
      aria-label="Latest festivals"
      className="flex flex-col justify-center items-center"
    >
      <h1 className="my-8 text-center text-4xl font-bold">
        OSTATNIE FESTIWALE
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {festivals?.map((article) => (
          <div key={article.id}>
            <Link href={`/articles/${article.slug}`}>
              <BaseCard article={article} />
            </Link>
          </div>
        ))}
      </div>
      <ReadMoreLink href="/categories/festivals" />
    </section>
  );
}
