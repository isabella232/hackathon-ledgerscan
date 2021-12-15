import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import type { SearchLink } from "../../modules/explorer"
import { Text, Box, Flex, Link } from '@ledgerhq/react-ui'
import { nameOf, iconOf } from '../../modules/coins'

export default function Omni(){
    const router = useRouter()
    const [linkList, setLinkList] = useState<SearchLink[]>([])

    useEffect(() => {
      if(router.isReady) {
        setLinkList(JSON.parse(router.query.links as string))
      }
    }, [router.isReady, router.query.links]
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
        <Box>
        { linkList.map( (link, _) =>
          <Box>
          <Flex backgroundColor="neutral.c30" flexDirection="row" justifyContent="space-between" alignItems="center" py="5px" mx="5px" borderRadius="8px" >
            <Flex flexDirection="row" alignItems="center">
              <Box mx="10px">
                <img src={iconOf[link.coin]} width="40px" height="40px"/>
              </Box>
              <Text variant="h4" mx="10px">{nameOf[link.coin]}</Text>
            </Flex>
            <Flex flexDirection="row" alignItems="center" mx="20px">
              <Link onClick={_ => pushLink(link)}>
                <Text variant="h4">{link.param}</Text>
              </Link>
            </Flex>
          </Flex>
          <Box py="5px"/>
          </Box>
        ) }
        </Box>
      </div>
    )
}