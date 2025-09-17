'use client';

import styles from './leagueTables.module.css';
import Image from 'next/image';
import { Locale } from '@/i18n/i18n';
import { GetLeagueTablesQueryResult } from '../../../sanity.types';
import { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { convertDateWithTimezone } from '@/lib/helpers';
import { useTranslations } from 'next-intl';
import { urlFor } from '@/sanity/lib/image';

type TableContentProps = {
  data: GetLeagueTablesQueryResult;
  lng: Locale;
};

type HeaderType = {
  pl: string | null;
  en: string | null;
};

export default function TableContent({ data, lng }: TableContentProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const t = useTranslations('leageTables');

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
      {data.length === 0 ? (
        <h4 className={styles.noLeagueMessage}>{t('noLeagueMessage')}</h4>
      ) : (
        data.map((table) => {
          const mainValueIndex = findMainValueIndex(table.headers);
          const teamNameIndex = findTeamNameIndex(table.headers);

          return (
            <div key={table._id} className={styles.tableWrapper}>
              {table.logo && (
                <div className={styles.tableHeaderWithLogo}>
                  <>
                    <Image
                      src={urlFor(table.logo).format('webp').quality(80).url()}
                      alt={table.title}
                      width={25}
                      height={25}
                    />
                    <h2 className={styles.tableTitle}>{table.title}</h2>
                  </>
                </div>
              )}
              {!table.logo && (
                <h2 className={styles.tableTitle}>{table.title}</h2>
              )}
              <div className={styles.table}>
                <div className={styles.tableHeader}>
                  <div className={styles.positionColumn}>#</div>
                  <div className={styles.teamColumn}>
                    {table.headers[teamNameIndex][lng]}
                  </div>
                  <div className={styles.pointsColumn}>
                    {table.headers[mainValueIndex][lng]}
                  </div>
                  <div className={styles.chevronColumn}></div>
                </div>
                {table.rows.map((row, rowIndex: number) => {
                  const teamName = row.cells[teamNameIndex];
                  const isClientTeam = /hc wrocław|hc wroclaw/i.test(teamName);

                  return (
                    <div key={rowIndex} className={`${styles.tableRow} `}>
                      <button
                        className={styles.rowContent}
                        onClick={() => toggleRow(`${table._id}-${rowIndex}`)}
                      >
                        <div
                          className={`${styles.positionColumn} ${isClientTeam ? styles.activeClientPlaceInTable : ''}`}
                        >
                          {rowIndex + 1}
                        </div>
                        <div className={`${styles.teamColumnInRow}`}>
                          {teamName}
                        </div>
                        <div className={styles.pointsColumnInRow}>
                          {row.cells[mainValueIndex]}
                        </div>
                        <div className={styles.chevronColumn}>
                          <IoChevronDown
                            className={`${styles.chevron} ${
                              expandedRow === `${table._id}-${rowIndex}`
                                ? styles.expanded
                                : ''
                            }`}
                          />
                        </div>
                      </button>
                      {expandedRow === `${table._id}-${rowIndex}` && (
                        <div className={styles.rowDetails}>
                          {row.cells.map((cell: string, cellIndex: number) => {
                            if (
                              cellIndex !== 0 &&
                              cellIndex !== teamNameIndex &&
                              cellIndex !== mainValueIndex
                            ) {
                              return (
                                <div
                                  key={cellIndex}
                                  className={styles.detailRow}
                                >
                                  <span className={styles.label}>
                                    {table.headers[cellIndex][lng]}:
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
                  );
                })}
                <small className={styles.updateInfo}>
                  <span>{t('update')}:&nbsp;</span>
                  {convertDateWithTimezone(
                    table._updatedAt || table._createdAt
                  )}
                </small>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
