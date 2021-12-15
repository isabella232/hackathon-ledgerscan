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

export const iconOf = {
    "bnb":         "/public/assets/icons/binance_chain.png",
    "bch":         "/public/assets/icons/bitcoin_cash.png",
    "btc":         "/public/assets/icons/bitcoin.png",
    "btc_testnet": "/public/assets/icons/bitcoin_testnet.png",
    "btg":         "/public/assets/icons/bitcoin_gold.png",
    "dash":        "/public/assets/icons/dash.png",
    "dcr":         "/public/assets/icons/decred.png",
    "dgb":         "/public/assets/icons/digibyte.png",
    "doge":        "/public/assets/icons/dogecoin.png",
    "etc":         "/public/assets/icons/ethereum_classic.png",
    "eth":         "/public/assets/icons/ethereum.png",
    "eth_ropsten": "/public/assets/icons/ethereum_ropsten.png",
    "eth_goerli":  "/public/assets/icons/ethereum_goerli.png",
    "kmd":         "/public/assets/icons/komodo.png",
    "ltc":         "/public/assets/icons/litecoin.png",
    "pivx":        "/public/assets/icons/pivx.png",
    "ppc":         "/public/assets/icons/peercoin.png",
    "qtum":        "/public/assets/icons/qtum.png",
    "via":         "/public/assets/icons/viacoin.png",
    "vtc":         "/public/assets/icons/vertcoin.png",
    "xsn":         "/public/assets/icons/xsn.png",
    "zen":         "/public/assets/icons/horizen.png",
    "zec":         "/public/assets/icons/zcash.png",
}

export const nameOf = {
    "bnb":         "Binance Smart Chain",
    "bch":         "Bitcoin Cash",
    "btc":         "Bitcoin",
    "btc testnet": "Bitcoin Testnet",
    "btg":         "Bitcoin Gold",
    "dash":        "Dash",
    "dcr":         "Decred",
    "dgb":         "Digibyte",
    "doge":        "Dogecoin",
    "etc":         "Ethereum Classic",
    "eth":         "Ethereum",
    "eth ropsten": "Ethereum Ropsten",
    "eth goerli":  "Ethereum Goerli",
    "kmd":         "Komodo",
    "ltc":         "Litecoin",
    "pivx":        "PIVX",
    "ppc":         "Peercoin",
    "qtum":        "QTUM",
    "via":         "Viacoin",
    "vtc":         "Vertcoin",
    "xsn":         "Xsn",
    "zen":         "Horizen",
    "zec":         "Zcash",
}