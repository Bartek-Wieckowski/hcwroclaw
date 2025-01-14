'use client';

import { HeaderProvider } from '@/contexts/HeaderContext';

type HeaderWrapperProps = {
  children: React.ReactNode;
  isHomePage: boolean;
};

export default function HeaderWrapper({
  children,
  isHomePage,
}: HeaderWrapperProps) {
  return <HeaderProvider isHomePage={isHomePage}>{children}</HeaderProvider>;
}
