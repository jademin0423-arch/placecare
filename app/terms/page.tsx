import { generateSEOMetadata, generateBreadcrumbJSONLD, generateWebPageJSONLD } from "@/lib/seo";
import { Byline } from "@/components/site/components/Byline";

export const metadata = generateSEOMetadata({
  title: "이용약관",
  description: "이용약관을 확인하세요.",
  canonical: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJSONLD([
            { name: "홈", url: "/" },
            { name: "이용약관", url: "/terms" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWebPageJSONLD({
            title: "이용약관",
            description: "이용약관",
            url: "/terms",
          })),
        }}
      />

      <div className="container-custom py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">이용약관</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">제1조 (목적)</h2>
            <p className="text-gray-700 leading-relaxed">
              본 약관은 웨딩박람회 정보 제공 사이트의 이용에 관한 조건 및 절차를 규정함을 목적으로 합니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">제2조 (정의)</h2>
            <p className="text-gray-700 leading-relaxed">
              본 사이트는 웨딩박람회 정보를 제공하는 정보 사이트입니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">제3조 (정보의 정확성)</h2>
            <p className="text-gray-700 leading-relaxed">
              본 사이트에서 제공하는 정보는 참고용이며, 정확성을 보장하지 않습니다.
              최종 확인은 반드시 공식 채널에서 하시기 바랍니다.
            </p>
          </section>
        </div>

        <Byline />
      </div>
    </>
  );
}

