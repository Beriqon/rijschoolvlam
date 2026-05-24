import type { FaqItem } from "@/lib/faq-data";

function stripHtmlForSchema(text: string) {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function stripMarkdownForSchema(text: string) {
  return text
    .replace(/^#+\s+/gm, "")
    .replace(/\*\*/g, "")
    .replace(/\n+/g, " ")
    .trim();
}

function answerTextForSchema(item: FaqItem) {
  const raw = item.answerIsHtml
    ? stripHtmlForSchema(item.answer)
    : item.answer;
  return stripMarkdownForSchema(raw);
}

export function FaqJsonLd({ items }: { items: readonly FaqItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answerTextForSchema(item),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
