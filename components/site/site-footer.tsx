import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { getLandingPageFooterGroupsWithFallback } from "@/lib/landing-pages-data";
import {
  ADDRESS,
  CONTACT_EMAIL,
  FACEBOOK_URL,
  FOOTER_NAV_LINKS,
  INSTAGRAM_URL,
  KVK_NUMBER,
  OPENING_HOURS,
  PHONE_DISPLAY,
  PHONE_E164,
  SITE_LOGO,
  SITE_NAME,
} from "@/lib/constants";

type SiteFooterProps = {
  phoneDisplay?: string;
  phoneE164?: string;
  contactEmail?: string;
};

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export async function SiteFooter({
  phoneDisplay = PHONE_DISPLAY,
  phoneE164 = PHONE_E164,
  contactEmail = CONTACT_EMAIL,
}: SiteFooterProps) {
  const { regions, popular } = await getLandingPageFooterGroupsWithFallback();

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-12">
          <div>
            <Link
              href="/"
              className="relative inline-flex rounded-md py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              aria-label={`${SITE_NAME} — home`}
            >
              <Image
                src={SITE_LOGO.src}
                alt=""
                width={SITE_LOGO.width}
                height={SITE_LOGO.height}
                className="h-11 w-auto max-w-[14rem] object-contain object-left sm:h-12 sm:max-w-[17rem]"
                sizes="(max-width: 640px) 224px, 272px"
                unoptimized={SITE_LOGO.src.endsWith(".svg")}
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Rijlessen in Utrecht en omgeving. Gratis proefles, duidelijke tarieven en
              persoonlijke begeleiding tot je praktijkexamen bij het CBR.
            </p>
            <a
              href={`tel:${phoneE164}`}
              className="mt-6 inline-flex items-center gap-2.5 text-sm font-semibold text-white transition-colors hover:text-primary hover:underline"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-white/8 text-primary">
                <Phone className="size-4" aria-hidden />
              </span>
              {phoneDisplay}
            </a>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white">
              Pagina&apos;s
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm lg:grid-cols-1">
              {FOOTER_NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-slate-400 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white">
              Contact &amp; bedrijf
            </p>
            <div className="mt-4 space-y-5 text-sm">
              <div className="flex gap-3">
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/6 text-slate-300">
                  <MapPin className="size-4" aria-hidden />
                </span>
                <address className="not-italic">
                  <p className="leading-relaxed text-slate-400">
                    {ADDRESS.street}
                    <br />
                    {ADDRESS.postalCode} {ADDRESS.city}
                    <br />
                    {ADDRESS.country}
                  </p>
                </address>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/6 text-slate-300">
                  <Mail className="size-4" aria-hidden />
                </span>
                <a
                  href={`mailto:${contactEmail}`}
                  className="min-w-0 break-words font-medium text-slate-400 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {contactEmail}
                </a>
              </div>
              <div className="border-t border-white/10 pt-5 text-xs leading-relaxed text-slate-400">
                <p>
                  <span className="font-medium text-white">KvK-nummer</span>{" "}
                  <span className="tabular-nums">{KVK_NUMBER}</span>
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white">
              Openingstijden
            </p>
            <dl className="mt-4 space-y-1.5 text-sm leading-relaxed tabular-nums text-slate-400">
              {OPENING_HOURS.map(({ day, hours }) => (
                <div key={day} className="flex justify-between gap-3">
                  <dt className="shrink-0 font-normal text-slate-200">{day}</dt>
                  <dd className="text-right">{hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {regions.length > 0 || popular.length > 0 ? (
          <div className="mt-10 border-t border-white/10 pt-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {regions.length > 0 ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white">
                    Rijschool regio&apos;s
                  </p>
                  <ul className="mt-4 grid gap-x-6 gap-y-2.5 text-sm sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {regions.map((page) => (
                      <li key={page.slug}>
                        <Link
                          href={`/${page.slug}`}
                          className="text-slate-400 underline-offset-4 transition-colors hover:text-white hover:underline"
                        >
                          {page.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {popular.length > 0 ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white">
                    Populaire pagina&apos;s
                  </p>
                  <ul className="mt-4 grid gap-x-6 gap-y-2.5 text-sm sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {popular.map((page) => (
                      <li key={page.slug}>
                        <Link
                          href={`/${page.slug}`}
                          className="text-slate-400 underline-offset-4 transition-colors hover:text-white hover:underline"
                        >
                          {page.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="mt-12">
          <div className="mb-6 flex justify-center sm:mb-8 sm:justify-end">
            <div className="flex items-center gap-2">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label={`${SITE_NAME} op Facebook`}
              >
                <FacebookIcon className="size-5" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label={`${SITE_NAME} op Instagram`}
              >
                <InstagramIcon className="size-5" />
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6">
            <p className="text-xs text-slate-400 sm:text-sm">
              © {new Date().getFullYear()} {SITE_NAME}. Alle rechten voorbehouden.
            </p>
            <Link
              href="/algemene-voorwaarden"
              className="text-xs font-medium text-slate-400 underline-offset-4 transition-colors hover:text-white hover:underline sm:text-sm"
            >
              Algemene voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
