import { Head, Html, Main, NextScript } from 'next/document';
import { getCssText } from '../stitches.config';

export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&family=Sora:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body style={{ maxHeight: '100dvh' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
