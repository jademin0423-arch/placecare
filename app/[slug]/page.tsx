import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { generateSEOMetadata, generateBreadcrumbJSONLD, generateArticleJSONLD, generateFAQJSONLD } from "@/lib/seo";
import { selectImagesForSlug, generateImageAlt } from "@/lib/images";
import { Toc } from "@/components/site/components/Toc";
import { ChecklistBox } from "@/components/site/components/ChecklistBox";
import { DisclosureBox } from "@/components/site/components/DisclosureBox";
import { KeywordCards } from "@/components/site/components/KeywordCards";
import { Byline } from "@/components/site/components/Byline";
import { SITE } from "@/lib/site";
import keywordsData from "@/data/keywords.json";
import hubsData from "@/data/hubs.json";
import { legacySlugs } from "@/data/legacySlugs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // legacySlugs + keywords.json의 모든 slug
  const allSlugs = [
    ...legacySlugs,
    ...keywordsData.map((k) => k.slug),
  ];
  
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const keyword = keywordsData.find((k) => k.slug === slug);
  const isLegacy = legacySlugs.includes(slug);
  
  if (!keyword && !isLegacy) {
    return {};
  }

  const title = keyword?.pageTitle || keyword?.keyword || slug;
  const description = keyword
    ? `${keyword.keyword} 정보를 확인하세요. 일정, 혜택, 참가 업체 등 상세 정보를 제공합니다.`
    : `${slug} 웨딩박람회 정보를 확인하세요.`;
  const images = selectImagesForSlug(slug, 1);
  const ogImage = images[0] || SITE.images.mainHero;

  return generateSEOMetadata({
    title: title,
    description,
    canonical: `/${slug}`,
    ogImage,
    type: "article",
    author: SITE.editorial.authorName,
  });
}

