import { Flex, Logos, Switch, Text } from '@ledgerhq/react-ui'
import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
        <Flex flexDirection="column" alignItems="center" rowGap={12} p={12}>
            <Text color="neutral.c100">
            <Logos.LedgerLiveRegular />
            </Text>
            <Text variant="h1">Hello, world!</Text>
            <Switch
                name="select-theme"
                checked={true}
                onChange={() => console.log('toto')}
            />
        </Flex>
    </div>
  )
}

export default Home
