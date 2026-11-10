# CSV contact imports for shadcn/ui

Install a contacts import card and an account-free preview into a React 18/19
project with shadcn/ui configured. The installer adds the `csvjetty` npm package
and the shadcn Card and Table components.

CSVJetty supplies a hosted CSV mapping, validation, and correction interface.
These integration components are MIT licensed. The hosted service is separate;
production use requires a CSVJetty account and public importer key.

## Install after these files are published to the example repository

```sh
npx shadcn@latest add csvjetty-repo/csvjetty-nextjs-example/contact-csv-import
```

The command will work only after the registry files have been pushed to that
repository. No new hosting service is required for this GitHub installation.

## Account-free preview

```jsx
"use client";

import { ContactCsvImportDemo } from "@/components/contact-csv-import-demo";

export default function ContactsPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <ContactCsvImportDemo />
    </main>
  );
}
```

Save the following as `contacts.csv` and upload it. The second row deliberately
contains an invalid email so you can try inline correction.

```csv
Full Name,Work Email,Organization
Alex Chen,alex@example.com,Acme
Sam Rivera,not-an-email,Example Inc
```

The preview shows the latest callback batch in memory. It does not persist
contacts or combine batches into a database.

## Connect your application

Create an importer at https://www.csvjetty.com/dashboard and select callback
delivery. Supply its public importer UUID and your own save handler. Runtime
columns in this component replace the dashboard columns for that session.

```jsx
"use client";

import { ContactCsvImport } from "@/components/contact-csv-import";

export default function ContactsPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <ContactCsvImport
        importerKey={process.env.NEXT_PUBLIC_CSVJETTY_IMPORTER_KEY}
        onData={async (payload) => {
          const response = await fetch("/api/contacts/import", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!response.ok) throw new Error("Contacts could not be saved. Please retry.");
          if (response.status === 204) return;
          return response.json();
        }}
      />
    </main>
  );
}
```

`/api/contacts/import` is an integration contract: implement it in your existing
authenticated app. It is not included or created by the installer. Return 204
or `{ "errors": [] }` after a successful save, or
`{ "errors": [{ "row": 2, "message": "Email already exists" }] }` for row errors.
Validate data on your server and use `importId` plus original `rowNumbers` to
deduplicate repeated deliveries. Do not put server credentials in the component.

Callback row data stays in the browser until your handler sends it somewhere.
CSVJetty receives configuration and import metadata.

## Publish this overlay

Extract the ZIP at the root of the existing `csvjetty-nextjs-example` checkout.
It adds files without replacing the project's README, package.json, or app routes.
Review any existing `registry.json` before extracting; merge it if you already
have a registry.

```sh
node scripts/build-csvjetty-registry.mjs
git add registry.json contact-csv-import.json registry/new-york/contact-csv-import scripts/build-csvjetty-registry.mjs CSVJETTY_REGISTRY.md
git commit -m "Add installable CSV contact importer for shadcn"
git push origin main
```

Then verify the public repository:

```sh
npx shadcn@latest registry validate csvjetty-repo/csvjetty-nextjs-example
```

The included built item JSON can also be served alongside `registry.json` from
a public static root for URL-based installation. Keep `registry.json` without
embedded file content. Regenerate the built item JSON after source changes.

## Directory submission is a separate step

Publishing the repository enables installation by its GitHub address. It does
not add CSVJetty to the official shadcn registry directory. The directory uses
reviewed pull requests in `shadcn-ui/ui`, editing
`apps/v4/registry/directory.json`; follow its current entry format and run
`pnpm validate:registries`. A public flat registry URL must be live before
submitting. Do not claim directory acceptance before the PR is merged.

Suggested listing copy:

CSVJetty — CSV contact import card with column mapping, validation, inline
correction, browser callbacks, and an account-free demo. MIT integration source
for the hosted CSVJetty service.

## References

- https://ui.shadcn.com/docs/registry/github
- https://ui.shadcn.com/docs/registry/registry-index
- https://www.csvjetty.com/docs/reference/component
- https://www.csvjetty.com/docs/callbacks
- https://www.npmjs.com/package/csvjetty
