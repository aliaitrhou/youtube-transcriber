import { Head, Html, Main, NextScript } from 'next/document';

export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&family=Sora:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body style={{ maxHeight: '100dvh' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
