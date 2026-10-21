"use client";

import { useState } from "react";
import CSVJetty from "csvjetty";

export default function ImportDataButton() {
  const [received, setReceived] = useState(null);

  return (
    <section>
      <CSVJetty
        importerKey="3c4ebb5f-6ccb-484d-a681-bf9e1da7c588"
        baseUrl="https://www.csvjetty.com"
        onData={async ({ rows, importId, rowNumbers }) => {
          setReceived({ rows, importId, rowNumbers });
        }}
      >
        Import Data
      </CSVJetty>

      {received && (
        <div className="results" aria-live="polite">
          <h2>Import complete</h2>
          <p>Received {received.rows.length} rows in your app.</p>
          <p>
            This example displays the first 20 rows without saving them
            to a database.
          </p>
          <pre>
            {JSON.stringify(received.rows.slice(0, 20), null, 2)}
          </pre>
          <details>
            <summary>Import metadata</summary>
            <pre>
              {JSON.stringify(
                {
                  importId: received.importId,
                  rowNumbers: received.rowNumbers,
                },
                null,
                2
              )}
            </pre>
          </details>
        </div>
      )}
    </section>
  );
}
