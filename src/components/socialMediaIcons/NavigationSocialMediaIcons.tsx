import SocialMediaIcons from './SocialMediaIcons';
import { useHeader } from '@/contexts/HeaderContext';

type NavigationSocialMediaIconsProps = {
  isInMobileMenu?: boolean;
};

export default function NavigationSocialMediaIcons({
  isInMobileMenu = false,
}: NavigationSocialMediaIconsProps) {
  const { isScrolled, isHomePage } = useHeader();

  return (
    <SocialMediaIcons
      isNavigation={true}
      isInMobileMenu={isInMobileMenu}
      isScrolled={isScrolled}
      isHomePage={isHomePage}
    />
  );
}
