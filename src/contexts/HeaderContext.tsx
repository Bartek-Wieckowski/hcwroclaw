import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';

type HeaderContextType = {
  isScrolled: boolean;
  isHomePage: boolean;
};

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({
  children,
  isHomePage,
}: {
  children: ReactNode;
  isHomePage: boolean;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isHomePage) return;

    const initialScrollPosition = window.scrollY;
    setIsScrolled(initialScrollPosition > 0);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  return (
    <HeaderContext.Provider value={{ isScrolled, isHomePage }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
}
