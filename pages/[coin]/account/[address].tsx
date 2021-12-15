import styled from "@ledgerhq/react-ui/components/styled";
import { useRouter } from "next/router"
import { FaBitcoin } from 'react-icons/fa';
import { BiCopy } from 'react-icons/bi';
import { Alert, Button, Icon, Table} from "@ledgerhq/react-ui";
import { useState, useEffect } from "react"

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

function MyButton({text}) {
    return (
        <Button variant="main" outline={false}>{text}</Button>
    )
}


function Wrapper(account: AccountView) {
    const alert = account.txs.length > 1 ? (
    <RowStyle>
        <Alert type="warning" showIcon title="This address has been used for more than one 1 transaction. This negatively impacts your privacy Learn why"/>
    </RowStyle>)
    : <RowStyle/>
    return (
        <ColumnStyle>
            <RowStyle><FaBitcoin/><h2>MY BITCOIN ACCOUNT 1</h2><MyButton text="Buy"></MyButton><MyButton text="Swap"></MyButton></RowStyle>
            <RowStyle><Icon name="QrCode"/><ColumnStyle><a>Address</a><a>{account.address} <BiCopy/></a></ColumnStyle></RowStyle>
            <Divider/>
            <RowStyle>
                <ColumnStyle><a>Balance</a><a>{account.balance} BTC</a></ColumnStyle>
                <ColumnStyle><a>Quantity</a><a>{account.txs.length} transactions</a></ColumnStyle>
                <ColumnStyle><a>Chain type</a><a>Taproot</a></ColumnStyle>
            </RowStyle>
            {alert}
            <RowStyle><h2>LATEST TRANSACTIONS</h2></RowStyle>           
        </ColumnStyle>
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
    return (
        <div> { account ? 
        <div>
          <div> Address {account?.address}</div>
          <div> Transactions {account?.txs.length}</div>
          <div> Utxos {JSON.stringify(account?.utxos)}</div>
          <div> Balance {account?.balance}</div>
          <Wrapper {...account} ></Wrapper>
        </div>

        : 
        <div></div> 
        }
        </div>
    )
}