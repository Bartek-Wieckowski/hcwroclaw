import baseStyles from '@/components/portableTextRenderer/portableTextRenderer.module.css';
import { PortableTextRenderer } from '@/components/portableTextRenderer/PortableTextRenderer';
import { Locale } from '@/i18n/i18n';
import { GetSupportPageQueryResult } from '../../../../sanity.types';

type SupportDescProps = {
  description: NonNullable<GetSupportPageQueryResult>;
  lng: Locale;
};

export default function SupportDesc({ description, lng }: SupportDescProps) {
  return (
    <>
      <PortableTextRenderer
        content={description.supportDesc[lng]}
        styles={baseStyles}
        enableSocialLinks={true}
      />
    </>
  );
}
