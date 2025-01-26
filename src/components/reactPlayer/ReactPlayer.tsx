'use client';

import ReactPlayer from 'react-player';
import styles from './reactPlayer.module.css';

type VideoPlayerProps = {
  url: string;
};

export function VideoPlayer({ url }: VideoPlayerProps) {
  return (
    <div className={styles.videoContainer}>
      <ReactPlayer url={url} width="100%" height="100%" controls />
    </div>
  );
}
