import { useRouter } from "next/router"

export default function TX(){
    const router = useRouter()
    const { coin, hash } = router.query
    console.log('props', coin, hash)
    return <div>
        coin: {coin} hash : {hash}
    </div>
}