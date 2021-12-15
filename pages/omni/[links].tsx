import { useRouter } from "next/router"
import { SearchLink } from ".."

export default function TX(){
    const router = useRouter()
    const links = router.query.links as string
    const linkList: SearchLink[] = JSON.parse(links)

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
        <ul>
          {linkList.map( (link, key) => 
            <li key={key}>
                <a onClick={_ => pushLink(link)}>
                    {JSON.stringify(link)}
                </a>
            </li>)}
        </ul>
      </div>
    )
}