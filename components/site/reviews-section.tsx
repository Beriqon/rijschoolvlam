import { Section, SectionHeading } from "@/components/site/section";
import { ReviewsCarousel } from "@/components/site/reviews-carousel";
import { getReviewsWithFallback } from "@/lib/reviews-data";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?sca_esv=3fc7abff1a42fafb&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOZtWYgukX6fFYqiX1BDjzz5QG1Pc6C7_dt_6BYNrjk--gtPOkmyyoB6scDS-FBIPUzbg4OwaSMzgWDi_K0O6ZPXyfsQ-cowYdWms7rZ2dCiqQD9--tvTT3bR5K4PypirBoH6zso%3D&q=Rijschool+Utrecht+%7C+Rijschool+Vlam+Reviews&sa=X&ved=2ahUKEwjSs77l6aSUAxV14wIHHbIaMFcQ0bkNegQIKhAH&biw=1536&bih=730&dpr=1.25";
const FACEBOOK_REVIEWS_URL = "https://www.facebook.com/www.rijschoolvlam.nl/reviews";

function ReviewPill({
  as = "div",
  href,
  children,
}: {
  as?: "div" | "a";
  href?: string;
  children: React.ReactNode;
}) {
  const className =
    "bg-card border-border text-muted-foreground hover:bg-muted/40 focus-visible:ring-ring inline-flex items-center rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  if (as === "a" && href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return <div className={className}>{children}</div>;
}

export async function ReviewsSection() {
  const reviews = await getReviewsWithFallback();

  return (
    <Section>
      <SectionHeading
        eyebrow="Ervaringen"
        title="Wat leerlingen zeggen"
        description="Waardering die we vaak van leerlingen horen: rust in de les, flexibele planning en duidelijke afspraken. Plan een gratis proefles om zelf te ervaren hoe we werken."
      />
      <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-3 text-center">
        <ReviewPill>
          <strong className="text-foreground font-semibold">5,0/5</strong> sterren •{" "}
          <strong className="text-foreground font-semibold">503</strong>
          {"\u00A0"}
          reviews (totaal)
        </ReviewPill>
        <ReviewPill as="a" href={GOOGLE_REVIEWS_URL}>
          Google: <strong className="text-foreground font-semibold">5,0/5</strong> •{" "}
          <strong className="text-foreground font-semibold">177</strong>
          {"\u00A0"}
          reviews
        </ReviewPill>
        <ReviewPill as="a" href={FACEBOOK_REVIEWS_URL}>
          Facebook: <strong className="text-foreground font-semibold">5,0/5</strong> •{" "}
          <strong className="text-foreground font-semibold">326</strong>
          {"\u00A0"}
          reviews
        </ReviewPill>
      </div>

      <p className="text-muted-foreground mx-auto mt-4 max-w-4xl text-center text-sm">
        Bekijk al onze{" "}
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noreferrer"
          className="text-primary font-medium underline underline-offset-4"
        >
          Google reviews
        </a>{" "}
        of{" "}
        <a
          href={FACEBOOK_REVIEWS_URL}
          target="_blank"
          rel="noreferrer"
          className="text-primary font-medium underline underline-offset-4"
        >
          Facebook reviews
        </a>
        .
      </p>
      <ReviewsCarousel reviews={reviews} />
    </Section>
  );
}
