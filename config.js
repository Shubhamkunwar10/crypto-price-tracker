import dotenv from "dotenv";
dotenv.config();

export const CONSUMER_API_KEY = process.env.CONSUMER_API_KEY;
export const CONSUMER_API_SECRET = process.env.CONSUMER_API_SECRET;
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

// CoinMarketCap Config
export const COINMARKETCAP_ENDPOINT =
  "https://pro-api.coinmarketcap.com/v1";
  
  // export const COINMARKETCAP_ENDPOINT =
  // "https://sandbox-api.coinmarketcap.com/v1";
export const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

// supported coins
export const SUPPORTED_COINS = ["BTC", "ETH", "ATOM", "OSMO", "XPRT", "INJ"];

// supported hashtags
export const HASH_TAGS = {
  BTC: [
    "#bitcoin", "#cryptocurrency", "#crypto", "#blockchain", "#forex", "#btc", "#ethereum", "#money", "#trading", "#bitcoinmining",
    "#investment", "#business", "#forextrader", "#investing", "#bitcoinnews", "#bitcoins", "#entrepreneur", "#invest", "#trader",
    "#binaryoptions", "#bitcointrading", "#eth", "#cryptocurrencies", "#cryptotrading", "#forextrading", "#binance", "#cryptonews",
    "#bitcoincash", "#investor", "#success", "#forexsignals", "#finance", "#litecoin", "#coinbase", "#stocks", "#wealth", "#bitcoinprice",
    "#motivation", "#usa", "#stockmarket", "#forexlifestyle", "#dogecoin", "#trade", "#xrp", "#wallstreet", "#millionaire", "#daytrader",
    "#nft", "#bitcoinexchange", "#financialfreedom", "#ripple", "#cash", "#mining", "#makemoney", "#altcoin", "#luxury", "#hodl", "#bitcoinusa",
    "#blockchaintechnology"
  ],
  ETH: [
    "#ethereum", "#bitcoin", "#cryptocurrency", "#crypto", "#blockchain", "#btc", "#eth", "#litecoin", "#trading", "#bitcoinmining",
    "#nft", "#bitcoins", "#bitcoinnews", "#money", "#forex", "#cryptonews", "#cryptocurrencies", "#binance", "#cryptotrading",
    "#investment", "#xrp", "#ripple", "#investing", "#dogecoin", "#coinbase", "#bitcoincash", "#bitcointrading", "#business", "#nfts",
    "#invest", "#entrepreneur", "#cardano", "#nftart", "#trader", "#altcoin", "#blockchaintechnology", "#hodl", "#bitcoinprice",
    "#forextrader", "#cryptoart", "#investor", "#mining", "#defi", "#altcoins", "#nftcollector", "#art", "#digitalart", "#nftcommunity",
    "#binaryoptions", "#finance", "#opensea", "#doge", "#ico", "#stocks", "#cryptoinvestor", "#forextrading", "#nftartist", "#success",
    "#cryptomining", "#bitcoinexchange"
  ],
  ATOM: [
    "#AtomZone", "#atomcrypto", "#cosmosatom", "#cryptocurrency", "#bitcoin", "#investments", "#ledger", "#cryptos", "#btc", "#staking",
    "#blockchain", "#internet", "#atomcosmos", "#interopability", "#cosmoscrypto", "#cosmos", "#atom", "#chinchillasofsweden",
    "#chinchillablackpearl", "#babychinchilla", "#caschinchilla", "#prophotography", "#huaweip", "#chinchillasaroundtheworld",
    "#cosmoschins", "#chinchilla", "#babyblackpearl", "#blackpearlchinchilla", "#newbornchinchilla", "#blackpearl", "#xrp"
  ],
  OSMO: [
    "#osmo", "#dji", "#osmomobile", "#photography", "#drone", "#mavic", "#osmopocket", "#phantom", "#hairdresser", "#instagood",
    "#gopro", "#canon", "#hair", "#pro", "#video", "#woodworking", "#osmoaction", "#mavicair", "#photo", "#blonde", "#d",
    "#blondehair", "#osmoikonen", "#hairstyles", "#balayage", "#djiosmo", "#travel", "#wood", "#osmooil", "#photographer"
  ],
  XPRT: [
    "#litecoin", "#nft", "#coinbase", "#stockmarket", "#stocks", "#forexsignals", "#success", "#binary", "#dogecoin",
    "#blockchaintechnology", "#wealth", "#cryptoworld", "#bitcoinprice", "#xrp", "#cryptoinvestor", "#motivation",
    "#forexlifestyle", "#hodl", "#altcoin", "#usa", "#trade", "#ripple", "#mining", "#cryptomining", "#financialfreedom",
    "#cryptocurrencynews", "#daytrader", "#wallstreet", "#altcoins", "#millionaire"
  ],
  INJ: [
    "#worldcoin", "#worldcoinnews", "#wld", "#wldnews", "#chainlink", "#chainlinknews", "#injective", "#cryptotrading",
    "#avalanche", "#avax", "#seedify", "#cryptonews", "#altcoins", "#altseason", "#bullmarket", "#dinheiro"
  ]
};

