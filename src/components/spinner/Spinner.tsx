import styles from './spinner.module.css';
import Image from 'next/image';
import hcLoader from '@/assets/images/hcloader.png';

export default function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}>
        <Image src={hcLoader} alt="Loading..." fill sizes="33vw" />
      </div>
    </div>
  );
}
