/** Tailwind: zelfde typografie/links als platte FAQ-antwoorden; ondersteunt WP embeds. */
export const FAQ_ANSWER_HTML_CLASS =
  "faq-answer-html space-y-4 pt-1 [&>*:first-child]:mt-0 [&_p]:text-pretty [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_li]:text-muted-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_h2]:text-foreground [&_h2]:text-base [&_h2]:font-semibold [&_h2]:tracking-tight [&_h3]:text-foreground [&_h3]:text-base [&_h3]:font-semibold [&_h3]:tracking-tight [&_h4]:text-foreground [&_h4]:text-base [&_h4]:font-semibold [&_h4]:tracking-tight [&_a]:text-primary [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:no-underline [&_strong]:font-semibold [&_strong]:text-foreground [&_img]:mt-2 [&_img]:h-auto [&_img]:max-w-2xl [&_img]:rounded-lg [&_img]:border [&_img]:border-border/60 [&_figure]:my-4 [&_iframe]:aspect-video [&_iframe]:h-auto [&_iframe]:min-h-[11rem] [&_iframe]:w-full [&_iframe]:max-w-2xl [&_iframe]:rounded-lg [&_iframe]:border [&_iframe]:border-border/60";

/** Tijdelijk: lokaal CMS draait nog zonder geldig SSL op het subdomein. */
function normalizeCmsUrlsInHtml(html: string): string {
  return html.replace(/https:\/\/cms\.rijschoolvlam\.nl/gi, "http://cms.rijschoolvlam.nl");
}

function sanitizeFaqHtml(html: string) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "");
}

export function prepareFaqHtmlForRender(html: string): string {
  const trimmed = html.trim();
  if (!trimmed) {
    return "";
  }
  return normalizeCmsUrlsInHtml(sanitizeFaqHtml(trimmed));
}
