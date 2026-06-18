import sharp from "sharp";
import path from "node:path";

const cutoutPath = path.join(process.cwd(), "public", "images", "chris-cutout.png");

async function main() {
  const trimmed = await sharp(cutoutPath).trim({ threshold: 12 }).png().toBuffer();
  const meta = await sharp(trimmed).metadata();
  if (!meta.width || !meta.height) throw new Error("Could not read cutout dimensions");

  const padX = Math.round(meta.width * 0.08);
  const padTop = Math.round(meta.height * 0.03);

  await sharp(trimmed)
    .extend({
      top: padTop,
      bottom: 0,
      left: padX,
      right: padX,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(cutoutPath);

  console.log(`Optimized cutout: ${meta.width}x${meta.height} (+ padding)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
