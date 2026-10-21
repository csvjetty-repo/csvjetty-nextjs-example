# CSVJetty Next.js Example

Add CSV upload, column mapping, validation, and inline corrections to a
Next.js app with [CSVJetty](https://www.csvjetty.com/). This example receives
records through an `onData` callback and displays them as JSON.

[Documentation](https://www.csvjetty.com/docs) · [npm package](https://www.npmjs.com/package/csvjetty)

## Run locally

Requires Node.js 20.9 or newer and npm. `.nvmrc` selects Node.js 22 for nvm users.
An internet connection is required to load the hosted importer.

```bash
git clone https://github.com/csvjetty-repo/csvjetty-nextjs-example.git
cd csvjetty-nextjs-example
# Optional, if you use nvm:
# nvm install
# nvm use
npm ci
npm run dev
```

Open http://localhost:3000. No environment variables are needed. The example
includes a public shared importer key, so you can try it without creating
an account while that importer is available and within its usage allowance.

## Try the sample

1. Download **sample contacts CSV** from the page.
2. Click **Import Data** and select the downloaded file.
3. Review the mappings for `name`, `email`, and `company`.
4. Correct `invalid-email` to `sam@example.com` in the review table.
5. Complete the import. The received records appear below the button.

The columns and validation rules are defined directly in
`components/ImportDataButton.js`, overriding the dashboard columns for the
session. The included CSV contains three fictional contacts. Use synthetic
data with the shared demonstration importer.

## Use your own importer

CSVJetty is a hosted service. The MIT license covers this example code;
running your own importer requires a CSVJetty account and public importer
key, subject to the service's [current plans and limits](https://www.csvjetty.com/#pricing).
The key identifies an importer; it is not a secret credential.

1. Create an importer at https://www.csvjetty.com/.
2. Select **OnData Callback** delivery.
3. Replace `importerKey` in `components/ImportDataButton.js` with your public key.
4. Keep the supplied `columns` prop to use the sample, or edit both the columns
   and sample CSV for your application.

No webhook or database setup is required for this example.

## How it works

`components/ImportDataButton.js` is the client component containing the
integration. `columns` defines the output keys and validation rules:

| Key | Type | Required |
| --- | --- | --- |
| name | Text | Yes |
| email | Email | Yes |
| company | Text | No |

The `onData` callback receives `rows`, `importId`, and `rowNumbers`.
The example stores the payload in React state and displays the first 20
records plus import metadata. Reloading the page clears those records.
It does not save records to a database.

To save records in production, replace the callback's `setReceived` call
with a request to your own authenticated backend. Validate and authorize
records there, and use the import ID and source row numbers to handle retries
without duplicating writes. See the [callback documentation](https://www.csvjetty.com/docs).

## Troubleshooting

- **Shared importer unavailable or allowance exhausted:** create your own
  importer and replace the key using the steps above.
- **Sample fields do not appear:** keep the supplied `columns` prop; it
  configures this example's fields in code.
- **No records appear after import:** check that your importer uses
  **OnData Callback** delivery and finish the import after correcting errors.
- **Importer does not load:** check your internet connection, browser console,
  and any extensions or network rules blocking `https://www.csvjetty.com`.
- **Port 3000 is occupied:** use the local URL printed by Next.js instead.

## Check and build

```bash
npm run lint
npm run build
npm start
```

## License

[MIT](LICENSE) for this example. CSVJetty service and package terms are separate.
