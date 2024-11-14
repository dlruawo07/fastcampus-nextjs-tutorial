import * as puppeteer from "puppeteer";
import { Article } from "./types";
import { Database, db } from "./firebase";

export default class Crawler {
  initBrowser = async () => {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 50,
      args: [
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--no-first-run",
        "--no-sandbox",
        "--no-zygote",
        "--single-process",
        "--proxy-server='direct://'",
        "--proxy-bypass-list=*",
        "--deterministic-fetch",
      ],
    });
    return browser;
  };

  getArticles = async (page: puppeteer.Page) => {
    return await page.evaluate(() => {
      const elements = document.querySelectorAll(
        "article h2, article h3, article div.h > img, article div.l > img, article div.ab > div.jn > div > div.l > a > p, article div > div.bh > div.ab:nth-child(2) > div > div > a"
      );

      const articles: Article[] = [];

      let obj: Article = {};

      function checkObjectKey<T>(obj: T, key: keyof T) {
        if (obj[key] === undefined) return true;
        else return false;
      }

      function resetObject() {
        articles.push(obj);
        obj = {};
      }

      function setObjectKey<T>(obj: T, key: keyof T, value: T[keyof T]) {
        if (checkObjectKey(obj, key)) {
          obj[key] = value;
        } else {
          resetObject();
        }
      }

      elements.forEach((element) => {
        switch (element.nodeName) {
          case "A":
            setObjectKey(obj, "link", (element as any).href);
            break;
          case "H2":
            setObjectKey(obj, "title", element.innerHTML);
            break;
          case "H3":
            setObjectKey(obj, "description", element.innerHTML);
            break;
          case "P":
            setObjectKey(obj, "editor", element.innerHTML);
            break;
          case "IMG":
            if (element.className === "l hk by jl jm ed") {
              setObjectKey(obj, "avatarImageUrl", (element as any).src);
            } else if (element.className === "bx me") {
              setObjectKey(obj, "mainImageUrl", (element as any).src);
            }
            break;
          default:
            break;
        }
      });
      return articles;
    });
  };

  start = async () => {
    const browser = await this.initBrowser();
    const page = await browser.newPage();
    const database = new Database(db);

    await page.goto("https://www.medium.com/tag/react/recommended");

    const articles = await this.getArticles(page);

    const results = await Promise.all(
      articles.map(async (article) => {
        const exists = await database.getData(
          "articles",
          "title",
          article.title as string
        );
        if (exists.length > 0) {
          return null;
        }
        const doc = await database.addData("articles", article);
        return doc.id;
      })
    );

    console.log(results);

    await browser.close();
  };
}
