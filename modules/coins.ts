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

export const iconOf:any = {
    "all":         "/assets/icons/all.png",
    "bnb":         "/assets/icons/binance_chain.png",
    "bch":         "/assets/icons/bitcoin_cash.png",
    "btc":         "/assets/icons/bitcoin.png",
    "btc_testnet": "/assets/icons/bitcoin_testnet.png",
    "btg":         "/assets/icons/bitcoin_gold.png",
    "dash":        "/assets/icons/dash.png",
    "dcr":         "/assets/icons/decred.png",
    "dgb":         "/assets/icons/digibyte.png",
    "doge":        "/assets/icons/dogecoin.png",
    "etc":         "/assets/icons/ethereum_classic.png",
    "eth":         "/assets/icons/ethereum.png",
    "eth_ropsten": "/assets/icons/eth_ropsten.png",
    "eth_goerli":  "/assets/icons/eth_goerli.png",
    "kmd":         "/assets/icons/komodo.png",
    "ltc":         "/assets/icons/litecoin.png",
    "matic":       "/assets/icons/polygon.png",
    "pivx":        "/assets/icons/pivx.png",
    "ppc":         "/assets/icons/peercoin.png",
    "qtum":        "/assets/icons/qtum.png",
    "via":         "/assets/icons/viacoin.png",
    "vtc":         "/assets/icons/vertcoin.png",
    "xsn":         "/assets/icons/xsn.png",
    "zen":         "/assets/icons/horizen.png",
    "zec":         "/assets/icons/zcash.png",
}

export const nameOf:any = {
    "all":         "All Chains",
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
    "eth_ropsten": "Ethereum Ropsten",
    "eth_goerli":  "Ethereum Goerli",
    "kmd":         "Komodo",
    "ltc":         "Litecoin",
    "matic":       "Polygon",
    "pivx":        "PIVX",
    "ppc":         "Peercoin",
    "qtum":        "QTUM",
    "via":         "Viacoin",
    "vtc":         "Vertcoin",
    "xsn":         "Xsn",
    "zen":         "Horizen",
    "zec":         "Zcash",
}