import styles from './sectionTitle.module.css';

type SectionTitleProps = {
  part1: string;
  part2: string;
  variant?: 'primary-secondary' | 'secondary-primary';
  className?: string;
  as?: 'h1' | 'h2';
};

export default function SectionTitle({
  part1,
  part2,
  variant = 'primary-secondary',
  className = '',
  as: Tag = 'h2',
}: SectionTitleProps) {
  return (
    <Tag className={`${className} ${styles.title}`}>
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
    </Tag>
  );
}
