import ArticleItem from "../Common/ArticleItem";
import { getArticles } from "@/app/api/articles/getArticles";

export default async function ArticleList() {
  const { articles } = await getArticles();

  return (
    <div className="px-4">
      {articles &&
        articles.map((article, index) => (
          <ArticleItem key={index} article={article} />
        ))}
    </div>
  );
}
