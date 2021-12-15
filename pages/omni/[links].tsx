import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import type { SearchLink } from "../../modules/explorer"
import { Text, Box } from '@ledgerhq/react-ui'
import { nameOf } from '../../modules/coins'

export default function Omni(){
    const router = useRouter()
    const [linkList, setLinkList] = useState<SearchLink[]>([])

    useEffect(() => {
      if(router.isReady) {
        setLinkList(JSON.parse(router.query.links as string))
      }
    }, [router.isReady]
    )

    const pushLink = (link: SearchLink) => {
        console.log(link)
        switch(link.kind) {
          case "block":   router.push({pathname: `/[coin]/block/[block]`, query: {coin:link.coin, block:link.param}}); break
          case "tx":      router.push({pathname: `/[coin]/tx/[hash]`, query: {coin:link.coin, hash:link.param}}); break
          case "address": router.push({pathname: `/[coin]/account/[address]`, query: {coin:link.coin, address:link.param}}); break
        }
    }

    return (
      <div>
        <Box py="15px">
          <Text variant="h3" >{linkList[0]?.kind} - {linkList[0]?.param}</Text>
        </Box>
        <Box py="15px">
          <Text variant="h3" >Found results on {linkList.length} chains : </Text>
        </Box>
        <ul>
          {linkList.map( (link, key) => 
            <li key={key}>
                <Text variant="h4">{nameOf[link.coin]} </Text>
                <Text variant="h4" onClick={_ => pushLink(link)}>
                    {link.param}
                </Text>
            </li>)}
        </ul>
      </div>
    )
}