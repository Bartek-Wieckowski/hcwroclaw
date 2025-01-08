import Image from 'next/image';
import styles from './latestNews.module.css';
import Link from 'next/link';
import { singleNewsType } from '@/types/News.type';
import { findDotAndCutText } from '@/utils/helpers';
import { BiSolidStar } from 'react-icons/bi';

type LatestNewsProps = {
  news: singleNewsType;
};

function LatestNews({ news }: LatestNewsProps) {
  const { date, author, title, desc, img, slug } = news;
  return (
    <div className={styles.latestNewsWrapper}>
      <Link href={`/news/${slug}`} className={styles.mainNewsImgLink}>
        <Image
          src={img}
          alt={title}
          width="600"
          height="300"
          className={styles.mainNewsImg}
        />
      </Link>
      <article className={styles.mainNewsArticle}>
        <div className={styles.mainNewsDateAuthor}>
          <small className={styles.mainNewsDate}>{date}</small>
          <small className={styles.mainNewsAuthor}>
            {author} <BiSolidStar />
          </small>
        </div>
        <Link href={`/news/${slug}`} className={styles.mainNewsDetails}>
          <h1 className={styles.mainNewsTitle}>{title}</h1>
          <p className={styles.mainNewsShortDesc}>{findDotAndCutText(desc)}</p>
          <small className={styles.mainNewsReadMore}>Czytaj dalej</small>
          <div className={styles.arrow}></div>
        </Link>
      </article>
    </div>
  );
}

export default LatestNews;
