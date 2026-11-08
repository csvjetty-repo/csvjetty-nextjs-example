"use client";

import { useState } from "react";
import CSVJetty from "csvjetty";

export default function ImportDataButton() {
  const [received, setReceived] = useState(null);
  const [completed, setCompleted] = useState(null);

  return (
    <section>
      <CSVJetty
        demo
        baseUrl="https://www.csvjetty.com"
        onData={async ({ rows, importId, rowNumbers }) => {
          setReceived({ rows, importId, rowNumbers });
          setCompleted(null);
        }}
        onComplete={setCompleted}
      >
        Import Data
      </CSVJetty>

      {received && (
        <div className="results" aria-live="polite">
          <h2>{completed ? "Import complete" : "Callback received"}</h2>
          <p role="status">{completed
            ? `${completed.accepted} records imported; ${completed.rejected} rejected.`
            : `Received ${received.rows.length} rows. Completing the import…`}</p>
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
