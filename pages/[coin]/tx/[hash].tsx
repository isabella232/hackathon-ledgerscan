import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import {Transaction} from '../../../components/Transaction/Transaction'
import * as trans from '../../../components/Transaction/model'
import { Flex, InfiniteLoader } from "@ledgerhq/react-ui"
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
          if(coin === "ethereum") {
            router.push({
              pathname: `/[coin]/tx/[hash]`,
              query: {coin:"eth", hash:hash}
            })
          } else {
            fetchData()
          }
        }
    }, [coin, hash, router.isReady])
    
    console.log('props', coin, hash);
    return <Flex flex={1} justifyContent={"center"} alignItems={"center"}>
      {!!tx 
        ? <Transaction {...tx}/> 
        : <InfiniteLoader color="white" />
      }
    </Flex>
}