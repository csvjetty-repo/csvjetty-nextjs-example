import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registry = JSON.parse(await readFile(path.join(root, "registry.json"), "utf8"));
for (const item of registry.items) {
  const files = await Promise.all(item.files.map(async (file) => ({
    ...file,
    content: await readFile(path.join(root, file.path), "utf8"),
  })));
  const output = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    ...item,
    files,
  };
  await writeFile(path.join(root, `${item.name}.json`), JSON.stringify(output, null, 2) + "\n");
  console.log(`Built ${item.name}.json`);
}
