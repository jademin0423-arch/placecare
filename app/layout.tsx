import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { SiteShell } from "@/components/site/SiteShell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: "전국 웨딩박람회 일정, 후기, 추천 정보를 한눈에 확인하세요.",
  metadataBase: new URL(SITE.domain),
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192" },
      { url: "/icon-512.png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

