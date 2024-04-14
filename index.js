import { Twitter } from "./app.js";
// import { generateImage } from "./helper/canvas.js";
import { generateAndSaveImage } from "./helper/test.js";

// Twitter BOT
// const twitter = new Twitter();
// const tweetText = "Hello, this is a test. #test1";
// twitter.sendTweet(tweetText);He
// twitter.sendTweetWithMediasTagged(tweetText, ["1738769093560561664"]);
// twitter.sendTweetWithMedias(tweetText, ["./assets/1.webp"]);

// const image = await generateImage("Hello World");

async function main() {
    const twitter = new Twitter();
    // generate image and text
    const mesages = await generateAndSaveImage();
    console.log("MESSAGES:", mesages)
    for (let i = 0; i < mesages.length; i++) {
      const message = mesages[i];
      await twitter.sendTweetWithMedias(message.tweetText, [message.image]);
    }
}

// run main function on interval of 30 minutes
main();
setInterval(main, 1000 * 60 * 1);

// twitter.sendTweetWithMedias(tweetText, [image]);
