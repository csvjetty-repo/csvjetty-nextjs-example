import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>CSVJetty Next.js Example</title>
        <meta name="description" content="Try CSVJetty CSV upload, column mapping, validation, correction, and callback delivery." />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
