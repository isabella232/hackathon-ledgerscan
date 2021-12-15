import styled from "styled-components";
import styles from '../../../styles/Home.module.css'
import { useRouter } from "next/router"
import { FaBitcoin } from 'react-icons/fa';
import { Alert, Button, Flex, Icon, Table, Text} from "@ledgerhq/react-ui";
import { useState, useEffect } from "react"
import { BiCopy } from "react-icons/bi"
import {BtcTx} from "../../../components/BtcTx/BtcTx"
import Image from "next/image";

const ColumnStyle = styled.div`
  display: flex;
  flex-direction: column;
`;
type AccountView = {
    address: string,
    txs: any[],
    utxos: any[],
    balance: string
}

export const EXPLORER_STAGING_URL: string = 
  "https://explorers.api-01.vault.ledger-stg.com/blockchain/v3"

async function explorerGET(path:string) {
  let url = `${EXPLORER_STAGING_URL}${path}`
  console.log(url)
  return await fetch(url)
}

async function fetchAccountTxs(coin:string, address:string): Promise<any> {
  return await explorerGET(`/${coin}/addresses/${address}/transactions?batch_size=15&filtering=true&noinput=true`).then(x => x.json())
}
const RowStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 6px;
`;

const Divider = styled.hr`
    border-top: 2px solid #bbb;
    margin-top: 15px;
    margin-bottom: 15px;
`;

async function fetchAccountUTXOs(coin:string, address:string): Promise<any> {
  return await explorerGET(`/${coin}/addresses/${address}/utxos`).then(x => x.json())
}

async function fetchAccount(coin:string, address:string): Promise<AccountView> {
    let { txs } = await fetchAccountTxs(coin, address)
    let [{ utxos, balance }] = await fetchAccountUTXOs(coin, address)
    return { address, txs, utxos, balance }
}

const MyButton = styled(Button)`
  margin-inline: 10px;
  margin-inline-end: 0px;
`

const AccountInfo = styled.div`
  background-color: ${(p) => p.theme.colors.neutral.c20};
  padding: 24px;
  border-radius: 8px;
`

const BlockIcon = styled.div`
  height: 47px;
  width: 47px;
  background-color: ${(p) => p.theme.colors.neutral.c30};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`

const AccountValue = styled(Flex)`
  flex-direction: column;
  justify-content: space-between;
  height: 20px;
  margin-right: 60px;
`

function Wrapper(account: AccountView) {
  return (
    <Flex flexDirection={"column"} style={{marginTop: "60px", marginBottom: "40px"}}>
      <div className={styles.txHeader}>
        <Flex>
          <Image 
            src="/assets/icons/bitcoin.png" 
            alt=""
            width="40px"
            height="40px"
          />
          <Text style={{marginLeft: '10px'}} variant='h3' lineHeight="40px">TRANSACTION DETAILS</Text>
        </Flex>
        <Flex>  
          <MyButton variant="color" size={"small"} disabled={false} outline={false}>Buy</MyButton>
          <MyButton variant="color" size={"small"} disabled={false} outline={false}>Swap</MyButton>
        </Flex>
      </div>
      <AccountInfo>
        <RowStyle>
          <BlockIcon>
            <Icon name="QrCode"/>
          </BlockIcon>
          <ColumnStyle>
            <Text variant="paragraph">Address</Text>
            <Text variant="large" color="hsla(0, 0%, 76%, 1)">{account.address}</Text> 
          </ColumnStyle>
          <BiCopy/>
        </RowStyle>
        <Divider color="hsla(0, 1%, 23%, 1)"/>
        <RowStyle style={{
          marginBottom: "24px"
        }}>
          <AccountValue>
            <Text variant="small" color="hsla(0, 0%, 76%, 1)">Balance</Text>
            <Text variant="paragraph">{Number(account.balance) / 100000000} BTC</Text>
          </AccountValue>
          <AccountValue>
            <Text variant="small" color="hsla(0, 0%, 76%, 1)">Quantity</Text>
            <Text variant="paragraph">{account.txs.length} transactions</Text>
          </AccountValue>
          <AccountValue>
            <Text variant="small" color="hsla(0, 0%, 76%, 1)">Chain type</Text>
            <Text variant="paragraph">Taproot</Text>
          </AccountValue>
        </RowStyle>
        {account.txs.length > 1 && 
          <Alert 
            type="warning" 
            showIcon 
            title="This address has been used for more than one 1 transaction. This negatively impacts your privacy Learn why"
          />
        }
      </AccountInfo>
    </Flex>
  )
}

export default function Account() {
    const router = useRouter()
    const [account, setAccount] = useState<AccountView|undefined>(undefined)
    const { coin, address } = router.query

    useEffect(() => {
      const fetchData = async () => {
        const result = await fetchAccount(coin as string, address as string)
        console.log(result)
        setAccount(result)
      }
      if (router.isReady) {
        fetchData()
      }
    }, [coin, address, router.isReady])

    console.log('props', coin, address)
    if(!account){
      return null
    }
    return <Flex 
        flex={1} 
        width={"100%"} 
        flexDirection='column' 
        justifyContent={'space-between'}
      > 
        <div>
          <Wrapper {...account} ></Wrapper>
          <Text variant="h4">LATEST TRANSACTIONS</Text>           
          {account?.txs.length > 0 && <BtcTx {...account.txs[0]} />}
          {account?.txs.length > 1 && <BtcTx {...account.txs[1]} />}
        </div>
    </Flex>
}