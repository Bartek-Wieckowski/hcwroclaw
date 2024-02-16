export type NewsType = {
  news: singleNewsType[];
};
export type singleNewsType = {
  id: string;
  date: string;
  author: string;
  title: string;
  desc: string;
  img: string;
  slug: string;
};
