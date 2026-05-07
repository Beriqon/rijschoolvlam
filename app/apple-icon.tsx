import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { SITE_LOGO } from "@/lib/constants";

export const runtime = "nodejs";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const filePath = join(process.cwd(), "public", SITE_LOGO.src.replace(/^\//, ""));
  const logoBuffer = await readFile(filePath);
  const dataUrl = `data:image/png;base64,${logoBuffer.toString("base64")}`;
  const imgW = 152;
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
