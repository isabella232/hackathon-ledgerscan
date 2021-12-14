import { useRouter } from "next/router"
import { useState, useEffect } from "react"

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

async function fetchAccountUTXOs(coin:string, address:string): Promise<any> {
  return await explorerGET(`/${coin}/addresses/${address}/utxos`).then(x => x.json())
}

async function fetchAccount(coin:string, address:string): Promise<AccountView> {
    let { txs } = await fetchAccountTxs(coin, address)
    let [{ utxos, balance }] = await fetchAccountUTXOs(coin, address)
    return { address, txs, utxos, balance }
}


export default function Account(){
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
        </div> 
        : 
        <div></div> 
        }
        </div>
    )
}