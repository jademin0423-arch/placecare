import { generateSEOMetadata, generateBreadcrumbJSONLD, generateWebPageJSONLD } from "@/lib/seo";
import { DisclosureBox } from "@/components/site/components/DisclosureBox";
import { Byline } from "@/components/site/components/Byline";

export const metadata = generateSEOMetadata({
  title: "면책사항",
  description: "면책사항을 확인하세요.",
  canonical: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJSONLD([
            { name: "홈", url: "/" },
            { name: "면책사항", url: "/disclaimer" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWebPageJSONLD({
            title: "면책사항",
            description: "면책사항",
            url: "/disclaimer",
          })),
        }}
      />

      <div className="container-custom py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">면책사항</h1>
        
        <div className="prose prose-lg max-w-none">
          <DisclosureBox title="중요 안내">
            <p>
              본 사이트는 웨딩박람회 정보 제공 사이트이며, 박람회 주최·운영사가 아닙니다.
            </p>
            <p className="mt-2">
              일정 및 혜택 정보는 주최사 사정에 따라 변동될 수 있으니 반드시 공식 채널에서 최종 확인하시기 바랍니다.
            </p>
            <p className="mt-2">
              최종 판단 및 계약 책임은 사용자에게 있습니다.
            </p>
            <p className="mt-2">
              본 사이트에서 제공하는 정보의 정확성, 완전성, 신뢰성에 대해 보장하지 않습니다.
            </p>
            <p className="mt-2">
              본 사이트를 통해 발생한 어떠한 손해에 대해서도 책임을 지지 않습니다.
            </p>
          </DisclosureBox>
        </div>

        <Byline />
      </div>
    </>
  );
}

