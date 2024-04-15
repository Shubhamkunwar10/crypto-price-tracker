import { existsSync, mkdirSync } from "fs";
import { HASH_TAGS, SUPPORTED_COINS, TWEET_INTERVAl } from "../config.js";
import { log } from "../index.js";
import { CoinMarketCap } from "../price-tracker/coinmarketcap.js";
import { generateImage } from "./canvas.js";
// import { Twitter } from '../app.js';

// Create the 'tweets' folder if it doesn't exist
const folderName = "tweets";
if (!existsSync(folderName)) {
  mkdirSync(folderName);
}

// Function to randomly select 2-3 hashtags
function getRandomHashTags(coin, numberOfTagsToSelect = 3) {
  try {
    const availableHashTags = HASH_TAGS[coin] || [];
    console.log("Available HashTags for", coin, ":", availableHashTags);
    return availableHashTags;
  } catch (error) {
    console.error("Error selecting hashtags:", error);
    return [];
  }
}

const coinMarketCap = new CoinMarketCap();

export async function generateAndSaveImage() {
  let messages = [];
  let promises = [];

  for (const coin of SUPPORTED_COINS) {
    promises.push(
      new Promise((resolve, reject) => {
        coinMarketCap
          .getLatestQuote([coin])
          .then((data) => {
            let { price, percent_change_24h } = data.data[coin].quote.USD;
            // round off the price to 4 decimal places
            price = parseFloat(price).toFixed(4);
            percent_change_24h = parseFloat(percent_change_24h).toFixed(2);

            console.log("Price for", coin, ":", price);
            console.log("Percent Change for", coin, ":", percent_change_24h);

            // Check if the price change exceeds 0.6%
            if (
              Math.abs(percent_change_24h) >=
              TWEET_INTERVAl.MINIMUM_PERCENT_CHANGE
            ) {
              // from HASHTAGS select radom
              const formattedText = `#${coin}\nCurrent Price: $${price}\nPrice Change (24h): ${percent_change_24h}%`;
              let tweetText = `🔔Alert: ${coin} Price Update 📉\n\n${formattedText}\n\nCatch the latest trends! `;

              let hashTags = getRandomHashTags(coin);
              tweetText += hashTags.join(" ");

              generateImage(formattedText)
                .then((image) => {
                  // Save the image with coin name as filename in the 'tweets' folder
                  // writeFileSync(`${folderName}/${coin}.png`, image);
                  // console.log(`Image for ${coin} saved successfully!`);
                  log(`Image for ${coin} saved successfully! ${tweetText}`);
                  // console.log(tweetText);
                  messages.push({ tweetText, image });
                  resolve(); // Resolve the promise after image is generated and saved
                })
                .catch((error) => {
                  console.error(`Error generating image for ${coin}:`, error);
                  reject(error); // Reject the promise if there's an error generating image
                });
            } else {
              console.log(`rechecking for", ${coin}, "in 15 min`);
              resolve(); // Resolve the promise if no image is generated
            }
          })
          .catch((error) => {
            console.log("Error getting data for", coin);
            reject(error); // Reject the promise if there's an error fetching data
          });
      })
    );
  }

  // Wait for all promises to resolve or reject
  await Promise.all(promises);

  return messages;
}
