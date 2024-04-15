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
function getRandomHashTags(coin, numberOfTagsToSelect = 4 || 7) {
    try {
        const availableHashTags = HASH_TAGS[coin] || [];
        console.log("Available HashTags for", coin, ":", availableHashTags);

        // Shuffle the array of hashtags
        const shuffledTags = availableHashTags.sort(() => Math.random() - 0.5);

        // Select the first numberOfTagsToSelect tags
        const selectedTags = shuffledTags.slice(0, numberOfTagsToSelect);

        return selectedTags;
    }
    catch (error) {
        console.error("Error selecting hashtags:", error);
        return [];
    }
}

// Function to generate a random tweet based on crypto price changes
function generateRandomTweet(coin, price, percent_change_24h) {
    // Define templates for positive and negative price changes
    const positiveTemplates = [
        `🚀 ${coin} is skyrocketing! 🌟 Current Price: $${price}\nPrice Change (24h): +${percent_change_24h}%`,
        `📈 ${coin} is on the rise! 💹 Current Price: $${price}\nPrice Change (24h): +${percent_change_24h}%`,
        `🔥 ${coin} is heating up! 📈 Current Price: $${price}\nPrice Change (24h): +${percent_change_24h}%`
    ];

    const negativeTemplates = [
        `🔻 ${coin} is dipping! 📉 Current Price: $${price}\nPrice Change (24h): ${percent_change_24h}%`,
        `⬇️ ${coin} is down! 📉 Current Price: $${price}\nPrice Change (24h): ${percent_change_24h}%`,
        `❗ Alert: ${coin} price dropped! 📉 Current Price: $${price}\nPrice Change (24h): ${percent_change_24h}%`
    ];

    // Choose a random template based on the price change
    const template = percent_change_24h >= 0 ? positiveTemplates : negativeTemplates;
    const randomTemplate = template[Math.floor(Math.random() * template.length)];

    // Get random hashtags for the coin
    const hashTags = getRandomHashTags(coin);

    // Construct the tweet text
    const tweetText = `${randomTemplate}\n\nCatch the latest trends! ${hashTags.join(' ')}`;

    return tweetText;
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
                    if (Math.abs(percent_change_24h) >= 0.5) {
                        // from HASHTAGS select radom
                        const formattedText = `#${coin}\nCurrent Price: $${price}\nPrice Change (24h): ${percent_change_24h}%`;
                        const tweetText = generateRandomTweet(coin, price, percent_change_24h);

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
