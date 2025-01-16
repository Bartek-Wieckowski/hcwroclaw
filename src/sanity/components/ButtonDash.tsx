import styles from './table.module.css';
import { Inline } from '@sanity/ui';
import TableButton, { TableButtonProps } from './TableButton';

type ButtonsDashProps = {
  buttons: TableButtonProps[];
};

export default function ButtonsDash({ buttons }: ButtonsDashProps) {
  return (
    <div className={styles.tableWrapper}>
      <Inline space={[3, 3, 3]}>
        {buttons.map((button) => (
          <TableButton
            key={button.description}
            description={button.description}
            onClick={button.onClick}
            icon={button.icon}
            tone={button.tone}
          />
        ))}
      </Inline>
    </div>
  );
}
