import styles from './footer.module.css';
import Image from 'next/image';
import logo from '@/assets/images/logo-no-bg.png';
import FooterLink from './FooterLink/FooterLink';
import SocialMediaIcons from '../SocialMediaIcons/SocialMediaIcons';
import { navbarLinks } from '../Navbar/navbar-data';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.gridWrapper}>
          <div className={styles.leftSide}>
            <div className="dFlex">
              <h1 className={styles.teamName}>HC Wrocław</h1>
              <Image src={logo} width={60} height={40} alt="HC Wrocław" />
            </div>
            <small>
              © HC Wrocław {new Date().getFullYear()}. All rights reserved.
            </small>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.footerLinksWrapper}>
              <ul className={styles.footerLinkList}>
                {navbarLinks.map((footerLink) => (
                  <FooterLink key={footerLink.title} footerLink={footerLink} />
                ))}
              </ul>
              <SocialMediaIcons />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
