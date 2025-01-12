// import axios from 'axios';
// import styles from './singleNewsPage.module.css';
// import Image from 'next/image';
// import { BiSolidStar } from 'react-icons/bi';
// import { singleNewsType } from '@/types/News.type';
// import { API_URL } from '@/utils/constants';

type slugType = {
  slug: string;
};

// const getSingleNews = async (slug: string) => {
//   try {
//     const response = await axios.get(`${API_URL}/news/?slug=${slug}`);
//     return response.data;
//   } catch (error) {
//     throw new Error('Błąd ładowania danych...');
//   }
// };

export default async function NewsSinglePage({ params }: { params: slugType }) {
  // const { slug } = params;

  // const singleNews = await getSingleNews(slug);
  return (
    <section>
      <div className="container">
        {/* {singleNews.map((news: singleNewsType) => (
          <article key={news.id} className={styles.singleNewsArticle}>
            <h1 className={styles.singleNewsTitle}>{news.title}</h1>
            <div className={styles.singleNewsDateAuthor}>
              <small className={styles.singleNewsDate}>{news.date}</small>
              <small className={styles.singleNewsAuthor}>
                {news.author} <BiSolidStar />
              </small>
            </div>
            <Image
              src={news.img}
              alt={news.title}
              width="600"
              height="300"
              className={styles.singleNewsImg}
            />
            <p className={styles.singleNewsDesc}>{news.desc}</p>
          </article>
        ))} */}
      </div>
    </section>
  );
}
