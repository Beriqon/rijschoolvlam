"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const PACKAGE_OPTIONS = [
  "Proefles Automaat",
  "Proefles Schakel",
  "Pakket 1",
  "Pakket 2",
  "Pakket 3",
  "Pakket 4",
  "Opfriscursus",
  "Los rij examen",
  "Theorie les pakket",
] as const;

const field =
  "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const firstName = String(fd.get("firstName") ?? "").trim();
    const lastName = String(fd.get("lastName") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const address = String(fd.get("address") ?? "").trim();
    const postalCode = String(fd.get("postalCode") ?? "").trim();
    const city = String(fd.get("city") ?? "").trim();
    const subjectLine = String(fd.get("subject") ?? "").trim();
    const pkg = String(fd.get("package") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    const body = [
      `Voornaam: ${firstName}`,
      `Achternaam: ${lastName}`,
      `Telefoon: ${phone}`,
      `E-mail: ${email}`,
      "",
      `Akkoord met algemene voorwaarden: ja`,
      "",
      `Adres: ${address || "—"}`,
      `Postcode: ${postalCode || "—"}`,
      `Woonplaats: ${city || "—"}`,
      "",
      `Onderwerp: ${subjectLine || "—"}`,
      `Pakket: ${pkg || "—"}`,
      "",
      message ? `Bericht:\n${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const mailSubjectParts = [`Contactaanvraag Rijschool Vlam`, fullName];
    if (pkg) mailSubjectParts.push(pkg);
    if (subjectLine) mailSubjectParts.push(subjectLine);

    const subject = encodeURIComponent(mailSubjectParts.join(" — "));
    const mailBody = encodeURIComponent(body);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${mailBody}`;
    setSubmitted(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border-border space-y-8 rounded-2xl border p-6 shadow-md ring-1 ring-primary/5 sm:p-8 md:rounded-3xl"
    >
      <div className="space-y-1">
        <h3 className="font-heading text-foreground text-xl font-semibold tracking-tight">
          Stuur een bericht
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Vul het formulier in; je e-mailapp opent met een vooringevuld bericht. Liever bellen? Zie
          links.
        </p>
      </div>

      <div className="space-y-5">
        <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
          Persoonsgegevens
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="text-sm font-medium">
              Voornaam <span className="text-destructive">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              required
              autoComplete="given-name"
              className={cn(field, "mt-1.5")}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="text-sm font-medium">
              Achternaam <span className="text-destructive">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              required
              autoComplete="family-name"
              className={cn(field, "mt-1.5")}
            />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="text-sm font-medium">
              Telefoon <span className="text-destructive">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className={cn(field, "mt-1.5")}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              E-mail <span className="text-destructive">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={cn(field, "mt-1.5")}
            />
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
          Adres <span className="font-normal normal-case opacity-70">(optioneel)</span>
        </p>
        <div>
          <label htmlFor="address" className="text-sm font-medium">
            Straat en huisnummer
          </label>
          <input
            id="address"
            name="address"
            autoComplete="street-address"
            className={cn(field, "mt-1.5")}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="postalCode" className="text-sm font-medium">
              Postcode
            </label>
            <input
              id="postalCode"
              name="postalCode"
              autoComplete="postal-code"
              className={cn(field, "mt-1.5")}
            />
          </div>
          <div>
            <label htmlFor="city" className="text-sm font-medium">
              Woonplaats
            </label>
            <input
              id="city"
              name="city"
              autoComplete="address-level2"
              className={cn(field, "mt-1.5")}
            />
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
          Aanvraag
        </p>
        <div>
          <label htmlFor="subject" className="text-sm font-medium">
            Onderwerp
          </label>
          <input
            id="subject"
            name="subject"
            placeholder="Bijv. proefles plannen, vraag over tarieven…"
            className={cn(field, "mt-1.5")}
          />
        </div>
        <div>
          <label htmlFor="package" className="text-sm font-medium">
            Pakket
          </label>
          <select id="package" name="package" className={cn(field, "mt-1.5 cursor-pointer")}>
            <option value="">Maak een keuze (optioneel)</option>
            {PACKAGE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="message" className="text-sm font-medium">
            Bericht <span className="text-muted-foreground font-normal">(optioneel)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Extra opmerkingen of voorkeuren voor lesmomenten…"
            className={cn(
              field,
              "mt-1.5 min-h-28 resize-y py-2.5"
            )}
          />
        </div>
      </div>

      <div className="rounded-lg border border-border/80 bg-muted/30 p-4">
        <div className="flex gap-3">
          <input
            id="acceptTerms"
            name="acceptTerms"
            type="checkbox"
            required
            value="yes"
            className="border-input focus-visible:ring-ring mt-1 size-4 shrink-0 rounded border accent-primary shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2"
          />
          <div className="min-w-0 space-y-2 text-sm leading-relaxed">
            <label htmlFor="acceptTerms" className="text-foreground cursor-pointer font-medium">
              Akkoord Algemene Voorwaarden <span className="text-destructive">*</span>
            </label>
            <p className="text-muted-foreground">
              <Link
                href="/algemene-voorwaarden"
                className="text-primary font-medium underline-offset-4 hover:underline"
              >
                Lees algemene voorwaarden
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          Open e-mailprogramma
        </Button>
      </div>
      {submitted ? (
        <p className="text-muted-foreground text-sm">
          Als je mailprogramma niet opent, mail dan handmatig naar{" "}
          <a className="text-primary font-medium underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      ) : (
        <p className="text-muted-foreground text-xs leading-relaxed">
          Dit formulier opent je standaard e-mailapp met een vooringevuld bericht. Geen e-mail op
          dit apparaat? Kopieer de gegevens en stuur ze zelf.
        </p>
      )}
    </form>
  );
}
