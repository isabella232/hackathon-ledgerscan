import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useState } from "react";
import {SearchInput, SplitInput, SelectInput, Text, Flex} from '@ledgerhq/react-ui'

export const BtcLikeCoins = [
  "bch"  , "btc"  , "btc_testnet" ,
  "btg"  , "dash" , "dcr" ,
  "dgb"  , "doge" , "kmd" , 
  "ltc"  , "pivx" , "ppc" ,
  "qtum" , "via"  , "vtc" ,
  "xsn"  , "zen"  , "zec"
]

export const EthLikeCoins =
 ["bnb" , "etc" , "eth" , "eth_ropsten" , "eth_goerli" , "matic"]

export const AllCoins = [...BtcLikeCoins, ...EthLikeCoins]

export const InputCoins = ["all", ...AllCoins]


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

function coinOrDefault(search:SearchInput, defaults:string[]):string[] {
  if (search.coin && search.coin.length > 0 && search.coin !== "all") {
    return [search.coin]
  } else {
    return [...defaults]
  }
}

function searchInputEth(search:SearchInput):SearchRequest {
  let coins = coinOrDefault(search, EthLikeCoins)
  // Block and Tx hash is 0x + 32 bytes in hex
  if(search.input.length >= 64) {
    return {coins: coins, hash: search.input}
  } else {
    return {coins: coins, address: search.input}
  }
}

function searchInputBtc(search:SearchInput):SearchRequest {
  let coins = coinOrDefault(search, BtcLikeCoins)
  // Block hash is 32 bytes in hex
  if(search.input.length >= 64) {
    return {coins: coins, hash: search.input}
  } else {
    return {coins: coins, address: search.input}
  }
}

function searchInput(search:SearchInput):SearchRequest {

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

async function explorerGET(path:string) {
  let url = `${EXPLORER_STAGING_URL}${path}`
  return await fetch(url)
}

async function peekTxHash(coin:string, hash:string):Promise<SearchLink[]> {
  let r = await explorerGET(`/${coin}/transactions/${hash}`)
  return r.ok ? [{kind:"tx", coin, param: hash}] : []
}

async function peekBlockHash(coin:string, hash:string):Promise<SearchLink[]> {
  let r = await explorerGET(`/${coin}/blocks/${hash}`)
  return r.ok ? [{kind:"block", coin, param: hash}] : []
}

async function peekHeight(coin:string, height:number): Promise<SearchLink[]> {
  let r = await explorerGET(`/${coin}/blocks/${height}`)
  return r.ok ? [{kind:"block", coin, param: height.toString()}] : []
}

async function peekHash(coin:string, hash:string): Promise<SearchLink[]> {
  let res = await peekTxHash(coin, hash)
  if(res.length == 0) {
    return await peekBlockHash(coin, hash)
  } else {
    return res
  }
}

async function peekAddress(coin:string, address:string): Promise<SearchLink[]> {
  let r = await explorerGET(`/${coin}/addresses/${address}/transactions?batch_size=1&filtering=true&noinput=true`)
  if(r.ok) {
    let { txs } = await r.json()
    if(txs.length) {
      return [{kind:"address", coin, param: address}]
    }
  }
  return []
}

async function peekCoins(request:SearchRequest) {
  console.log(JSON.stringify(request))
  let awaits:Promise<SearchLink[]>[] = request.coins.map(coin => {
    if(request.number)  { return peekHeight(coin, request.number) }
    if(request.hash)    { return peekHash(coin, request.hash) }
    if(request.address) { return peekAddress(coin, request.address) }
    return Promise.resolve([])
  })
  return (await Promise.all(awaits)).flatMap(x => x)
}

interface CoinSelect {
  value: string
  label: string
}
  
const options:CoinSelect[] = InputCoins.map((e) => {return {value:e, label:e}})

const Home: NextPage = () => {

  const router = useRouter()

  const [coin, setCoin] = useState<any|null>(options[0])
  const [input, setInput] = useState<string>("")
  const [links, setLinks] = useState(new Array<SearchLink>())

  const pushLink = (link:SearchLink) => {
    console.log(link)
    switch(link.kind) {
      case "block":   router.push({pathname: `/[coin]/block/[block]`, query: {coin:link.coin, block:link.param}}); break
      case "tx":      router.push({pathname: `/[coin]/tx/[hash]`, query: {coin:link.coin, hash:link.param}}); break
      case "address": router.push({pathname: `/[coin]/account/[address]`, query: {coin:link.coin, address:link.param}}); break
    }
  }

  const reset = () => {
    setLinks([])
  }

  const onSubmit = async (evt:any) => {
    evt.preventDefault();
    reset()
    let links = await peekCoins(searchInput({ coin:coin.value, input}))
    links.forEach(console.log)
    if(links.length == 0) {
      return
    }
    if(links.length == 1) {
      return pushLink(links[0])
    }
    return setLinks(links)
  }

  return (
    <div>
      <Head>
        <title>Ledgerscan</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Text variant="h1" color="neutral.c90"> Ledger Scan </Text>
      <form onSubmit={onSubmit}>
        <SelectInput 
        value={coin} 
        onChange={setCoin} 
        options={options}
        unwrapped
        />
        <SearchInput 
        value={input} 
        onChange={setInput} 
        placeholder="Address, Block, Transction ..."
        unwrapped
        />
        <input type="submit" />
      </form>
      <ul>
        {links.map(link => <li><a onClick={_ => pushLink(link)}>{JSON.stringify(link)}</a></li>)}
      </ul>
    </div>
  )
}

export default Home
