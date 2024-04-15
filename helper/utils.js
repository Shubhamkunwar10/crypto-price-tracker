import fs from "fs";

// give the js code to remeber last tweet time, and wait for tweet interval before retweeting instantly on restarting the application

function getLastTweetTime() {
  try {
    const lastTweetTime = fs.readFileSync("lastTweetTime.txt", "utf8");
    return lastTweetTime;
  } catch (error) {
    console.error("Error reading last tweet time:", error);
    return 0;
  }
}

export function saveLastTweetTime() {
  const currentTime = new Date().getTime();
  fs.writeFileSync("lastTweetTime.txt", currentTime.toString());
}

export function getElapsedTimeSinceLastTweet() {
  const lastTweetTime = getLastTweetTime();
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - lastTweetTime;
  return elapsedTime;
}
