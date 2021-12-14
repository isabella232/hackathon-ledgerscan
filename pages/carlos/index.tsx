import { Text } from '@ledgerhq/react-ui'
import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

const Home: NextPage = () => {
  return (
    <div>
    
        <Header />
        <div className={styles.container}>
            <div className={styles.main}>
                <Text>Sometext</Text>
            </div>
            </div>
        <Footer />
    </div>
  )
}

export default Home
