import { useRouter } from "next/router"

export default function Account(){
    const router = useRouter()
    const { coin, address } = router.query
    console.log('props', coin, address)
    return <div>
        coin: {coin} address : {address}
    </div>
}