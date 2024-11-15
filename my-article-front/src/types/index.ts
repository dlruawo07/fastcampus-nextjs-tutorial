export interface Article {
  editor: string;
  title: string;
  keyword?: string;
  description?: string;
  mainImageUrl?: string;
  avatarImageUrl?: string;
}

export interface Keyword {
  keyword: string;
}
