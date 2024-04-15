import dotenv from "dotenv";
dotenv.config();

export const CONSUMER_API_KEY = process.env.CONSUMER_API_KEY;
export const CONSUMER_API_SECRET = process.env.CONSUMER_API_SECRET;
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

// CoinMarketCap Config
// check if ENV is production or development
export const ENV = process.env.NODE_ENV || "development";
let URL = "https://sandbox-api.coinmarketcap.com/v1";
let NEXT_TWEET_TIME = 1000 * 60 * 120; // 2 hours
let NEXT_TWEET_AFTER = 1000 * 60 * 1; // 1 minutes
if (ENV === "development") {
  NEXT_TWEET_TIME = 1000 * 60 * 5; // 5 minutes
  console.log("Running in development mode");
} else {
  console.log("Running in production mode");
  URL = "https://pro-api.coinmarketcap.com/v1";
}
// export NEXT_TWEET_TIME;
export const TWEET_INTERVAl = { NEXT_TWEET_TIME, NEXT_TWEET_AFTER };
export const COINMARKETCAP_ENDPOINT = URL;

// export const COINMARKETCAP_ENDPOINT =
// "https://sandbox-api.coinmarketcap.com/v1";
export const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

// supported coins
export const SUPPORTED_COINS = ["BTC", "ETH", "ATOM", "OSMO", "XPRT", "INJ"];

// supported hashtags
export const HASH_TAGS = {
  BTC: ["#BTC", "#Bitcoin", "#Crypto", "#Cryptocurrency", "#Blockchain"],
  ETH: ["#ETH", "#Ethereum"],
};
