/** Verwijder inline kleuren uit CMS-HTML zodat themakleuren (donker + lichte tekst) gelden. */
export function stripInlinePresentationAttrs(html: string): string {
  return html
    .replace(/\sstyle=(?:"[^"]*"|'[^']*')/gi, "")
    .replace(/\s(color|bgcolor|face)=(?:"[^"]*"|'[^']*')/gi, "");
}
