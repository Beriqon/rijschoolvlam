import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const CONTACT_TO_EMAIL = "info@rijschoolvlam.nl";
const CONTACT_FROM_EMAIL = "info@rijschoolvlam.nl";

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

function redactSecrets(value: string) {
  const pass = process.env.SMTP_PASS;
  if (!pass || !value.includes(pass)) {
    return value;
  }

  return value.replaceAll(pass, "[REDACTED]");
}

function getMailErrorDetails(error: unknown) {
  if (!error || typeof error !== "object") {
    return { name: undefined, code: undefined, message: undefined };
  }

  const err = error as {
    name?: unknown;
    code?: unknown;
    message?: unknown;
    response?: unknown;
    responseCode?: unknown;
    command?: unknown;
  };

  const message =
    typeof err.message === "string" ? redactSecrets(err.message) : undefined;

  return {
    name: typeof err.name === "string" ? err.name : undefined,
    code: typeof err.code === "string" ? err.code : undefined,
    message,
    response: typeof err.response === "string" ? redactSecrets(err.response) : err.response,
    responseCode: err.responseCode,
    command: typeof err.command === "string" ? err.command : undefined,
  };
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const portRaw = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !portRaw || !user || !pass) {
    return null;
  }

  const port = Number(portRaw);

  if (!Number.isFinite(port) || port <= 0) {
    return null;
  }

  return {
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  };
}

export async function POST(request: Request) {
  const smtpConfig = getSmtpConfig();

  if (!smtpConfig) {
    console.error(
      "Missing or invalid SMTP configuration. Required: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS."
    );

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
    const transporter = nodemailer.createTransport(smtpConfig);

    await transporter.sendMail({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Contactaanvraag Rijschool Vlam - ${fullName} - ${emailSubject}`,
      text,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const details = getMailErrorDetails(error);

    console.error("SMTP contact form send error:", error);
    console.error("SMTP/Nodemailer error details:", details);

    const debugMessage =
      details.message ??
      "Je bericht kon niet worden verstuurd. Probeer het later opnieuw.";

    return NextResponse.json(
      {
        error: debugMessage,
        name: details.name,
        code: details.code,
        message: details.message,
      },
      { status: 500 }
    );
  }
}
