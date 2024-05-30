import { Chakra } from '@/component/ChakraProvider/Chakra'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/contexts/AuthContext'
import NextNprogress from 'nextjs-progressbar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Chakra>
        <NextNprogress
          color="#47C8FF"
          startPosition={0.3}
          stopDelayMs={0}
          height={5}
          showOnShallow={true}
          options={{ easing: 'ease', speed: 500 }}
        />
          <Component {...pageProps} />
      </Chakra>
    </AuthProvider>
  )
}