export default async function DetailPage({ params }: PageProps) {
  const { slug } = await params;
  const keyword = keywordsData.find((k) => k.slug === slug);
  const isLegacy = legacySlugs.includes(slug);

  if (!keyword && !isLegacy) {
    notFound();
  }

  // Legacy slug인 경우 기본 정보 생성
  const keywordData = keyword || {
    keyword: slug,
    pageTitle: slug,
    slug,
    regionSlug: undefined,
    topicSlug: undefined,
    type: "detail" as const,
    priority: 1,
    isBrand: false,
  };

  // 이미지 선택
  const images = selectImagesForSlug(slug, 4);

  // 허브 찾기
  const hub = keywordData.regionSlug
    ? hubsData.find((h) => h.hubSlug === `region-${keywordData.regionSlug}`)
    : keywordData.topicSlug
    ? hubsData.find((h) => h.hubSlug === `topic-${keywordData.topicSlug}`)
    : null;

  // 형제 상세 2개 (같은 허브 내)
  const siblings = keywordsData
    .filter((k) => {
      if (k.slug === slug) return false;
      if (keywordData.regionSlug && k.regionSlug === keywordData.regionSlug) return true;
      if (keywordData.topicSlug && k.topicSlug === keywordData.topicSlug) return true;
      return false;
    })
    .slice(0, 2);

  // 가이드 링크 1개
  const guideLink = keywordData.regionSlug
    ? keywordsData.find((k) => k.topicSlug === "guide")
    : keywordData.topicSlug
    ? keywordsData.find((k) => k.topicSlug === keywordData.topicSlug && k.type === "guide")
    : null;

  const relatedLinks = [
    ...siblings,
    ...(guideLink ? [guideLink] : []),
  ].slice(0, 3);

  // TOC 항목
  const tocItems = [
    { id: "overview", title: "개요", level: 2 },
    { id: "schedule", title: "일정 및 장소", level: 2 },
    { id: "benefits", title: "혜택 및 특전", level: 2 },
    { id: "preparation", title: "준비사항", level: 2 },
    { id: "tips", title: "유의사항", level: 2 },
  ];

  const faqs = [
    {
      question: `${keywordData.keyword} 일정은 어떻게 확인하나요?`,
      answer: `본 페이지에서 ${keywordData.keyword}의 일정 정보를 확인하실 수 있습니다. 정확한 일정은 주최사 공식 채널에서 최종 확인하시기 바랍니다.`,
    },
    {
      question: `${keywordData.keyword} 참가 시 준비물은 무엇인가요?`,
      answer: `신분증, 명함, 결혼 예정일 및 예산 계획 등을 준비하시면 더 효율적으로 상담받을 수 있습니다.`,
    },
  ];

  const breadcrumbItems = [
    { name: "홈", url: "/" },
    ...(hub
      ? [
          {
            name: hub.hubTitle,
            url: keywordData.regionSlug
              ? `/region/${keywordData.regionSlug}`
              : `/topic/${keywordData.topicSlug}`,
          },
        ]
      : []),
    { name: keywordData.pageTitle || keywordData.keyword, url: `/${slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJSONLD(breadcrumbItems)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateArticleJSONLD({
            title: keywordData.pageTitle || keywordData.keyword,
            description: `${keywordData.keyword} 정보`,
            url: `/${slug}`,
            author: SITE.editorial.authorName,
            image: images[0],
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
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
          {breadcrumbItems.map((item, index) => (
            <span key={index}>
              {index > 0 && <span className="mx-2">/</span>}
              {index < breadcrumbItems.length - 1 ? (
                <Link href={item.url} className="hover:text-wedding-pink focus-ring">
                  {item.name}
                </Link>
              ) : (
                <span>{item.name}</span>
              )}
            </span>
          ))}
        </nav>

        {/* Hero */}
        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {keywordData.pageTitle || keywordData.keyword}
          </h1>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <p className="text-gray-700 leading-relaxed">
              {keywordData.keyword}에 대한 상세 정보를 제공합니다. 일정, 장소, 혜택, 준비사항 등을 확인하실 수 있습니다.
            </p>
          </div>
        </section>

        {/* TOC */}
        <Toc items={tocItems} />

        {/* Content Sections */}
        <article className="prose prose-lg max-w-none">
          {/* Overview */}
          <section id="overview" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">개요</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {keywordData.keyword}는 예비부부를 위한 종합 웨딩 정보 제공 행사입니다. 
              웨딩홀, 스드메, 혼수, 신혼여행 등 결혼 준비에 필요한 모든 정보를 한자리에서 확인하실 수 있습니다.
            </p>
            {images[0] && (
              <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden my-6">
                <Image
                  src={images[0]}
                  alt={generateImageAlt(keywordData.keyword, 0, images.length)}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </section>

          {/* Schedule */}
          <section id="schedule" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">일정 및 장소</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {keywordData.keyword}의 정확한 일정과 장소 정보는 주최사 공식 채널에서 확인하시기 바랍니다. 
              일정은 주최사 사정에 따라 변경될 수 있으니 방문 전 반드시 최종 확인하세요.
            </p>
            {images[1] && (
              <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden my-6">
                <Image
                  src={images[1]}
                  alt={generateImageAlt(keywordData.keyword, 1, images.length)}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </section>

          {/* Benefits */}
          <section id="benefits" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">혜택 및 특전</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {keywordData.keyword} 참가 시 다양한 혜택을 받으실 수 있습니다. 사전 등록 시 추가 혜택이 제공될 수 있으니 
              미리 확인하시기 바랍니다.
            </p>
            {images[2] && (
              <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden my-6">
                <Image
                  src={images[2]}
                  alt={generateImageAlt(keywordData.keyword, 2, images.length)}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </section>

          {/* Preparation */}
          <section id="preparation" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">준비사항</h2>
            <ChecklistBox
              title="방문 전 체크리스트"
              items={[
                "결혼 예정일 및 예산 범위 정하기",
                "원하는 웨딩 스타일 정리",
                "비교할 업체 리스트 작성",
                "질문 사항 미리 정리",
                "신분증 및 명함 준비",
              ]}
            />
            {images[3] && (
              <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden my-6">
                <Image
                  src={images[3]}
                  alt={generateImageAlt(keywordData.keyword, 3, images.length)}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </section>

          {/* Tips */}
          <section id="tips" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">주의사항 및 안내</h2>
            <DisclosureBox>
              <p>
                본 사이트는 웨딩박람회 정보 제공 사이트이며, 박람회 주최·운영사가 아닙니다.
                일정 및 혜택 정보는 변동될 수 있으니 반드시 공식 채널에서 최종 확인하시기 바랍니다.
                최종 판단 및 계약 책임은 사용자에게 있습니다.
              </p>
              <p className="mt-2">
                사칭 및 피싱에 주의하시고, 유료 결제 유도에 신중하시기 바랍니다.
              </p>
            </DisclosureBox>
          </section>
        </article>

        {/* Related Links */}
        <section className="my-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">관련 정보</h2>
          <KeywordCards keywords={relatedLinks} />
        </section>

        {/* FAQ */}
        <Faq items={faqs} />

        <Byline lastUpdated={SITE.editorial.lastUpdatedDefault} />
      </div>
    </>
  );
}

