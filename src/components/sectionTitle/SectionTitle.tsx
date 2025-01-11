import React from 'react';
import styles from './sectionTitle.module.css';

type SectionTitleProps = {
  part1: string;
  part2: string;
  variant?: 'primary-secondary' | 'secondary-primary';
  className?: string;
};

export default function SectionTitle({
  part1,
  part2,
  variant = 'primary-secondary',
  className = '',
}: SectionTitleProps) {
  return (
    <h2 className={`${className} ${styles.title}`}>
      <span
        className={
          variant === 'primary-secondary'
            ? styles.primaryColor
            : styles.secondaryColor
        }
      >
        {part1}
      </span>{' '}
      <span
        className={
          variant === 'primary-secondary'
            ? styles.secondaryColor
            : styles.primaryColor
        }
      >
        {part2}
      </span>
    </h2>
  );
}
