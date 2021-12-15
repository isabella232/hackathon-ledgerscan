import { AllCoins, BtcLikeCoins, EthLikeCoins } from "./coins"

export type SearchInput = {
    input: string, 
    coin?: string
  }
  
export type SearchRequest = {
    coins: string[], 
    number?: number,
    hash?: string,
    address?: string
}

export type SearchLink = {
    kind: "tx" | "block" | "address"
    coin: string,
    param: string,
}

export function coinOrDefault(search:SearchInput, defaults:string[]):string[] {
    if (search.coin && search.coin.length > 0 && search.coin !== "all") {
        return [search.coin]
    } else {
        return [...defaults]
    }
}

export function searchInputEth(search:SearchInput):SearchRequest {
    let coins = coinOrDefault(search, EthLikeCoins)
    // Block and Tx hash is 0x + 32 bytes in hex
    if(search.input.length >= 64) {
        return {coins: coins, hash: search.input}
    } else {
        return {coins: coins, address: search.input}
    }
}

export function searchInputBtc(search:SearchInput): SearchRequest {
    let coins = coinOrDefault(search, BtcLikeCoins)
    // Block hash is 32 bytes in hex
    if(search.input.length >= 64) {
        return {coins: coins, hash: search.input}
    } else {
        return {coins: coins, address: search.input}
    }
}

export function searchInput(search:SearchInput):SearchRequest {
    // Is this a block height request ?
    let num = parseInt(search.input) 
    if(search.input.length < 32 && !isNaN(num) && num !== null) {
        let coins = coinOrDefault(search, AllCoins)
        return {coins: coins, number:num}
    }

    // Ox starting queries are ETH ones
    if(search.input.toLowerCase().startsWith("0x")) {
        return searchInputEth(search)
    } else {
        return searchInputBtc(search)
    }
}

export const EXPLORER_STAGING_URL: string = 
    "https://explorers.api-01.vault.ledger-stg.com/blockchain/v3"

export async function explorerGET(path:string) {
    let url = `${EXPLORER_STAGING_URL}${path}`
    return await fetch(url)
}

export async function peekTxHash(coin:string, hash:string):Promise<SearchLink[]> {
    let r = await explorerGET(`/${coin}/transactions/${hash}`)
    return r.ok ? [{kind:"tx", coin, param: hash}] : []
}

export async function peekBlockHash(coin:string, hash:string):Promise<SearchLink[]> {
    let r = await explorerGET(`/${coin}/blocks/${hash}`)
    return r.ok ? [{kind:"block", coin, param: hash}] : []
}

export async function peekHeight(coin:string, height:number): Promise<SearchLink[]> {
    let r = await explorerGET(`/${coin}/blocks/${height}`)
    return r.ok ? [{kind:"block", coin, param: height.toString()}] : []
}

export async function peekHash(coin:string, hash:string): Promise<SearchLink[]> {
    let res = await peekTxHash(coin, hash)
    if(res.length == 0) {
        return await peekBlockHash(coin, hash)
    } else {
        return res
    }
}

export async function peekAddress(coin:string, address:string): Promise<SearchLink[]> {
    let r = await explorerGET(`/${coin}/addresses/${address}/transactions?batch_size=1&filtering=true&noinput=true`)
    if(r.ok) {
        let { txs } = await r.json()
        if(txs.length) {
        return [{kind:"address", coin, param: address}]
        }
    }
    return []
}

export async function peekCoins(request:SearchRequest) {
    console.log(JSON.stringify(request))
    let awaits:Promise<SearchLink[]>[] = request.coins.map(coin => {
        if(request.number)  { return peekHeight(coin, request.number) }
        if(request.hash)    { return peekHash(coin, request.hash) }
        if(request.address) { return peekAddress(coin, request.address) }
        return Promise.resolve([])
    })
    return (await Promise.all(awaits)).flatMap(x => x)
}