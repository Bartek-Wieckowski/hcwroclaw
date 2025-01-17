'use client';

import styles from './leagueTables.module.css';
import TableContent from './TableContent';
import { useLeagueTables } from '@/contexts/LeagueTablesContext';
import { createPortal } from 'react-dom';
import { GetLeagueTablesQueryResult } from '../../../sanity.types';
import { motion, AnimatePresence } from 'framer-motion';
import { Locale } from '@/i18n/i18n';
import { BiX } from 'react-icons/bi';

type LeagueTablesModalProps = {
  data: GetLeagueTablesQueryResult;
  lng: Locale;
};

export default function LeagueTablesModal({
  data,
  lng,
}: LeagueTablesModalProps) {
  const { isModalOpen, toggleModal } = useLeagueTables();

  return createPortal(
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className={` ${styles.leagueTablesModal}`}
          initial={{ right: '-100%' }}
          animate={{ right: '0%' }}
          exit={{ right: '-100%' }}
          transition={{ duration: 0.3 }}
        >
          <BiX
            role="button"
            tabIndex={0}
            onClick={toggleModal}
            className={styles.closeButton}
          />
          <TableContent data={data} lng={lng} />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
