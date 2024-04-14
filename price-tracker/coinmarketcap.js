import {
  COINMARKETCAP_API_KEY,
  COINMARKETCAP_ENDPOINT,
  SUPPORTED_COINS,
} from "../config.js";
import { Client } from "../helper/request.js";

export class CoinMarketCap {
  constructor() {
    this.coinMarketCap = new Client(COINMARKETCAP_ENDPOINT);
    this.coinMarketCap.addHeader("X-CMC_PRO_API_KEY", COINMARKETCAP_API_KEY);
  }

  getLatestListing() {
    return this.coinMarketCap.get("/cryptocurrency/listings/latest");
  }

  getLatestQuote(symbols) {
    return this.coinMarketCap.get(
      `/cryptocurrency/quotes/latest?symbol=${symbols}`
    );
  }

  getTrendingCoins() {
    return this.coinMarketCap.get("/cryptocurrency/trending/latest");
  }

  getTrendingTopics() {
    return this.coinMarketCap.get("/community/trending/topic");
  }
}

const coinMarketCap = new CoinMarketCap();
// coinMarketCap.getLatestListing().then((data) => console.log(data));
// coinMarketCap.getLatestQuote(SUPPORTED_COINS).then((data) =>
//   // print quote for each coin
//   {
//     console.log(data);
//     Object.values(data.data).forEach((coin) => {
//       console.log(coin.symbol);
//       console.log(coin.quote.USD.price);
//     });
//   }
// );
// coinMarketCap.getTrendingCoins().then((data) => console.log(data.data));
coinMarketCap.getTrendingTopics().then((data) => console.log(data.data));