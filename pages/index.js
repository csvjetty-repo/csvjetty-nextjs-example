import ImportDataButton from "../components/ImportDataButton";

export default function Home() {
  return (
    <main>
      <p className="eyebrow">CSVJetty + Next.js</p>
      <h1>Import CSV data into your app</h1>

      <p className="intro">
        Upload a CSV, match columns, and correct invalid values.
        Receive the resulting records through a React callback.
      </p>

      <div className="card">
        <h2>Try an import</h2>
        <ol>
          <li>Download the sample contacts CSV below.</li>
          <li>Click Import Data and upload your file.</li>
          <li>Review the column mapping and correct any errors.</li>
          <li>Complete the import to see the received records below.</li>
        </ol>

        <p>
          A{" "}
          <a href="/sample-contacts.csv" download>
            sample contacts CSV
          </a>{" "}
          contains three fictional contacts. Correct Grace’s email to
          grace@example.com and Katherine’s date to 2026-03-20 before importing.
        </p>

        <ImportDataButton />

        <p className="demo-note">
          No account, importer key, or environment variables required. Your CSV
          and imported records stay in this browser tab. Reloading clears them.
        </p>
      </div>

      <footer>
        <a href="https://www.csvjetty.com/">CSVJetty</a>
        <a href="https://www.csvjetty.com/docs">Documentation</a>
        <a href="https://www.npmjs.com/package/csvjetty">npm package</a>
      </footer>
    </main>
  );
}
