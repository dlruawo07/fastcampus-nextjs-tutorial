import { Keyword } from "@/types";

export const getKeywords = async () => {
  const response = await fetch("http://localhost:3000/api/keyword");

  if (!response.ok) {
    throw new Error("Unknown error");
  }

  return (await response.json()) as { keywords: Keyword[] };
};
