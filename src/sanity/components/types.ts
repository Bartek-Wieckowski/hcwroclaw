export type LocaleString = {
  pl: string;
  en: string;
};

export type RowType = {
  cells: string[];
};

export type TableDocument = {
  _type: 'table';
  title: string;
  headers: LocaleString[];
  rows: RowType[];
};

export type UpdateValueType = (value: string, r: number, c: number) => void;
export type RemoveRowType = (r: number) => void;
export type OnFocusLostType = (value: string, r: number, c: number) => void;
export type RemoveColumType = (c: number) => void;
export type OnChangeType = (patches: any[]) => void;