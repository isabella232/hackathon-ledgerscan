import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "@ledgerhq/react-ui/assets/fonts"; // all fonts are consumed by the bundler and outputted to /assets
import { StyleProvider } from "@ledgerhq/react-ui";
import styled from 'styled-components'
import { useRouter } from 'next/router';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Root = styled.div`
  background-color: ${(p) => p.theme.colors.neutral.c00};
  color: ${(p) => p.theme.colors.neutral.c100};
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const App = styled.div`
  width: 1440px;
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
  </Root>
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
