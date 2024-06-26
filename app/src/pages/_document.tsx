/* eslint-disable react/jsx-props-no-spreading */
import type { DocumentContext } from 'next/document'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'

import customTheme from '@/styles/theme'
import Meta from '@/component/meta'

class MyDocument extends Document {
  static getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx)
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Figtree:wght@300..900&display=swap"
            rel="stylesheet"
          />
          <Meta />
        </Head>
        <body>
          <ColorModeScript initialColorMode={customTheme.config?.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
