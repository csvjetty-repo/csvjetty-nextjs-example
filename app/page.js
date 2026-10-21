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
          contains three fictional contacts. Change invalid-email to
          sam@example.com in the correction table before completing the import.
        </p>

        <ImportDataButton />

        <p className="demo-note">
          This example uses a shared hosted importer. Use fictional data.
          If it is unavailable or its allowance is exhausted, create your own{" "}
          <a href="https://www.csvjetty.com/">CSVJetty importer</a>, select
          callback delivery, and replace the public key in{" "}
          <code>components/ImportDataButton.js</code>.
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
