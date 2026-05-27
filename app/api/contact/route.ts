import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_TO_EMAIL = "rm33genc@gmail.com";
const CONTACT_FROM_EMAIL = "onboarding@resend.dev";

const MAX_LENGTHS = {
  address: 200,
  city: 100,
  email: 320,
  firstName: 80,
  lastName: 80,
  message: 5000,
  package: 100,
  phone: 50,
  postalCode: 20,
  subject: 150,
} as const;

type ContactPayload = {
  acceptTerms?: unknown;
  address?: unknown;
  city?: unknown;
  email?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  message?: unknown;
  package?: unknown;
  phone?: unknown;
  postalCode?: unknown;
  subject?: unknown;
};

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateLength(
  value: string,
  maxLength: number,
  label: string,
  errors: Record<string, string>,
  key: string
) {
  if (value.length > maxLength) {
    errors[key] = `${label} mag maximaal ${maxLength} tekens bevatten.`;
  }
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY environment variable.");

    return NextResponse.json(
      { error: "Het contactformulier is momenteel niet beschikbaar." },
      { status: 500 }
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const firstName = getString(payload.firstName);
  const lastName = getString(payload.lastName);
  const phone = getString(payload.phone);
  const email = getString(payload.email);
  const address = getString(payload.address);
  const postalCode = getString(payload.postalCode);
  const city = getString(payload.city);
  const subjectLine = getString(payload.subject);
  const selectedPackage = getString(payload.package);
  const message = getString(payload.message);
  const acceptTerms = payload.acceptTerms === "yes";

  const errors: Record<string, string> = {};

  if (!firstName) errors.firstName = "Voornaam is verplicht.";
  if (!lastName) errors.lastName = "Achternaam is verplicht.";
  if (!phone) errors.phone = "Telefoon is verplicht.";
  if (!email) {
    errors.email = "E-mail is verplicht.";
  } else if (!isValidEmail(email)) {
    errors.email = "Voer een geldig e-mailadres in.";
  }

  if (!acceptTerms) {
    errors.acceptTerms = "Je moet akkoord gaan met de algemene voorwaarden.";
  }

  validateLength(firstName, MAX_LENGTHS.firstName, "Voornaam", errors, "firstName");
  validateLength(lastName, MAX_LENGTHS.lastName, "Achternaam", errors, "lastName");
  validateLength(phone, MAX_LENGTHS.phone, "Telefoon", errors, "phone");
  validateLength(email, MAX_LENGTHS.email, "E-mail", errors, "email");
  validateLength(address, MAX_LENGTHS.address, "Straat en huisnummer", errors, "address");
  validateLength(postalCode, MAX_LENGTHS.postalCode, "Postcode", errors, "postalCode");
  validateLength(city, MAX_LENGTHS.city, "Woonplaats", errors, "city");
  validateLength(subjectLine, MAX_LENGTHS.subject, "Onderwerp", errors, "subject");
  validateLength(selectedPackage, MAX_LENGTHS.package, "Pakket", errors, "package");
  validateLength(message, MAX_LENGTHS.message, "Bericht", errors, "message");

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Controleer de ingevulde velden en probeer het opnieuw.", fieldErrors: errors },
      { status: 400 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const emailSubject = subjectLine || "Nieuwe contactaanvraag";

  const text = [
    "Nieuwe contactaanvraag via de website van Rijschool Vlam",
    "",
    `Voornaam: ${firstName}`,
    `Achternaam: ${lastName}`,
    `Telefoon: ${phone}`,
    `E-mail: ${email}`,
    `Straat en huisnummer: ${address || "—"}`,
    `Postcode: ${postalCode || "—"}`,
    `Woonplaats: ${city || "—"}`,
    `Onderwerp: ${subjectLine || "—"}`,
    `Pakket: ${selectedPackage || "—"}`,
    "",
    "Bericht:",
    message || "—",
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      replyTo: email,
      subject: `Contactaanvraag Rijschool Vlam - ${fullName} - ${emailSubject}`,
      text,
      to: CONTACT_TO_EMAIL,
    });

    if (error) {
      console.error("Resend send error:", error);

      return NextResponse.json(
        { error: "Je bericht kon niet worden verstuurd. Probeer het later opnieuw." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Unexpected contact form error:", error);

    return NextResponse.json(
      { error: "Je bericht kon niet worden verstuurd. Probeer het later opnieuw." },
      { status: 500 }
    );
  }
}
