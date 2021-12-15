import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import type { SearchLink } from "../../modules/explorer"
import { Text, Box, Table } from '@ledgerhq/react-ui'
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
        <Table
          backgroundColor="neutral.c20"
          borderRadius={8}
          columns={[
            {
              header: () => <Text/>,
              layout: 'auto',
              render: props => 
                <img src={iconOf[props.elt.coin]} width="40px" height="40px"/>
            },
            {
              header: () => <Text/>,
              layout: 'auto',
              render: props => 
                <Text variant="h4">{nameOf[props.elt.coin]}</Text>
            },
            {
              header: () => <Text/>,
              layout: 'auto',
              render: props =>
                <Text variant="h4" onClick={_ => pushLink(props.elt)}>
                    {props.elt.param}
                </Text>
            },
            {
              header: () => <Text/>,
              layout: 'min-content',
              render: props => <Text>POUET</Text>
            }
          ]}
          data={linkList}
          gridColumnGap={6}
          gridRowGap={8}
          p={8}
        />
      </div>
    )
}