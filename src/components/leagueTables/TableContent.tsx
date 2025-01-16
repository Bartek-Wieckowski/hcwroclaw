'use client';

import styles from './leagueTables.module.css';
import { Locale } from '@/i18n/i18n';
import { GetLeagueTablesQueryResult } from '../../../sanity.types';
import { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { useTranslations } from 'next-intl';

type TableContentProps = {
  data: GetLeagueTablesQueryResult;
  lng: Locale;
};

type HeaderType = {
  pl: string | null;
  en: string | null;
};

export default function TableContent({ data, lng }: TableContentProps) {
  const t = useTranslations('leageTablePositionColumn');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (rowId: string) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  const findMainValueIndex = (headers: HeaderType[]) => {
    const pointsIndex = headers.findIndex(
      (header) =>
        header.pl?.toLowerCase().includes('punkty') ||
        header.en?.toLowerCase().includes('points')
    );

    if (pointsIndex !== -1) {
      return pointsIndex;
    }

    return headers.findIndex(
      (header) =>
        header.pl?.toLowerCase().includes('mecze') ||
        header.en?.toLowerCase().includes('matches')
    );
  };

  const findTeamNameIndex = (headers: HeaderType[]) => {
    return headers.findIndex(
      (header) =>
        header.pl?.toLowerCase().includes('drużyna') ||
        header.en?.toLowerCase().includes('team')
    );
  };

  return (
    <div className={styles.content}>
      {data.map((table) => {
        const mainValueIndex = findMainValueIndex(table.headers);
        const teamNameIndex = findTeamNameIndex(table.headers);

        return (
          <div key={table._id} className={styles.tableWrapper}>
            <h2 className={styles.tableTitle}>{table.title}</h2>
            <div className={styles.tableContainer}>
              {/* Desktop Table */}
              <table className={`${styles.table} ${styles.desktopTable}`}>
                <thead>
                  <tr>
                    {table.headers.map((header: HeaderType, index: number) => (
                      <th key={index}>
                        {index === 0 ? t('position') : header[lng] || ''}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, rowIndex: number) => (
                    <tr key={rowIndex}>
                      {row.cells.map((cell: string, cellIndex: number) => (
                        <td key={cellIndex}>
                          {cellIndex === 0 ? rowIndex + 1 : cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile Table */}
              <div className={styles.mobileTable}>
                <div className={styles.mobileHeader}>
                  <span>{t('position')}</span>
                  <span>{table.headers[teamNameIndex][lng]}</span>
                  <span>{table.headers[mainValueIndex][lng]}</span>
                </div>
                {table.rows.map((row, rowIndex: number) => (
                  <div key={rowIndex} className={styles.mobileRow}>
                    <button
                      className={styles.mobileRowHeader}
                      onClick={() => toggleRow(`${table._id}-${rowIndex}`)}
                    >
                      <div className={styles.mainInfo}>
                        <span className={styles.position}>{rowIndex + 1}</span>
                        <span className={styles.teamName}>
                          {row.cells[teamNameIndex]}
                        </span>
                        <span className={styles.points}>
                          {row.cells[mainValueIndex]}
                        </span>
                      </div>
                      <IoChevronDown
                        className={`${styles.chevron} ${
                          expandedRow === `${table._id}-${rowIndex}`
                            ? styles.expanded
                            : ''
                        }`}
                      />
                    </button>
                    {expandedRow === `${table._id}-${rowIndex}` && (
                      <div className={styles.mobileRowDetails}>
                        {row.cells.map((cell: string, cellIndex: number) => {
                          if (
                            cellIndex !== 0 &&
                            cellIndex !== teamNameIndex &&
                            cellIndex !== mainValueIndex
                          ) {
                            return (
                              <div key={cellIndex} className={styles.detailRow}>
                                <span className={styles.label}>
                                  {table.headers[cellIndex][lng] || ''}:
                                </span>
                                <span className={styles.value}>{cell}</span>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
