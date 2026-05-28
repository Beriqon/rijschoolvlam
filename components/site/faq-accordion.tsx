"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ANSWER_HTML_CLASS } from "@/lib/cms/faq-html";
import type { FaqItem } from "@/lib/faq-data";

/** Internal route token in FAQ copy; rendered as readable “tarieven” linking to `/tarieven`. */
function linkifyTarievenHref(text: string): React.ReactNode {
  const out: React.ReactNode[] = [];
  let nodeKey = 0;

  const pageParts = text.split(/\b(tarievenpagina)\b/gi);
  for (const part of pageParts) {
    if (/^tarievenpagina$/i.test(part)) {
      out.push(
        <Link
          key={nodeKey++}
          href="/tarieven"
          className="text-primary font-medium underline underline-offset-4 hover:no-underline"
        >
          {part}
        </Link>,
      );
      continue;
    }

    const pathParts = part.split(/(\s\/tarieven\b)/g);
    for (const piece of pathParts) {
      if (/^\s\/tarieven$/.test(piece)) {
        out.push(" ");
        out.push(
          <Link
            key={nodeKey++}
            href="/tarieven"
            className="text-primary font-medium underline underline-offset-4 hover:no-underline"
          >
            tarieven
          </Link>,
        );
      } else if (piece) {
        out.push(piece);
      }
    }
  }

  return out.length === 1 ? out[0] : <>{out}</>;
}

const CBR_RIJBEWIJSTIPS_URL = "https://www.cbr.nl/rijbewijstips/" as const;

/** Wrap FAQ tokens `[[CBR]]` as a link to CBR rijbewijstips; then applies {@link linkifyTarievenHref}. */
function linkifyCbrAndTarieven(text: string): React.ReactNode {
  const cbrParts = text.split(/\[\[CBR\]\]/);
  if (cbrParts.length === 1) {
    return linkifyTarievenHref(text);
  }
  const out: React.ReactNode[] = [];
  let k = 0;
  cbrParts.forEach((part, i) => {
    if (i > 0) {
      out.push(
        <a
          key={`cbr-${k++}`}
          href={CBR_RIJBEWIJSTIPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-medium underline underline-offset-4 hover:no-underline"
        >
          CBR
        </a>,
      );
    }
    out.push(linkifyTarievenHref(part));
  });
  return out.length === 1 ? out[0] : <>{out}</>;
}

/** `[[KIJK_HIER_BV]]` → internal link “kijk hier” naar `/bijzondere-verrichtingen`; daarna {@link linkifyCbrAndTarieven}. */
function linkifyFaqRichText(text: string): React.ReactNode {
  const parts = text.split(/\[\[KIJK_HIER_BV\]\]/);
  if (parts.length === 1) {
    return linkifyCbrAndTarieven(text);
  }
  const out: React.ReactNode[] = [];
  let k = 0;
  parts.forEach((part, i) => {
    if (i > 0) {
      out.push(
        <Link
          key={`bv-${k++}`}
          href="/bijzondere-verrichtingen"
          className="text-primary font-medium underline underline-offset-4 hover:no-underline"
        >
          kijk hier
        </Link>,
      );
    }
    out.push(linkifyCbrAndTarieven(part));
  });
  return out.length === 1 ? out[0] : <>{out}</>;
}

function answerParagraphs(answer: string) {
  return answer
    .trim()
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
}

type AnswerChunk =
  | { type: "text"; content: string }
  | { type: "youtube"; videoId: string; startSeconds?: number };

/** Split FAQ copy on markers like `[[YOUTUBE:dQw4w9WgXcQ:120]]` (start seconds optional). */
function splitAnswerWithEmbeds(answer: string): AnswerChunk[] {
  /* YouTube IDs are typically [A-Za-z0-9_-]{11} but be permissive (incl. edge IDs). */
  const re = /\[\[YOUTUBE:([^\]:]+?)(?::(\d+))?\]\]/g;
  const chunks: AnswerChunk[] = [];
  let last = 0;
  let m = re.exec(answer);
  if (!m) {
    const t = answer.trim();
    return t ? [{ type: "text", content: t }] : [];
  }
  while (m) {
    const before = answer.slice(last, m.index).trim();
    if (before) chunks.push({ type: "text", content: before });
    const id = (m[1] ?? "").trim();
    if (!id) {
      last = m.index + m[0].length;
      m = re.exec(answer);
      continue;
    }
    chunks.push({
      type: "youtube",
      videoId: id,
      startSeconds: m[2] != null ? Number(m[2]) : undefined,
    });
    last = m.index + m[0].length;
    m = re.exec(answer);
  }
  const after = answer.slice(last).trim();
  if (after) chunks.push({ type: "text", content: after });
  return chunks;
}

