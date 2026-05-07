import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { SITE_LOGO } from "@/lib/constants";

export const runtime = "nodejs";

/** Vierkant icoon (Google zoekt 1:1); logo gecentreerd op zwart zoals de brand. */
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default async function Icon() {
  const filePath = join(process.cwd(), "public", SITE_LOGO.src.replace(/^\//, ""));
  const logoBuffer = await readFile(filePath);
  const dataUrl = `data:image/png;base64,${logoBuffer.toString("base64")}`;
  const imgW = 432;
  const imgH = Math.round(imgW * (SITE_LOGO.height / SITE_LOGO.width));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori / ImageResponse */}
        <img src={dataUrl} alt="" width={imgW} height={imgH} />
      </div>
    ),
    { ...size },
  );
}
