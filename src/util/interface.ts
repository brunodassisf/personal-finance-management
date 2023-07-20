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
  time: string;
  month: string;
  type: TType;
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
