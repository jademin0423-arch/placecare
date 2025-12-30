import Link from "next/link";
import hubsData from "@/data/hubs.json";

interface HubCardsProps {
  excludeSlug?: string;
  limit?: number;
}

export function HubCards({ excludeSlug, limit }: HubCardsProps) {
  const hubs = hubsData.filter((hub) => hub.hubSlug !== excludeSlug);
  const displayHubs = limit ? hubs.slice(0, limit) : hubs;
  
  const getHubPath = (hubSlug: string) => {
    if (hubSlug.startsWith("region-")) {
      return `/region/${hubSlug.replace("region-", "")}`;
    }
    if (hubSlug.startsWith("topic-")) {
      return `/topic/${hubSlug.replace("topic-", "")}`;
    }
    return `/#${hubSlug}`;
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
      {displayHubs.map((hub) => (
        <Link
          key={hub.hubSlug}
          href={getHubPath(hub.hubSlug)}
          className="bg-white border border-gray-200 rounded-lg p-6 hover:border-wedding-pink hover:shadow-md transition-all focus-ring"
        >
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            {hub.hubTitle}
          </h3>
          <p className="text-gray-600 text-sm mb-4">{hub.hubKeyword}</p>
          <p className="text-gray-500 text-xs">
            {hub.keywords.length}개 키워드
          </p>
        </Link>
      ))}
    </div>
  );
}

