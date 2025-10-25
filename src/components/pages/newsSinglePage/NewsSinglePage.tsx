import styles from "./componentNewsSinglePage.module.css";
import baseStyles from "@/components/portableTextRenderer/portableTextRenderer.module.css";
import Image from "next/image";
import { PortableTextRenderer } from "@/components/portableTextRenderer/PortableTextRenderer";
import { formatDateInNews } from "@/lib/helpers";
import { GetSingleNewsQueryResult } from "../../../../sanity.types";
import { Locale } from "@/i18n/i18n";
import { urlFor } from "@/sanity/lib/image";

type NewsSinglePageProps = {
  news: NonNullable<GetSingleNewsQueryResult>;
  lng: Locale;
};

export function NewsSinglePage({ news, lng }: NewsSinglePageProps) {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>{news.title[lng]}</h1>
        <time className={styles.date}>{formatDateInNews(news.date, lng)}</time>
      </header>

      {news.mainPostImage && (
        <div
          className={styles.mainImageWrapper}
          style={{
            aspectRatio: news.imageAspectRatio || "16/9",
          }}
        >
          <Image
            src={urlFor(news.mainPostImage)
              .fit("crop")
              .format("webp")
              .quality(80)
              .url()}
            alt={news.mainPostImage.alt[lng] || ""}
            fill
            className={styles.mainImage}
            style={{
              objectFit: news.imageObjectFit || "cover",
            }}
          />
        </div>
      )}

      <div className={styles.content}>
        {news.content?.[lng] ? (
          <PortableTextRenderer
            content={news.content[lng]!}
            styles={{ ...baseStyles, ...styles }}
            enableSocialLinks={false}
          />
        ) : (
          <p className={baseStyles.excerpt}>{news.excerpt[lng]}</p>
        )}
      </div>
    </article>
  );
}
