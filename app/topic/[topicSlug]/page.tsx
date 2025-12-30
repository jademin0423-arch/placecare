import { notFound } from "next/navigation";
import Link from "next/link";
import { generateSEOMetadata, generateBreadcrumbJSONLD, generateWebPageJSONLD, generateFAQJSONLD } from "@/lib/seo";
import { KeywordCards } from "@/components/site/components/KeywordCards";
import { Faq } from "@/components/site/components/Faq";
import { Byline } from "@/components/site/components/Byline";
import { SITE } from "@/lib/site";
import keywordsData from "@/data/keywords.json";
import hubsData from "@/data/hubs.json";

interface PageProps {
  params: Promise<{ topicSlug: string }>;
}

export async function generateStaticParams() {
  return hubsData
    .filter((hub) => hub.hubSlug.startsWith("topic-"))
    .map((hub) => ({
      topicSlug: hub.hubSlug.replace("topic-", ""),
    }));
}

export async function generateMetadata({ params }: PageProps) {
  const { topicSlug } = await params;
  const hub = hubsData.find(
    (h) => h.hubSlug === `topic-${topicSlug}`
  );
  
  if (!hub) {
    return {};
  }

  return generateSEOMetadata({
    title: hub.hubKeyword,
    description: `${hub.hubTitle} 관련 웨딩박람회 정보를 확인하세요. ${hub.keywords.length}개 이상의 정보를 제공합니다.`,
    canonical: `/topic/${topicSlug}`,
    ogImage: SITE.images.mainHero,
  });
}

export default async function TopicHubPage({ params }: PageProps) {
  const { topicSlug } = await params;
  const hub = hubsData.find(
    (h) => h.hubSlug === `topic-${topicSlug}`
  );

  if (!hub) {
    notFound();
  }

  // 해당 토픽의 모든 키워드
  const topicKeywords = keywordsData.filter((k) =>
    hub.keywords.includes(k.keyword)
  );

  // 대표 지역 허브 2개
  const regionHubs = hubsData
    .filter((h) => h.hubSlug.startsWith("region-"))
    .slice(0, 2);

  const faqs = [
    {
      question: `${hub.hubTitle} 관련 정보는 어디서 확인하나요?`,
      answer: `본 페이지에서 ${hub.hubTitle} 관련 웨딩박람회 정보를 확인하실 수 있습니다. 각 상세 페이지에서 더 자세한 정보를 제공합니다.`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJSONLD([
            { name: "홈", url: "/" },
            { name: hub.hubTitle, url: `/topic/${topicSlug}` },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWebPageJSONLD({
            title: hub.hubKeyword,
            description: `${hub.hubTitle} 관련 웨딩박람회 정보`,
            url: `/topic/${topicSlug}`,
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQJSONLD(faqs)),
        }}
      />

      <div className="container-custom py-8">
        {/* Hero */}
        <section className="mb-12">
          <nav className="text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-wedding-pink focus-ring">
              홈
            </Link>
            <span className="mx-2">/</span>
            <span>{hub.hubTitle}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {hub.hubKeyword}
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
            {hub.hubTitle} 관련 웨딩박람회 정보를 한눈에 확인하세요. 총 {topicKeywords.length}개의 정보를 제공합니다.
          </p>
        </section>

        {/* All Keywords */}
        <section className="my-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">전체 정보</h2>
          <KeywordCards keywords={topicKeywords} />
        </section>

        {/* Region Hubs */}
        <section className="my-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">지역별 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regionHubs.map((regionHub) => {
              const path = `/region/${regionHub.hubSlug.replace("region-", "")}`;
              return (
                <Link
                  key={regionHub.hubSlug}
                  href={path}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:border-wedding-pink hover:shadow-md transition-all focus-ring"
                >
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {regionHub.hubTitle}
                  </h3>
                  <p className="text-gray-600 text-sm">{regionHub.hubKeyword}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <Faq items={faqs} />

        <Byline />
      </div>
    </>
  );
}

