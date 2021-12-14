import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "@ledgerhq/react-ui/assets/fonts"; // all fonts are consumed by the bundler and outputted to /assets
import { StyleProvider } from "@ledgerhq/react-ui";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyleProvider fontsPath="assets" selectedPalette={"dark"}>
      <Component {...pageProps} />
    </StyleProvider>
  )
}

export default MyApp
