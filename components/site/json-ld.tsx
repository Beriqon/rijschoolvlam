import { ADDRESS, PHONE_E164, SITE_NAME, SITE_URL } from "@/lib/constants";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "DrivingSchool",
    name: SITE_NAME,
    url: SITE_URL,
    telephone: PHONE_E164,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      postalCode: ADDRESS.postalCode.replace(/\s/g, ""),
      addressLocality: ADDRESS.city,
      addressCountry: "NL",
    },
    areaServed: { "@type": "City", name: "Utrecht" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
