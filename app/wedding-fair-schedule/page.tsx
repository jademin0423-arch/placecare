import Link from "next/link";
import { generateSEOMetadata, generateBreadcrumbJSONLD, generateWebPageJSONLD, generateFAQJSONLD } from "@/lib/seo";
import { ChecklistBox } from "@/components/site/components/ChecklistBox";
import { KeywordCards } from "@/components/site/components/KeywordCards";
import { Faq } from "@/components/site/components/Faq";
import { Byline } from "@/components/site/components/Byline";
import { SITE } from "@/lib/site";
import keywordsData from "@/data/keywords.json";
import hubsData from "@/data/hubs.json";

export const metadata = generateSEOMetadata({
  title: "웨딩박람회 일정",
  description: "2026년 전국 웨딩박람회 일정을 지역별, 월별로 확인하세요. 서울, 경기, 인천, 부산 등 주요 지역의 웨딩박람회 일정과 무료 초대권 신청 방법을 안내합니다.",
  canonical: "/wedding-fair-schedule",
  ogImage: SITE.images.mainHero,
});

export default function SchedulePage() {
  // 일정 관련 키워드 필터링
  const scheduleKeywords = keywordsData
    .filter((k) => k.topicSlug === "guide" || k.keyword.includes("일정"))
    .slice(0, 6);

  // 지역 허브 2~3개만
  const regionHubs = hubsData
    .filter((h) => h.hubSlug.startsWith("region-"))
    .slice(0, 3);

  const faqs = [
    {
      question: "웨딩박람회 일정은 어떻게 확인하나요?",
      answer: "본 페이지에서 지역별, 월별로 일정을 확인하실 수 있습니다. 각 지역 허브 페이지에서 더 상세한 일정 정보를 확인하세요.",
    },
    {
      question: "박람회 일정이 변경될 수 있나요?",
      answer: "네, 박람회 일정은 주최사 사정에 따라 변경될 수 있습니다. 방문 전 반드시 공식 채널에서 최종 확인하시기 바랍니다.",
    },
    {
      question: "사전 등록은 필수인가요?",
      answer: "대부분의 박람회는 현장 등록도 가능하지만, 사전 등록 시 추가 혜택을 받을 수 있는 경우가 많습니다.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJSONLD([
            { name: "홈", url: "/" },
            { name: "웨딩박람회 일정", url: "/wedding-fair-schedule" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWebPageJSONLD({
            title: "웨딩박람회 일정",
            description: "2026년 전국 웨딩박람회 일정을 지역별, 월별로 확인하세요.",
            url: "/wedding-fair-schedule",
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            웨딩박람회 일정
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
            2026년 전국 웨딩박람회 일정을 한눈에 확인하세요. 지역별, 월별로 분류된 일정 정보와 
            각 박람회의 특징, 혜택, 참가 업체 정보를 제공합니다. 사전 등록 및 무료 초대권 신청 방법도 안내합니다.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-block px-6 py-3 text-lg font-medium text-white bg-wedding-pink hover:bg-pink-300 focus-ring rounded-md transition-colors"
            >
              전체 웨딩박람회 정보 보기
            </Link>
          </div>
        </section>

        {/* Checklist */}
        <ChecklistBox
          title="박람회 일정 확인 체크리스트"
          items={[
            "원하는 지역과 날짜 확인",
            "박람회 장소 및 교통편 확인",
            "사전 등록 및 초대권 신청",
            "준비물 및 체크리스트 확인",
            "비교할 업체 리스트 작성",
          ]}
        />

        {/* Region Hubs */}
        <section className="my-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">지역별 일정 보기</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regionHubs.map((hub) => {
              const path = `/region/${hub.hubSlug.replace("region-", "")}`;
              return (
                <Link
                  key={hub.hubSlug}
                  href={path}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:border-wedding-pink hover:shadow-md transition-all focus-ring"
                >
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {hub.hubTitle}
                  </h3>
                  <p className="text-gray-600 text-sm">{hub.hubKeyword}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Schedule Keywords */}
        <section className="my-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">일정 관련 정보</h2>
          <KeywordCards keywords={scheduleKeywords} />
        </section>

        {/* FAQ */}
        <Faq items={faqs} />

        <Byline />
      </div>
    </>
  );
}

