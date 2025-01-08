// import axios from 'axios';
// import LatestNews from '@/components/News/LatestNews/LatestNews';
// import RemainingNews from '@/components/News/RemainingNews/RemainingNews';
// import { singleNewsType } from '@/types/News.type';
// import { API_URL } from '@/utils/constants';
// import { convertDate } from '@/utils/helpers';
import styles from './home.module.css';

// const getAllNews = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/news`);
//     return response.data;
//   } catch (error) {
//     throw new Error('Błąd ładowania danych...');
//   }
// };

async function Home() {
  // const news = await getAllNews();
  // const sortedNews = news.sort((a: singleNewsType, b: singleNewsType) => {
  //   const dateA = convertDate(a.date).getTime();
  //   const dateB = convertDate(b.date).getTime();
  //   return dateB - dateA;
  // });
  // const latestNews = sortedNews[0];
  // const remainingNews = sortedNews.slice(1);

  return (
    <section>
      <div className="container">
        <div className={styles.newsWrapper}>
          <div className={styles.mainImage}>
            {/* <LatestNews news={latestNews} /> */}
          </div>
          {/* <RemainingNews news={remainingNews} /> */}
        </div>
      </div>
    </section>
  );
}

export default Home;
