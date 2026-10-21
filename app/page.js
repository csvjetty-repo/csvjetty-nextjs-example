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
          <li>Use a CSV matching the configured importer fields.</li>
          <li>Click Import Data and upload your file.</li>
          <li>Review the column mapping and correct any errors.</li>
          <li>Complete the import to see the received records below.</li>
        </ol>

        <p>
          A{" "}
          <a href="/sample-contacts.csv" download>
            sample contacts CSV
          </a>{" "}
          is included. It works with an importer configured for name,
          email, and company. One email is deliberately invalid.
        </p>

        <ImportDataButton />
      </div>

      <footer>
        <a href="https://www.csvjetty.com/">CSVJetty</a>
        <a href="https://www.csvjetty.com/docs">Documentation</a>
        <a href="https://www.npmjs.com/package/csvjetty">npm package</a>
      </footer>
    </main>
  );
}
