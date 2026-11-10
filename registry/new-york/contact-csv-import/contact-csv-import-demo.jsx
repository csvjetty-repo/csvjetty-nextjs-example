"use client";

import { useState } from "react";
import { ContactCsvImport } from "./contact-csv-import";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ContactCsvImportDemo() {
  const [batch, setBatch] = useState(null);

  return (
    <div className="space-y-6">
      <ContactCsvImport
        demo
        onData={(payload) => {
          setBatch({ rows: payload.rows, rowNumbers: payload.rowNumbers });
        }}
      />
      <p className="text-sm text-muted-foreground">
        Account-free demo. Records are displayed in this browser and are not saved
        by this example. Refreshing clears the preview.
      </p>
      {batch && (
        <section aria-label="Imported contacts preview" className="space-y-3">
          <p role="status" className="text-sm text-muted-foreground">
            Received {batch.rows.length} rows in the latest batch. Showing up to 10.
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batch.rows.slice(0, 10).map((row, index) => (
                <TableRow key={batch.rowNumbers[index]}>
                  <TableCell>{String(row.name ?? "")}</TableCell>
                  <TableCell>{String(row.email ?? "")}</TableCell>
                  <TableCell>{String(row.company ?? "")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}
    </div>
  );
}
