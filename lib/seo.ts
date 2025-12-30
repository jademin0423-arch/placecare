import { Metadata } from "next";
import { SITE } from "./site";

export interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export function generateSEOMetadata(props: SEOProps): Metadata {
  const { title, description, canonical, ogImage, type = "website", publishedTime, modifiedTime, author } = props;
  
  const fullTitle = `${title} | ${SITE.name}`;
  const url = `${SITE.domain}${canonical}`;
  const imageUrl = ogImage ? `${SITE.domain}${ogImage}` : `${SITE.domain}${SITE.images.mainHero}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateBreadcrumbJSONLD(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.domain}${item.url}`,
    })),
  };
}

export function generateOrganizationJSONLD() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.domain,
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE.contact.email,
      contactType: "customer service",
    },
  };
}

export function generateWebSiteJSONLD() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.domain,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.domain}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateArticleJSONLD(props: {
  title: string;
  description: string;
  url: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  image?: string;
}) {
  const { title, description, url, publishedTime, modifiedTime, author, image } = props;
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE.domain}${url}`,
    ...(image && { image: `${SITE.domain}${image}` }),
    ...(publishedTime && { datePublished: publishedTime }),
    ...(modifiedTime && { dateModified: modifiedTime }),
    author: {
      "@type": "Person",
      name: author || SITE.editorial.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.domain,
    },
  };
}

export function generateWebPageJSONLD(props: {
  title: string;
  description: string;
  url: string;
}) {
  const { title, description, url } = props;
  
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${SITE.domain}${url}`,
  };
}

export function generateFAQJSONLD(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

