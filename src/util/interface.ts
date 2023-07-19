export interface IUser {
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

type TType = 'deposit' | 'transfer';
