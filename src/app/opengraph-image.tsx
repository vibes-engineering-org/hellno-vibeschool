import { readFile } from "fs/promises";
import { join } from "path";
import { PROJECT_TITLE } from "~/lib/constants";

export const alt = PROJECT_TITLE;
export const contentType = "image/png";
export const size = {
  width: 993,
  height: 520,
};

export default async function Image() {
  const imagePath = join(process.cwd(), "public", "og.png");
  const imageBuffer = await readFile(imagePath);

  return new Response(imageBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
