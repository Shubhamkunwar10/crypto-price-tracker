import { Twitter } from "./app.js";
import { generateAndSaveImage } from "./helper/test.js";

import fs from "fs";
import path from "path";

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
      await twitter.sendTweetWithMedias(message.tweetText, [message.image]);
      log("Tweet sent: " + message.tweetText);
    }
}

main();
setInterval(main, 1000 * 60 * 30);

