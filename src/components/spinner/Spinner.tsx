import styles from './spinner.module.css';
import Image from 'next/image';
import hcLoader from '@/assets/images/loaderBest.webp';
import hcLoaderArrow from '@/assets/images/loaderBestArrow.webp';

export default function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.staticLoader}>
        <Image src={hcLoader} alt="Loading..." fill sizes="33vw" />
      </div>
      <div className={styles.spinner}>
        <Image src={hcLoaderArrow} alt="Loading..." fill sizes="33vw" />
      </div>
    </div>
  );
}
