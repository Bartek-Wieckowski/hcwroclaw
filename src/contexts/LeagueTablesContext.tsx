import { createContext, useContext, useState, useEffect } from 'react';

type LeagueTablesContextType = {
  isModalOpen: boolean;
  toggleModal: () => void;
};

const LeagueTablesContext = createContext<LeagueTablesContextType | undefined>(
  undefined
);

export function LeagueTablesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isModalOpen]);

  return (
    <LeagueTablesContext.Provider value={{ isModalOpen, toggleModal }}>
      {children}
    </LeagueTablesContext.Provider>
  );
}

export function useLeagueTables() {
  const context = useContext(LeagueTablesContext);
  if (context === undefined) {
    throw new Error(
      'useLeagueTables must be used within a LeagueTablesProvider'
    );
  }
  return context;
}
