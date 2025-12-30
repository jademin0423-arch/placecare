import { generateSEOMetadata, generateBreadcrumbJSONLD, generateWebPageJSONLD } from "@/lib/seo";
import { Byline } from "@/components/site/components/Byline";
import { SITE } from "@/lib/site";

export const metadata = generateSEOMetadata({
  title: "문의",
  description: `${SITE.name}에 문의사항이 있으시면 연락주세요.`,
  canonical: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJSONLD([
            { name: "홈", url: "/" },
            { name: "문의", url: "/contact" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWebPageJSONLD({
            title: "문의",
            description: `${SITE.name} 문의`,
            url: "/contact",
          })),
        }}
      />

      <div className="container-custom py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">문의</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">연락처</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 mb-2">
                <span className="font-medium">이메일:</span>{" "}
                <a href={`mailto:${SITE.contact.email}`} className="text-wedding-pink hover:underline focus-ring">
                  {SITE.contact.email}
                </a>
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">지원 시간:</span> {SITE.contact.supportHours}
              </p>
              <p className="text-gray-600 text-sm">
                {SITE.contact.responseNote}
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">문의 안내</h2>
            <p className="text-gray-700 leading-relaxed">
              웨딩박람회 일정, 정보 오류, 기타 문의사항이 있으시면 위 이메일로 연락주시기 바랍니다.
              가능한 한 빠른 시일 내에 답변드리겠습니다.
            </p>
          </section>
        </div>

        <Byline />
      </div>
    </>
  );
}

