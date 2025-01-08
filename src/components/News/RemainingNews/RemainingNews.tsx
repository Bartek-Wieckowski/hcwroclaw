import styles from './remainingNews.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { NewsType } from '@/types/News.type';
import { BiSolidStar } from 'react-icons/bi';
import { findDotAndCutText, truncateText } from '@/utils/helpers';

const RemainingNews = ({ news }: NewsType) => {
  return (
    <div>
      <h2 className={`layoutH2effect ${styles.remainingNewsTitle}`}>
        Pozostałe aktualności
      </h2>
      <div className={styles.remainingNewsGrid}>
        {news.map((item) => (
          <Link
            key={item.id}
            href={`/news/${item.slug}`}
            className={styles.remainingNewsLink}
          >
            <article className={styles.remainingNewsWrapper}>
              <div className={styles.remainingNewsImageWrapper}>
                <Image
                  src={item.img}
                  alt={item.title}
                  width="255"
                  height="135"
                  className={styles.remainingNewsImg}
                />
              </div>

              <div className={styles.remainingNewsDetails}>
                <h3 className={styles.remainingNewsDetailsTitle}>
                  {truncateText(item.title)}
                </h3>
                <p className={styles.remainingNewsDetailsText}>
                  {findDotAndCutText(item.desc)}
                </p>
                <div className={styles.remainingNewsDateAuthor}>
                  <small className={styles.remainingNewsDate}>
                    {item.date}
                  </small>
                  <small className={styles.remainingNewsAuthor}>
                    {item.author} <BiSolidStar />
                  </small>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RemainingNews;
