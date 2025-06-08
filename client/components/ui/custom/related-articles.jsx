import Link from "next/link";
import React from "react";
import BaseCard from "./base-card";

export default function RelatedArticles({ articles }) {
  return (
    <div
      className="w-full flex-col justify-between items-start"
      aria-label="related-articles"
    >
      <h2 className="my-6 font-bold uppercase">Zobacz także</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-center gap-4 mx-auto">
        {articles.map((article) => (
          <div key={article.id}>
            <Link href={`/articles/${article.slug}`}>
              <BaseCard article={article} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
