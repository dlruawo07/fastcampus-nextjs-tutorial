import * as functions from "firebase-functions/v1";
import Crawler from "./crawler";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions
  .region("asia-northeast3")
  .https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
  });

export const startCrawler = functions
  .region("asia-northeast3")
  .runWith({ memory: "2GB", timeoutSeconds: 120 })
  .https.onRequest(async (request, response) => {
    functions.logger.info("Start Crawler", { structuredData: true });

    const crawler = new Crawler();
    await crawler.start();

    response.send("End Crawler");
  });

export const scheduleFunctionCronTab = functions
  .region("asia-northeast3")
  .runWith({ memory: "2GB", timeoutSeconds: 120 })
  .pubsub.schedule("* 3 * * *")
  .timeZone("Asia/Seoul")
  .onRun(async () => {
    functions.logger.info("Start Crawler", { structuredData: true });

    const crawler = new Crawler();
    await crawler.start();

    return null;
  });
