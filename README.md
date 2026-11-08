# CSVJetty Next.js Example

Try CSV upload, column mapping, validation, and inline corrections in a Next.js Pages Router project using the published CSVJetty React component. Import results appear as JSON in your browser.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/csvjetty-repo/csvjetty-nextjs-example)

[Live demo](https://www.csvjetty.com/demo) · [Documentation](https://www.csvjetty.com/docs) · [npm package](https://www.npmjs.com/package/csvjetty)

## Run locally

Requires Node.js 20.9 or newer and npm. `.nvmrc` selects Node.js 22 for nvm users. An internet connection is required to load the hosted importer.

```bash
git clone https://github.com/csvjetty-repo/csvjetty-nextjs-example.git
cd csvjetty-nextjs-example
npm ci
npm run dev
```

Open http://localhost:3000. No account, importer key, or environment variables required.

## Try the sample

1. Download **sample contacts CSV** from the page.
2. Click **Import Data** and upload the downloaded file.
3. Review the mappings for `name`, `email`, and `joined`.
4. Correct Grace’s email to `grace@example.com` and Katherine’s date to `2026-03-20`. Import is blocked until both errors are corrected.
5. Import and close the modal to inspect the received records and metadata.

The example uses `csvjetty@0.5.6`, with `demo` enabled and `baseUrl="https://www.csvjetty.com"`. Demo mode uses CSVJetty’s built-in contacts fields and calls the page’s `onData` handler without reserving a database session or consuming an account’s allowance. Uploaded files and records stay in the browser. The page shows the first 20 records; reloading clears them. It does not save records to a database.

## Use your own importer

For a production integration:

1. Create an importer at https://www.csvjetty.com/ and select **OnData Callback** delivery.
2. Configure required `name` (text), `email` (email), and `joined` (date) fields to match this sample. Set aliases `Full Name`, `Email Address`, and `Joined On` for automatic mapping. Enable blocking invalid rows.
3. In `components/ImportDataButton.js`, remove `demo` and add `importerKey="YOUR_PUBLIC_IMPORTER_KEY"`. Keep the existing `baseUrl`.
4. Replace the state-only callback with a request to your own authenticated backend. Validate and authorize records there, await saving, and throw if saving fails. Handle retries using the import ID and source row numbers.

Production importers require an account and are subject to [service plans and limits](https://www.csvjetty.com/#pricing). The importer key is a public identifier, not a secret credential. See the [callback documentation](https://www.csvjetty.com/docs/callbacks).

## Troubleshooting

- **Importer does not load:** check network access to `https://www.csvjetty.com`. In StackBlitz, try opening the preview in a separate tab.
- **Different fields appear:** demo mode has a fixed contacts schema. Use a registered importer for custom fields.
- **No records appear:** correct both sample errors, click Import, and close the modal.
- **Port 3000 is occupied:** use the local URL printed by Next.js.

## Check and build

```bash
npm run lint
npm run build
npm start
```

## License

[MIT](LICENSE) for this example. CSVJetty service and package terms are separate.

## StackBlitz compatibility

This small example uses the Pages Router and starts with Webpack. The tested StackBlitz environment could not run Turbopack, and its App Router request failed with an uninitialized workStore. This configuration preserves the same React component, hosted importer, sample, and callback. The npm package also supports App Router applications on supported Node.js hosts.
