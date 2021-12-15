import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'
import React, { useState } from "react";
import { Carousel, Flex } from "@ledgerhq/react-ui"
import { Logo } from '../components/Header/Header';

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
  if (search.coin && search.coin.length > 0) {
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

const Home: NextPage = () => {

  const router = useRouter()

  const [coin, setCoin] = useState("")
  const [input, setInput] = useState("")
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
    setCoin("")
    setInput("")
    setLinks([])
  }

  const onSubmit = async (evt:any) => {
    evt.preventDefault();
    reset()
    let links = await peekCoins(searchInput({coin, input}))
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
    <Flex flex={1} flexDirection={"column"} justifyContent={"space-around"} alignItems={"center"}>
      <Logo />
      <div>
        <form onSubmit={onSubmit}>
          <select onChange={e => setCoin(e.target.value)}>
            { AllCoins.map((e, k) => <option key={k} value={e}>{e}</option>)}
          </select>
          <label><input type="text" name={input} onChange={e => setInput(e.target.value)}/></label>
          <input type="submit" value="Scan!"/>
        </form>
      </div>

      <div style={{height: "180px", width: "700px"}}>
      <Carousel
        isDismissed={false}
        onDismiss={function noRefCheck(){}}
        queue={[
          {
            description: 'Enhance your security with the new ledger nano s Plus available now!',
            image: '/sampleSlide.png',
            onClick: function noRefCheck(){},
            title: 'NEW PRODUCT'
          },
          {
            description: 'Learn more about Crypto at the ledger academy',
            image: '/sampleSlide.png',
            onClick: function noRefCheck(){},
            title: 'NEW PRODUCT'
          },
          {
            description: 'Explorer as a service',
            image: '/sampleSlide.png',
            onClick: function noRefCheck(){},
            title: 'NEW PRODUCT'
          },
          {
            description: 'Stake with Ledger now',
            image: '/sampleSlide.png',
            onClick: function noRefCheck(){},
            title: 'NEW PRODUCT'
          }
        ]}
      />
      </div>

      {/* <div>
        <ul>
          {links.map(link => <li><a onClick={_ => pushLink(link)}>{JSON.stringify(link)}</a></li>)}
        </ul>
      </div> */}
    </Flex>
  )
}

export default Home
