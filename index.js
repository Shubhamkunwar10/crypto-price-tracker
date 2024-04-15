import { Twitter } from "./app.js";
import { TWEET_INTERVAl } from "./config.js";
import { generateAndSaveImage } from "./helper/test.js";

import fs from "fs";
import path from "path";
import {
  getElapsedTimeSinceLastTweet,
  saveLastTweetTime,
} from "./helper/utils.js";

function getCurrentDir() {
  const currentUrl = import.meta.url;
  return path.dirname(new URL(currentUrl).pathname);
}

// Function to write log messages to a file
export function log(message) {
  const logFilePath = path.join(getCurrentDir(), "logs.log");
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;

  // Append log message to the log file
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
}

async function main() {
  const twitter = new Twitter();
  // generate image and text
  const mesages = await generateAndSaveImage();
  // log("Generated messages: " + JSON.stringify(mesages));
  // console.log("MESSAGES:", mesages)
  for (let i = 0; i < mesages.length; i++) {
    const message = mesages[i];
    setTimeout(async () => {
      await twitter.sendTweetWithMedias(message.tweetText, [message.image]);
      log("Tweet sent: " + message.tweetText);
    }, TWEET_INTERVAl.NEXT_TWEET_AFTER);
    saveLastTweetTime();
  }
}

// check if the time elapsed since the last tweet is greater than the next tweet time
// if it is, then tweet instantly
// else wait for the next tweet time
const elapsedTime = getElapsedTimeSinceLastTweet();
if (elapsedTime >= TWEET_INTERVAl.NEXT_TWEET_TIME) {
  main();
} else {
  const timeToWait = TWEET_INTERVAl.NEXT_TWEET_TIME - elapsedTime;
  setTimeout(main, timeToWait);
}
main();
setInterval(main, TWEET_INTERVAl.NEXT_TWEET_TIME);
