import { removeBackground } from "@imgly/background-removal-node";
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const inputPath = path.join(root, "public", "Chris Solo Balcony.jpg");
const outputPath = path.join(root, "public", "images", "chris-cutout.png");

async function main() {
  console.log("Removing background from hero photo...");
  const output = await removeBackground(pathToFileURL(inputPath).href, {
    model: "medium",
    output: {
      format: "image/png",
      type: "foreground",
    },
  });
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, Buffer.from(await output.arrayBuffer()));
  console.log(`Saved cutout to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
