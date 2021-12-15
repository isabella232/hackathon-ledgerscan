export const BtcLikeCoins = [
    "bch"  , "btc"  , "btc_testnet" ,
    "btg"  , "dash" , "dcr" ,
    "dgb"  , "doge" , "kmd" , 
    "ltc"  , "pivx" , "ppc" ,
    "qtum" , "via"  , "vtc" ,
    "xsn"  , "zen"  , "zec"
]

export const EthLikeCoins = [
    "bnb" , "etc" , "eth" , 
    "eth_ropsten" , "eth_goerli" , "matic"
]

export const AllCoins = [...BtcLikeCoins, ...EthLikeCoins]

export const selectCoins = ["all", ...AllCoins]
  