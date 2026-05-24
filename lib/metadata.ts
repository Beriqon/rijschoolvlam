import type { Metadata } from "next";

/** Per-pagina canonical (pad begint met /). */
export function withCanonical(path: string, metadata: Metadata): Metadata {
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: path,
    },
  };
}
