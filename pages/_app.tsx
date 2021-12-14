import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import "@ledgerhq/react-ui/assets/fonts"; // all fonts are consumed by the bundler and outputted to /assets
import { StyleProvider } from "@ledgerhq/react-ui";

type Palette = "light" | "dark" | undefined;

function MyApp({ Component, pageProps }: AppProps) {
  const [palette, setPalette] = useState("light" as Palette);
  return (
    <StyleProvider fontsPath="assets" selectedPalette={palette}>
      <Component {...pageProps} />
    </StyleProvider>
  )
}

export default MyApp
