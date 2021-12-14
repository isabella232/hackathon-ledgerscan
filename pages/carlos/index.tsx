import { Text, SearchInput } from '@ledgerhq/react-ui'
import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'

const Home: NextPage = () => {
  return (
    <div>
        <Header/>
            <div className={styles.main}>
                <Text>Sometext</Text>
            </div>
        <Footer />
    </div>
  )
}

export default Home
