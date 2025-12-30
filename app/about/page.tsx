import { generateSEOMetadata, generateBreadcrumbJSONLD, generateWebPageJSONLD } from "@/lib/seo";
import { Byline } from "@/components/site/components/Byline";
import { SITE } from "@/lib/site";

export const metadata = generateSEOMetadata({
  title: "소개",
  description: `${SITE.name}는 웨딩박람회 및 결혼 준비 정보를 제공하는 정보 사이트입니다.`,
  canonical: "/about",
});

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJSONLD([
            { name: "홈", url: "/" },
            { name: "소개", url: "/about" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWebPageJSONLD({
            title: "소개",
            description: `${SITE.name} 소개`,
            url: "/about",
          })),
        }}
      />

      <div className="container-custom py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">소개</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">운영 목적</h2>
            <p className="text-gray-700 leading-relaxed">
              {SITE.name}는 예비부부들이 웨딩박람회 정보를 쉽게 찾고 비교할 수 있도록 돕는 정보 제공 사이트입니다.
              전국 각 지역의 웨딩박람회 일정, 후기, 추천 정보를 한눈에 확인하실 수 있습니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">편집 원칙</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>정확하고 최신의 정보 제공</li>
              <li>객관적이고 중립적인 정보 제공</li>
              <li>사용자 편의를 최우선으로 고려</li>
              <li>지속적인 정보 업데이트</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">업데이트 정책</h2>
            <p className="text-gray-700 leading-relaxed">
              웨딩박람회 일정 및 정보는 주기적으로 업데이트됩니다. 
              다만 일정 및 혜택 정보는 주최사 사정에 따라 변동될 수 있으니 
              반드시 공식 채널에서 최종 확인하시기 바랍니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">문의</h2>
            <p className="text-gray-700 leading-relaxed">
              문의사항이 있으시면 <a href="/contact" className="text-wedding-pink hover:underline focus-ring">문의 페이지</a>를 통해 연락주시기 바랍니다.
            </p>
          </section>
        </div>

        <Byline />
      </div>
    </>
  );
}

