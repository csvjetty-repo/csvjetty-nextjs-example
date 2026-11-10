"use client";

import CSVJetty from "csvjetty";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const columns = [
  {
    name: "name",
    label: "Full name",
    type: "text",
    required: true,
    aliases: ["Contact Name", "Full Name"],
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    required: true,
    aliases: ["Work Email", "Email Address"],
  },
  {
    name: "company",
    label: "Company",
    type: "text",
    aliases: ["Organization", "Company Name"],
  },
];

/**
 * Use demo explicitly for the account-free preview. For real imports, supply
 * a public importerKey and an onData callback that saves to your own API.
 * The hosted CSVJetty service supplies the mapping and correction interface.
 */
export function ContactCsvImport({
  importerKey,
  demo = false,
  onData,
  onComplete,
  onClose,
  accentColor,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Import contacts</CardTitle>
        <CardDescription>
          Upload a CSV, match its columns, and correct invalid values before importing.
          Name and email are required; company is optional.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CSVJetty
          importerKey={importerKey}
          demo={demo}
          columns={columns}
          onData={onData}
          onComplete={onComplete}
          onClose={onClose}
          accentColor={accentColor}
        >
          Import contacts
        </CSVJetty>
      </CardContent>
    </Card>
  );
}
