import { prepareFaqHtmlForRender } from "@/lib/cms/faq-html";
import type { CmsFaqNode } from "@/lib/cms/types";
import type { FaqItem } from "@/lib/faq-data";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function mapCmsFaqsToFaqItems(nodes: CmsFaqNode[]): FaqItem[] {
  const usedIds = new Set<string>();

  return nodes
    .map((node, index) => {
      const fields = node.faqFields;
      const question = fields?.vraag?.trim() || node.title?.trim() || "";
      const rawAnswer = fields?.antwoord?.trim() || "";
      const answer = rawAnswer ? prepareFaqHtmlForRender(rawAnswer) : "";

      if (!question || !answer) {
        return null;
      }

      const baseId = slugify(question) || `faq-${index + 1}`;
      let id = baseId;
      let suffix = 2;
      while (usedIds.has(id)) {
        id = `${baseId}-${suffix}`;
        suffix += 1;
      }
      usedIds.add(id);

      const item: FaqItem = {
        id,
        question,
        answer,
        answerIsHtml: true,
      };
      return item;
    })
    .filter((item): item is FaqItem => item !== null);
}