function FaqYoutubeEmbed({
  videoId,
  startSeconds,
  title,
}: {
  videoId: string;
  startSeconds?: number;
  title: string;
}) {
  const params = new URLSearchParams({ rel: "0", modestbranding: "1" });
  if (startSeconds != null && !Number.isNaN(startSeconds)) {
    params.set("start", String(Math.max(0, Math.floor(startSeconds))));
  }
  const src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?${params}`;
  const watchUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
  return (
    <figure className="not-prose w-full max-w-2xl">
      <div className="aspect-video w-full min-h-[11rem] overflow-hidden rounded-lg border border-border/60 bg-muted/30 shadow-sm">
        <iframe
          className="block h-full w-full border-0"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <figcaption className="text-muted-foreground mt-2 text-center text-xs">
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-medium underline underline-offset-4 hover:no-underline"
        >
          Video opent niet? Bekijk op YouTube
        </a>
      </figcaption>
    </figure>
  );
}

/** Blocks starting with `## ` render as a subheading; optional body after a newline in the same block. */
function renderAnswerBlock(block: string, keyPrefix: string, index: number) {
  const key = `${keyPrefix}-b${index}`;
  if (!block.startsWith("## ")) {
    return (
      <p key={key} className="text-pretty text-foreground/92">
        {linkifyFaqRichText(block)}
      </p>
    );
  }

  const rest = block.slice(3).trim();
  const lineBreak = rest.indexOf("\n");
  const title = (lineBreak === -1 ? rest : rest.slice(0, lineBreak)).trim();
  const body = lineBreak === -1 ? "" : rest.slice(lineBreak + 1).trim();
  const bodyParagraphs = body
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div key={key} className="space-y-2">
      <h4 className="text-foreground text-base font-semibold tracking-tight">
        {linkifyFaqRichText(title)}
      </h4>
      {bodyParagraphs.map((bp, j) => (
        <p key={`${key}-p${j}`} className="text-pretty text-foreground/92">
          {linkifyFaqRichText(bp)}
        </p>
      ))}
    </div>
  );
}

function renderAnswerTextChunks(content: string, keyPrefix: string) {
  return answerParagraphs(content).map((paragraph, idx) =>
    renderAnswerBlock(paragraph, keyPrefix, idx),
  );
}

function renderFaqAnswer(item: FaqItem) {
  if (item.answerIsHtml) {
    return (
      <div
        className={FAQ_ANSWER_HTML_CLASS}
        dangerouslySetInnerHTML={{ __html: item.answer }}
      />
    );
  }

  return (
    <div className="space-y-4 pt-1 [&>p:first-child]:mt-0">
      {splitAnswerWithEmbeds(item.answer).map((chunk, chunkIdx) =>
        chunk.type === "text" ? (
          <Fragment key={`${item.id}-c${chunkIdx}`}>
            {renderAnswerTextChunks(chunk.content, `${item.id}-c${chunkIdx}`)}
          </Fragment>
        ) : (
          <FaqYoutubeEmbed
            key={`${item.id}-yt-${chunk.videoId}-${chunkIdx}`}
            videoId={chunk.videoId}
            startSeconds={chunk.startSeconds}
            title="YouTube-video"
          />
        ),
      )}
    </div>
  );
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion type="single" collapsible className="mx-auto w-full max-w-4xl">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="text-left text-base text-foreground transition-colors aria-expanded:text-primary md:text-[1.05rem]">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed">
            {renderFaqAnswer(item)}
            {item.answerImage ? (
              <div className="relative mt-6 max-w-2xl overflow-hidden rounded-lg border border-border/60 bg-muted/30">
                <Image
                  src={item.answerImage.src}
                  alt={item.answerImage.alt}
                  width={1200}
                  height={675}
                  className="h-auto w-full"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
            ) : null}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
