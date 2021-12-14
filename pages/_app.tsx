import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "@ledgerhq/react-ui/assets/fonts"; // all fonts are consumed by the bundler and outputted to /assets
import { StyleProvider } from "@ledgerhq/react-ui";
import styles from '../styles/App.module.css';
import styled from 'styled-components'
import { useRouter } from 'next/router';
import Header from '../components/Header';

const Root = styled.div`
  background-color: ${(p) => p.theme.colors.background.main};
`

function RootStyle({ children } : { children: JSX.Element }){
  const router = useRouter();

  return <Root>
      {router.pathname !== '/' &&
        <Header />
      }
      <App>
        {children}
      </App>
      <Footer />
  </div>
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyleProvider selectedPalette="dark">
      <RootStyle>
        <Component {...pageProps} />
      </RootStyle>
    </StyleProvider>
  )
}

export default MyApp
