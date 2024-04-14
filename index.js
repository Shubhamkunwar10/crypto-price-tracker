import { Twitter } from "./app.js";
import { generateImage } from "./helper/canvas.js";

// Twitter BOT
const twitter = new Twitter();
const tweetText = "Hello, this is a test. #test1";
// twitter.sendTweet(tweetText);
// twitter.sendTweetWithMediasTagged(tweetText, ["1738769093560561664"]);
// twitter.sendTweetWithMedias(tweetText, ["./assets/1.webp"]);

const image = await generateImage("Hello World");

twitter.sendTweetWithMedias(tweetText, [image]);
