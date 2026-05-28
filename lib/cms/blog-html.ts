import { stripInlinePresentationAttrs } from "@/lib/cms/strip-inline-styles";

export type BlogTocItem = {
  id: string;
  text: string;
  level: "h2" | "h3";
};

const BLOG_CMS_BUTTON_LINK_CLASS =
  "[&_.wp-block-buttons]:flex [&_.wp-block-buttons]:flex-wrap [&_.wp-block-buttons]:gap-3 [&_.wp-block-buttons]:pt-2 [&_.wp-block-button>a]:inline-flex [&_.wp-block-button>a]:h-9 [&_.wp-block-button>a]:items-center [&_.wp-block-button>a]:justify-center [&_.wp-block-button>a]:rounded-lg [&_.wp-block-button>a]:border [&_.wp-block-button>a]:border-transparent [&_.wp-block-button>a]:bg-primary [&_.wp-block-button>a]:px-4 [&_.wp-block-button>a]:text-sm [&_.wp-block-button>a]:font-medium [&_.wp-block-button>a]:text-primary-foreground [&_.wp-block-button>a]:no-underline hover:[&_.wp-block-button>a]:bg-primary/80 [&_a.wp-block-button__link]:inline-flex [&_a.wp-block-button__link]:h-9 [&_a.wp-block-button__link]:items-center [&_a.wp-block-button__link]:justify-center [&_a.wp-block-button__link]:rounded-lg [&_a.wp-block-button__link]:border [&_a.wp-block-button__link]:border-transparent [&_a.wp-block-button__link]:bg-primary [&_a.wp-block-button__link]:px-4 [&_a.wp-block-button__link]:text-sm [&_a.wp-block-button__link]:font-medium [&_a.wp-block-button__link]:text-primary-foreground [&_a.wp-block-button__link]:no-underline hover:[&_a.wp-block-button__link]:bg-primary/80 [&_a.wp-element-button]:inline-flex [&_a.wp-element-button]:h-9 [&_a.wp-element-button]:items-center [&_a.wp-element-button]:justify-center [&_a.wp-element-button]:rounded-lg [&_a.wp-element-button]:border [&_a.wp-element-button]:border-transparent [&_a.wp-element-button]:bg-primary [&_a.wp-element-button]:px-4 [&_a.wp-element-button]:text-sm [&_a.wp-element-button]:font-medium [&_a.wp-element-button]:text-primary-foreground [&_a.wp-element-button]:no-underline hover:[&_a.wp-element-button]:bg-primary/80 [&_a.blog-cms-cta]:inline-flex [&_a.blog-cms-cta]:h-9 [&_a.blog-cms-cta]:items-center [&_a.blog-cms-cta]:justify-center [&_a.blog-cms-cta]:rounded-lg [&_a.blog-cms-cta]:border [&_a.blog-cms-cta]:border-transparent [&_a.blog-cms-cta]:bg-primary [&_a.blog-cms-cta]:px-4 [&_a.blog-cms-cta]:text-sm [&_a.blog-cms-cta]:font-medium [&_a.blog-cms-cta]:text-primary-foreground [&_a.blog-cms-cta]:no-underline hover:[&_a.blog-cms-cta]:bg-primary/80";

/** Tailwind selectors: zelfde typografie/spacing als hardcoded blog content nodes. */
export const BLOG_CMS_CONTENT_CLASS =
  `space-y-5 [&_h2]:mt-12 [&_h2]:scroll-mt-28 [&_h2]:text-balance [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:first:mt-0 [&_h2]:md:text-3xl [&_h3]:mt-7 [&_h3]:scroll-mt-28 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-foreground [&_h3]:md:text-xl [&_p]:text-foreground/92 [&_p]:text-base [&_p]:leading-7 [&_p]:md:text-[1.05rem] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:leading-7 [&_ul]:text-foreground/92 [&_ul]:md:text-[1.05rem] [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_ol]:leading-7 [&_ol]:text-foreground/92 [&_li]:text-foreground/92 [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary/85 [&_strong]:font-semibold [&_strong]:text-foreground ${BLOG_CMS_BUTTON_LINK_CLASS}`;

function slugifyHeading(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function stripHtmlTags(html: string) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeBlogHtml(html: string) {
  return stripInlinePresentationAttrs(
    html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
      .replace(/\son\w+="[^"]*"/gi, "")
      .replace(/\son\w+='[^']*'/gi, ""),
  );
}

/** Markeer WordPress button-block links voor CTA-styling (primary button). */
function enhanceWordPressButtons(html: string): string {
  return html.replace(/<a\b([^>]*?)>/gi, (match, attrs: string) => {
    const isButton =
      /wp-block-button__link|wp-element-button|wp-block-button/i.test(attrs);
    if (!isButton || /blog-cms-cta/.test(attrs)) {
      return match;
    }
    if (/\bclass="/i.test(attrs)) {
      return `<a${attrs.replace(/\bclass="/i, 'class="blog-cms-cta ')}>`;
    }
    if (/\bclass='/i.test(attrs)) {
      return `<a${attrs.replace(/\bclass='/i, "class='blog-cms-cta ")}>`;
    }
    return `<a class="blog-cms-cta"${attrs}>`;
  });
}

function injectHeadingIds(
  html: string,
  tag: "h2" | "h3",
  toc: BlogTocItem[],
  usedIds: Set<string>,
) {
  const re = new RegExp(`<${tag}([^>]*)>([\\s\\S]*?)<\\/${tag}>`, "gi");

  return html.replace(re, (match, attrs: string, inner: string) => {
    const text = stripHtmlTags(inner);
    if (!text) {
      return match;
    }

    let id = slugifyHeading(text);
    if (!id) {
      id = `${tag}-${toc.length + 1}`;
    }

    let uniqueId = id;
    let suffix = 2;
    while (usedIds.has(uniqueId)) {
      uniqueId = `${id}-${suffix}`;
      suffix += 1;
    }
    usedIds.add(uniqueId);

    toc.push({ id: uniqueId, text, level: tag });

    const attrsWithoutId = attrs.replace(/\sid="[^"]*"/i, "").trim();
    const attrPrefix = attrsWithoutId ? ` ${attrsWithoutId}` : "";

    return `<${tag} id="${uniqueId}"${attrPrefix}>${inner}</${tag}>`;
  });
}

export function prepareBlogHtmlForRender(html: string): {
  html: string;
  toc: BlogTocItem[];
} {
  const toc: BlogTocItem[] = [];
  const usedIds = new Set<string>();

  let safe = sanitizeBlogHtml(html.trim());
  safe = enhanceWordPressButtons(safe);
  safe = injectHeadingIds(safe, "h2", toc, usedIds);
  safe = injectHeadingIds(safe, "h3", toc, usedIds);

  return { html: safe, toc };
}
