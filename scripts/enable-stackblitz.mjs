import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = (name) => path.join(root, name);
const move = (from, to) => {
  if (!fs.existsSync(file(from))) return;
  if (fs.existsSync(file(to))) throw new Error(`Refusing to overwrite ${to}`);
  fs.mkdirSync(path.dirname(file(to)), { recursive: true });
  fs.renameSync(file(from), file(to));
};
if (fs.existsSync(file("app/layout.js"))) {
  const layout = fs.readFileSync(file("app/layout.js"), "utf8");
  if (!layout.includes("export default function RootLayout") || !layout.includes("./globals.css")) {
    throw new Error("Unexpected layout; no changes made. Inspect app/layout.js first.");
  }
}
if (!fs.existsSync(file("app/page.js")) && !fs.existsSync(file("pages/index.js"))) {
  throw new Error("Run this in the csvjetty-nextjs-example repository.");
}
move("app/page.js", "pages/index.js");
move("app/globals.css", "styles/globals.css");
move("app/icon.svg", "public/icon.svg");
const appComponent = `import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>CSVJetty Next.js Example</title>
        <meta name="description" content="Try CSVJetty CSV upload, column mapping, validation, correction, and callback delivery." />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
`;
if (fs.existsSync(file("pages/_app.js")) && fs.readFileSync(file("pages/_app.js"), "utf8") !== appComponent) {
  throw new Error("Refusing to overwrite existing pages/_app.js. File moves are preserved.");
}
fs.writeFileSync(file("pages/_app.js"), appComponent);
if (fs.existsSync(file("app/layout.js"))) fs.unlinkSync(file("app/layout.js"));
if (fs.existsSync(file("app")) && !fs.readdirSync(file("app")).length) fs.rmdirSync(file("app"));
const pkg = JSON.parse(fs.readFileSync(file("package.json"), "utf8"));
pkg.scripts.dev = "next dev --webpack";
fs.writeFileSync(file("package.json"), JSON.stringify(pkg, null, 2) + "\n");
const readmePath = file("README.md");
let readme = fs.readFileSync(readmePath, "utf8").replaceAll("Next.js App Router", "Next.js Pages Router");
if (!readme.includes("## StackBlitz compatibility")) {
  readme += "\n## StackBlitz compatibility\n\nThis small example uses the Pages Router and starts with Webpack. The tested StackBlitz environment could not run Turbopack, and its App Router request failed with an uninitialized workStore. This configuration preserves the same React component, hosted importer, sample, and callback. The npm package also supports App Router applications on supported Node.js hosts.\n";
}
fs.writeFileSync(readmePath, readme);
console.log("Enabled StackBlitz compatibility. Review git diff, run npm run lint and npm run build, then commit and push using the CSVJetty account.");
