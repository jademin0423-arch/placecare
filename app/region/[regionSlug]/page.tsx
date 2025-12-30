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
  params: Promise<{ regionSlug: string }>;
}

export async function generateStaticParams() {
  return hubsData
    .filter((hub) => hub.hubSlug.startsWith("region-"))
    .map((hub) => ({
      regionSlug: hub.hubSlug.replace("region-", ""),
    }));
}

export async function generateMetadata({ params }: PageProps) {
  const { regionSlug } = await params;
  const hub = hubsData.find(
    (h) => h.hubSlug === `region-${regionSlug}`
  );
  
  if (!hub) {
    return {};
  }

  return generateSEOMetadata({
    title: hub.hubKeyword,
    description: `${hub.hubTitle} 지역의 웨딩박람회 일정, 후기, 추천 정보를 확인하세요. ${hub.keywords.length}개 이상의 웨딩박람회 정보를 제공합니다.`,
    canonical: `/region/${regionSlug}`,
    ogImage: SITE.images.mainHero,
  });
}

export default async function RegionHubPage({ params }: PageProps) {
  const { regionSlug } = await params;
  const hub = hubsData.find(
    (h) => h.hubSlug === `region-${regionSlug}`
  );

  if (!hub) {
    notFound();
  }

  // 해당 지역의 모든 키워드
  const regionKeywords = keywordsData.filter((k) =>
    hub.keywords.includes(k.keyword)
  );

  // 대표 상세 6개
  const representativeKeywords = regionKeywords.slice(0, 6);

  const faqs = [
    {
      question: `${hub.hubTitle} 지역 웨딩박람회는 언제 열리나요?`,
      answer: `${hub.hubTitle} 지역의 웨딩박람회는 연중 계속 개최됩니다. 각 박람회의 상세 페이지에서 정확한 일정을 확인하실 수 있습니다.`,
    },
    {
      question: `${hub.hubTitle} 지역 박람회 특징은 무엇인가요?`,
      answer: `${hub.hubTitle} 지역은 지역 특성에 맞는 웨딩 스타일과 업체들이 참가합니다. 각 박람회마다 다른 특징이 있으니 상세 페이지를 참고하세요.`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJSONLD([
            { name: "홈", url: "/" },
            { name: hub.hubTitle, url: `/region/${regionSlug}` },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWebPageJSONLD({
            title: hub.hubKeyword,
            description: `${hub.hubTitle} 지역의 웨딩박람회 정보`,
            url: `/region/${regionSlug}`,
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
            {hub.hubTitle} 지역의 웨딩박람회 정보를 한눈에 확인하세요. 지역 특성에 맞는 웨딩 스타일과 업체들을 만나보실 수 있습니다.
            총 {regionKeywords.length}개의 웨딩박람회 정보를 제공합니다.
          </p>
        </section>

        {/* Representative Keywords */}
        <section className="my-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">추천 웨딩박람회</h2>
          <KeywordCards keywords={representativeKeywords} />
        </section>

        {/* All Keywords */}
        <section className="my-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">전체 웨딩박람회</h2>
          <KeywordCards keywords={regionKeywords} />
        </section>

        {/* Link to Schedule */}
        <section className="my-12 text-center">
          <Link
            href="/wedding-fair-schedule"
            className="inline-block px-6 py-3 text-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus-ring rounded-md transition-colors"
          >
            이 지역 웨딩박람회 일정 한눈에 보기
          </Link>
        </section>

        {/* FAQ */}
        <Faq items={faqs} />

        <Byline />
      </div>
    </>
  );
}

