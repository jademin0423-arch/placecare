import Link from "next/link";

interface Keyword {
  keyword: string;
  pageTitle?: string;
  slug: string;
}

interface KeywordCardsProps {
  keywords: Keyword[];
  limit?: number;
}

export function KeywordCards({ keywords, limit }: KeywordCardsProps) {
  const displayKeywords = limit ? keywords.slice(0, limit) : keywords;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
      {displayKeywords.map((item) => (
        <Link
          key={item.slug}
          href={`/${item.slug}`}
          className="bg-white border border-gray-200 rounded-lg p-6 hover:border-wedding-pink hover:shadow-md transition-all focus-ring"
        >
          <h3 className="text-lg font-semibold mb-2 text-gray-900 line-clamp-2">
            {item.pageTitle || item.keyword}
          </h3>
          <p className="text-gray-600 text-sm">{item.keyword}</p>
        </Link>
      ))}
    </div>
  );
}

