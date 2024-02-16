import Image from 'next/image';
import rheda from '../../assets/images/rheda-sponsor.jpg';
import styles from './sponsors.module.css';

function Sponsors() {
  return (
    <section className={styles.sponsorsSection}>
      <div className="container">
        <h2 className={`layoutH2effect ${styles.sponsorsTitle}`}>Sponsorzy</h2>
        <div className={styles.sponsorsWrapper}>
          <Image
            src={rheda}
            alt="Rheda Transport"
            width={102}
            height={102}
            className={styles.sponsorsImage}
          />
        </div>
      </div>
    </section>
  );
}

export default Sponsors;
