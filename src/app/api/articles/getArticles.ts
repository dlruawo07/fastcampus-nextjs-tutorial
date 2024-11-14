import { Article } from "@/types";

export const getArticles = async () => {
  const response = await fetch("http://localhost:3000/api/articles");

  if (!response.ok) {
    throw new Error("Unknown error");
  }

  return (await response.json()) as { articles: Article[] };
};
