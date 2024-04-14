import dotenv from "dotenv";
dotenv.config();

export const CONSUMER_API_KEY = process.env.CONSUMER_API_KEY;
export const CONSUMER_API_SECRET = process.env.CONSUMER_API_SECRET;
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

// CoinMarketCap Config
export const COINMARKETCAP_ENDPOINT =
  "https://sandbox-api.coinmarketcap.com/v1";
export const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

// supported coins
export const SUPPORTED_COINS = ["BTC", "ETH", "ATOM", "OSMO", "XPRT", "INJ"];

// supported hashtags
export const HASH_TAGS = {
  BTC : ["#BTC", "#Bitcoin", "#Crypto", "#Cryptocurrency", "#Blockchain"],
  ETH : ["#ETH", "#Ethereum"],
}
