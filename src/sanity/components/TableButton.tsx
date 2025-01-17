import { Tooltip, Button } from '@sanity/ui';

export type TableButtonProps ={
  description: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  icon: JSX.Element;
  tone?: any;
}

export default function TableButton({ description, onClick, icon, tone }: TableButtonProps){
  return (
    <Tooltip content={description} placement="top-start" portal>
      <Button mode="ghost" padding={4} onClick={onClick} aria-label={description} tone={tone}>
        {icon}
      </Button>
    </Tooltip>
  );
};

