import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import pngToIco from "png-to-ico";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const tmp = path.join(root, ".tmp-fav");
const sizes = [16, 32, 48];
const files = sizes.map((s) => path.join(tmp, `${s}.png`));

const buf = await pngToIco(files);
fs.writeFileSync(path.join(root, "app", "favicon.ico"), buf);
console.log(`Wrote app/favicon.ico (${buf.length} bytes)`);
