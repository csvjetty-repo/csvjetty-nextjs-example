import "./globals.css";

export const metadata = {
  title: "CSVJetty Next.js Example",
  description:
    "A Next.js CSV import example using CSVJetty for column mapping, validation, inline corrections, and callback delivery.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
