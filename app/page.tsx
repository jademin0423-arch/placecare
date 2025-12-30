import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { generateSEOMetadata, generateBreadcrumbJSONLD, generateOrganizationJSONLD, generateWebSiteJSONLD, generateFAQJSONLD } from "@/lib/seo";
import { HubCards } from "@/components/site/components/HubCards";
import { KeywordCards } from "@/components/site/components/KeywordCards";
import { ChecklistBox } from "@/components/site/components/ChecklistBox";
import { DisclosureBox } from "@/components/site/components/DisclosureBox";
import { Faq } from "@/components/site/components/Faq";
import { Byline } from "@/components/site/components/Byline";
import keywordsData from "@/data/keywords.json";
import hubsData from "@/data/hubs.json";

export const metadata = generateSEOMetadata({
  title: "웨딩박람회",
  description: "전국 웨딩박람회 일정, 후기, 추천 정보를 한눈에 확인하세요. 서울, 경기, 인천, 부산, 대전 등 지역별 웨딩박람회 정보와 무료 초대권 신청 방법을 안내합니다.",
  canonical: "/",
  ogImage: SITE.images.mainHero,
});

export default function HomePage() {
  // 지역별 대표 상세 1개씩 선택
  const regionRepresentatives = hubsData
    .filter((hub) => hub.hubSlug.startsWith("region-"))
    .map((hub) => {
      const keyword = keywordsData.find((k) => 
        hub.keywords.includes(k.keyword)
      );
      return keyword;
    })
    .filter(Boolean)
    .slice(0, 8);

  // 인기/최신 하부 상세 9~12개
  const popularKeywords = keywordsData.slice(0, 12);

  const faqs = [
    {
      question: "웨딩박람회는 언제 열리나요?",
      answer: "웨딩박람회는 연중 계속 열리며, 특히 봄(3~5월)과 가을(9~11월)에 많이 개최됩니다. 지역별로 일정이 다르므로 각 지역 허브 페이지에서 확인하실 수 있습니다.",
    },
    {
      question: "웨딩박람회 입장료는 얼마인가요?",
      answer: "대부분의 웨딩박람회는 무료 입장이지만, 일부는 사전 등록이나 초대권이 필요할 수 있습니다. 각 박람회 상세 페이지에서 입장 방법을 확인하세요.",
    },
    {
      question: "웨딩박람회에서 무엇을 준비해야 하나요?",
      answer: "결혼 예정일, 예산 계획, 원하는 스타일 등을 미리 정리해 가시면 더 효율적으로 상담받을 수 있습니다. 체크리스트를 참고하세요.",
    },
    {
      question: "웨딩박람회에서 바로 계약해야 하나요?",
      answer: "아니요, 바로 계약할 필요는 없습니다. 여러 업체를 비교하고 신중하게 결정하시기 바랍니다. 일정과 혜택은 변동될 수 있으니 주의하세요.",
    },
    {
      question: "웨딩박람회 혜택은 어떤 것이 있나요?",
      answer: "박람회마다 다르지만, 일반적으로 사전 예약 할인, 추가 사은품, 무료 상담, 특별 프로모션 등의 혜택이 제공됩니다.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJSONLD([
            { name: "홈", url: "/" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateOrganizationJSONLD()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWebSiteJSONLD()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQJSONLD(faqs)),
        }}
      />

      <div className="container-custom py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-6">
            <Image
              src={SITE.images.mainHero}
              alt="예비부부를 위한 전국 웨딩박람회 일정과 체크리스트 안내"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            전국 웨딩박람회 일정·후기·추천 종합 가이드
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
            결혼 준비의 첫걸음, 웨딩박람회에서 시작하세요. 서울, 경기, 인천, 부산, 대전 등 전국 각 지역의 웨딩박람회 일정과 정보를 한눈에 확인하고, 
            무료 초대권 신청부터 박람회 준비 체크리스트까지 모든 것을 준비해드립니다. 지역별, 유형별로 분류된 상세 정보로 여러분의 완벽한 결혼 준비를 돕습니다.
          </p>
        </section>

        {/* Checklist */}
        <ChecklistBox
          title="웨딩박람회 방문 전 체크리스트"
          items={[
            "결혼 예정일과 예산 범위 정하기",
            "원하는 웨딩 스타일과 컨셉 정리",
            "박람회 일정 확인 및 사전 등록",
            "비교할 업체 리스트 작성",
            "질문 사항 미리 정리",
            "신분증 및 명함 준비",
          ]}
        />

        {/* Region Hubs */}
        <section className="my-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">지역별 웨딩박람회</h2>
          <HubCards />
        </section>

        {/* Quick Links */}
        <section className="my-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">핵심 바로가기</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hubsData.slice(0, 8).map((hub) => {
              const path = hub.hubSlug.startsWith("region-")
                ? `/region/${hub.hubSlug.replace("region-", "")}`
                : `/topic/${hub.hubSlug.replace("topic-", "")}`;
              return (
                <Link
                  key={hub.hubSlug}
                  href={path}
                  className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-wedding-pink hover:shadow-md transition-all focus-ring"
                >
                  <span className="text-sm font-medium text-gray-900">
                    {hub.hubTitle}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Popular Keywords */}
        <section className="my-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">인기 웨딩박람회</h2>
          <KeywordCards keywords={popularKeywords} />
        </section>

        {/* Region Representatives */}
        <section className="my-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">지역별 대표 박람회</h2>
          <KeywordCards keywords={regionRepresentatives} />
        </section>

        {/* Schedule Link */}
        <section className="my-12 text-center">
          <Link
            href="/wedding-fair-schedule"
            className="inline-block px-6 py-3 text-lg font-medium text-white bg-wedding-pink hover:bg-pink-300 focus-ring rounded-md transition-colors"
          >
            전체 웨딩박람회 일정 보기
          </Link>
        </section>

        {/* FAQ */}
        <Faq items={faqs} />

        {/* Disclosure */}
        <DisclosureBox>
          <p>
            본 사이트는 웨딩박람회 정보 제공 사이트이며, 박람회 주최·운영사가 아닙니다.
            일정 및 혜택 정보는 변동될 수 있으니 반드시 공식 채널에서 최종 확인하시기 바랍니다.
            최종 판단 및 계약 책임은 사용자에게 있습니다.
          </p>
        </DisclosureBox>

        <Byline />
      </div>
    </>
  );
}

