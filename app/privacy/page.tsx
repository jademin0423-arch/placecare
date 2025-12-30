import { generateSEOMetadata, generateBreadcrumbJSONLD, generateWebPageJSONLD } from "@/lib/seo";
import { Byline } from "@/components/site/components/Byline";

export const metadata = generateSEOMetadata({
  title: "개인정보처리방침",
  description: "개인정보처리방침을 확인하세요.",
  canonical: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJSONLD([
            { name: "홈", url: "/" },
            { name: "개인정보처리방침", url: "/privacy" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWebPageJSONLD({
            title: "개인정보처리방침",
            description: "개인정보처리방침",
            url: "/privacy",
          })),
        }}
      />

      <div className="container-custom py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">개인정보처리방침</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">제1조 (개인정보의 처리 목적)</h2>
            <p className="text-gray-700 leading-relaxed">
              본 사이트는 개인정보를 수집하지 않습니다. 다만, 외부 링크를 통해 이동하는 경우 해당 사이트의 개인정보처리방침이 적용됩니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">제2조 (개인정보의 처리 및 보유 기간)</h2>
            <p className="text-gray-700 leading-relaxed">
              본 사이트는 개인정보를 수집하지 않으므로 보유 기간이 없습니다.
            </p>
          </section>
        </div>

        <Byline />
      </div>
    </>
  );
}

