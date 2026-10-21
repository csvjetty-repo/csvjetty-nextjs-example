# CSVJetty Next.js Example

A working CSV import example built with
[CSVJetty](https://www.csvjetty.com/) and Next.js.

Upload CSV files, map columns, correct invalid values, and receive
records through an `onData` callback.

## Run locally

```bash
git clone https://github.com/csvjetty-repo/csvjetty-nextjs-example.git
cd csvjetty-nextjs-example
npm install
npm run dev
```

Open http://localhost:3000.

## Importer configuration

The example uses a public importer key in
`components/ImportDataButton.js`.

To use your own configuration:

1. Create an importer at https://www.csvjetty.com/.
2. Configure its fields and select callback delivery.
3. Replace `importerKey` in `components/ImportDataButton.js`.

The included `public/sample-contacts.csv` assumes these fields:

| Key | Type | Required |
| --- | --- | --- |
| name | Text | Yes |
| email | Email | Yes |
| company | Text | No |

One sample email is deliberately invalid so you can try inline corrections.

Use synthetic data when testing a shared demonstration importer.

## How it works

The client component opens CSVJetty and receives:

- `rows`: imported records
- `importId`: the import identifier
- `rowNumbers`: source row numbers

The example stores the callback payload in React state and displays
the first 20 records. It does not persist data to a database.

For production use, send records to your authenticated backend,
validate them server-side, and save them with your application's
authorization rules.

## Build

```bash
npm run build
npm start
```

## Resources

- [CSVJetty](https://www.csvjetty.com/)
- [Documentation](https://www.csvjetty.com/docs)
- [npm package](https://www.npmjs.com/package/csvjetty)

## License

MIT
