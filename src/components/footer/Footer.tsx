'use client';

import styles from './footer.module.css';
import Image from 'next/image';
import logo from '@/assets/images/logo-no-bg.png';
import FooterLink from './footerLink/FooterLink';
import SocialMediaIcons from '../socialMediaIcons/SocialMediaIcons';
import { getRoutesLinks } from '../../lib/routes-link-data';
import { useLanguageContext } from '@/context/LanguageContext';

export default function Footer() {
  const lng = useLanguageContext();
  const links = getRoutesLinks(lng);

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
                {links.map((footerLink) => (
                  <FooterLink key={footerLink.title} footerLink={footerLink} />
                ))}
              </ul>
              <div className={styles.footerSocialMediaWrapper}>
                <SocialMediaIcons className={styles.footerSocialMedia} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
