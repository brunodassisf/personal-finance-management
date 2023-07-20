export interface IInfo {
  user: {
    name: string;
    phone: number;
    balance: number;
  };
  history: IHistory[];
}

export interface IHistory {
  date: string;
  label: string;
  description?: string;
  time: string;
  month: string;
  type: string | TType;
  value: number;
}

export type TType =
  | 'deposit'
  | 'transfer'
  | 'vacancy'
  | 'bill'
  | 'reserve'
  | 'travel'
  | 'medical service'
  | 'car service'
  | 'fuel'
  | 'mart'
  | 'petshop'
  | 'pharmacy'
  | 'other';
