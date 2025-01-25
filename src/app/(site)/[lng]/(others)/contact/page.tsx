import styles from './contactPage.module.css';
import WriteToUs from '@/components/pages/homepage/writeToUs/WriteToUs';
import ContactOptionsDesc from '@/components/pages/contactPage/ContactOptionsDesc';
import Spinner from '@/components/spinner/Spinner';
import { getLocale } from 'next-intl/server';
import { Locale } from '@/i18n/i18n';
import { client } from '@/sanity/lib/client';
import { Metadata } from 'next';
import { getContactPageQuery } from '@/sanity/lib/queries';

export const revalidate = 300;

type ContactPageProps = {
  params: {
    lng: Locale;
  };
};

export async function generateMetadata({
  params: { lng },
}: ContactPageProps): Promise<Metadata> {
  const meta = await client.fetch(
    `*[_type == "contactPage"][0] {seo{title, desc}}`
  );

  const defaultTitle = {
    pl: 'Kontakt | HC Wrocław',
    en: 'Contact | HC Wroclaw',
  };

  const defaultDesc = {
    pl: 'Skontaktuj się z nami, aby dowiedzieć się więcej o naszej drużynie hokejowej, nadchodzących meczach i wydarzeniach. Jesteśmy tutaj, aby odpowiedzieć na Twoje pytania i pomóc w każdej sprawie związanej z hokejem.',
    en: 'Get in touch with us to learn more about our hockey team, upcoming matches, and events. We are here to answer your questions and assist you with anything related to hockey.',
  };

  return {
    title: meta?.seo?.title?.[lng] || defaultTitle[lng],
    description: meta?.seo?.desc?.[lng] || defaultDesc[lng],
  };
}

export default async function ContactPage() {
  const locale = (await getLocale()) as Locale;
  const data = await client.fetch(getContactPageQuery);

  if (!data) {
    return <Spinner />;
  }

  return (
    <>
      <div className={styles.contactPage}>
        <ContactOptionsDesc description={data} lng={locale} />
      </div>
      <WriteToUs lng={locale} />
    </>
  );
}
