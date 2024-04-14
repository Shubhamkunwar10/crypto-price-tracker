import { TwitterApi } from "twitter-api-v2";

import dotenv from "dotenv";
import { log } from "./index.js";

dotenv.config();

export class Twitter {
  constructor() {
    this.twitterClient = new TwitterApi({
      appKey: process.env.CONSUMER_API_KEY,
      appSecret: process.env.CONSUMER_API_SECRET,
      accessToken: process.env.ACCESS_TOKEN,
      accessSecret: process.env.ACCESS_TOKEN_SECRET,
    });
    this.rwClient = this.twitterClient.readWrite;
    this.rclient = this.twitterClient.readOnly;
  }

  async sendTweet(tweetText) {
    try {
      const tweet = await this.twitterClient.v2.tweet({ text: tweetText });
      console.log("Tweet sent successfully:", tweet);
    } catch (error) {
      console.error("Error sending tweet:", error);
    }
  }

  async sendTweetWithMediasTagged(tweetText, mediaIds, taggedUserIds = []) {
    try {
      const tweet = await this.rwClient.v2.tweet({
        text: tweetText,
        media: {
          media_ids: mediaIds,
          tagged_user_ids: taggedUserIds,
        },
      });
      // console.log("Tweet sent successfully:", tweet);
      log("Tweet sent: " +  JSON.stringify(tweet));
    } catch (error) {
      console.error("Error sending tweet:", error);
    }
  }

  async uploadMedia(filePath) {
    try {
      const media = await this.rwClient.v1.uploadMedia(filePath, {
        mimeType: "image/png",
      });
      console.log("Media uploaded successfully:", media);
      return media;
    } catch (error) {
      console.error("Error uploading media:", error);
    }
  }

  async sendTweetWithMedias(tweetText, filePaths) {
    try {
      const mediaIds = [];
      for (const filePath of filePaths) {
        const media = await this.uploadMedia(filePath);
        console.log(media);
        mediaIds.push(media);
      }
      await this.sendTweetWithMediasTagged(tweetText, mediaIds);
    } catch (error) {
      console.error("Error sending tweet:", error);
    }
  }
}
