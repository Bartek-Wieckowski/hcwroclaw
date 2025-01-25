import baseStyles from '@/components/portableTextRenderer/portableTextRenderer.module.css';
import { PortableTextRenderer } from '@/components/portableTextRenderer/PortableTextRenderer';
import { Locale } from '@/i18n/i18n';
import { GetBecomePartnerPageQueryResult } from '../../../../sanity.types';

type BecomePartnerDescProps = {
  description: NonNullable<GetBecomePartnerPageQueryResult>;
  lng: Locale;
};

export default function BecomePartnerDesc({
  description,
  lng,
}: BecomePartnerDescProps) {
  return (
    <>
      <PortableTextRenderer
        content={description.becomePartnerDesc[lng]}
        styles={baseStyles}
        enableSocialLinks={true}
      />
    </>
  );
}
