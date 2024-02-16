import { singleNewsType } from '@/types/News.type';
import { API_URL } from '@/utils/constants';
import axios from 'axios';

type slugType = {
  slug: string;
};

const getSingleNews = async (slug: string) => {
  try {
    const response = await axios.get(`${API_URL}/news/?slug=${slug}`);
    return response.data;
  } catch (error) {
    throw new Error('Błąd ładowania danych...');
  }
};

export default async function SingleNews({ params }: { params: slugType }) {
  const { slug } = params;

  const singleNews = await getSingleNews(slug);
  return (
    <section>
      <div className="container">{singleNews.map((news:singleNewsType)=>(
        <div key={news.id}>
            <h1>{news.title}</h1>
            <h1>{news.author}</h1>
        </div>
      ))}</div>
    </section>
  );
}
