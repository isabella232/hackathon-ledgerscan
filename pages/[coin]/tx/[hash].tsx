import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import {Transaction} from '../../../components/Transaction/Transaction'
import * as trans from '../../../components/Transaction/model'
export const EXPLORER_STAGING_URL: string = 
  "https://explorers.api-01.vault.ledger-stg.com/blockchain/v3"

async function explorerGET(path:string) {
  let url = `${EXPLORER_STAGING_URL}${path}`
  console.log(url)
  return await fetch(url)
}

async function fetchTx(coin:string, hash:string):Promise<any> {
    return await explorerGET(`/${coin}/transactions/${hash}`).then(x => x.json())
}

export default function TX(){
    const router = useRouter()
    const [tx, setTx] = useState<any|undefined>(undefined)
    const { coin, hash } = router.query

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchTx(coin as string, hash as string)
            console.log(result)
            setTx(result)
          }
        if (router.isReady) {
            fetchData()
        }
    }, [coin, hash, router.isReady])
    
    console.log('props', coin, hash);
    console.log(tx as trans.TX)
    return (
      <div>
          {/* {JSON.stringify(tx)} */}
          {!!tx && <Transaction {...tx}/>}
      </div>
    )
}