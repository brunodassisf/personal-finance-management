'use client';
import { createContext, useEffect, useState } from 'react';

import { IInfo } from 'util/interface';

export interface IUseGetUser {
  data: IInfo | null;
  handlerUser: (data: IInfo | null) => void;
}

const defaultValue = {
  user: { name: 'Fulano de tal', phone: 21912345678, balance: 223000 },
  history: [
    {
      type: 'deposit',
      label: 'Salário',
      value: 300000,
      description: '',
      time: '11:00:24',
      month: 'julho',
      date: '20/07/2023'
    },
    {
      type: 'bill',
      label: 'Conta de luz',
      value: 20000,
      description: '',
      time: '11:00:39',
      month: 'julho',
      date: '20/07/2023'
    },
    {
      type: 'vacancy',
      label: 'Ferias',
      value: 40000,
      description: '',
      time: '11:01:25',
      month: 'julho',
      date: '20/07/2023'
    },
    {
      type: 'transfer',
      label: 'Para amigo Ciclano',
      value: 5000,
      description: '',
      time: '11:01:56',
      month: 'julho',
      date: '20/07/2023'
    },
    {
      type: 'petshop',
      label: 'Remeio para o gato',
      value: 12000,
      description: '',
      time: '11:02:17',
      month: 'julho',
      date: '20/07/2023'
    }
  ]
};

export const AppContext = createContext<IUseGetUser>({
  data: null,
  handlerUser: () => {}
});
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [info, setInfo] = useState<IInfo | null>(null);

  useEffect(() => {
    const initialValue = window.localStorage.getItem('manager');

    if (!initialValue) {
      window.localStorage.setItem('manager', JSON.stringify(defaultValue));
      setInfo(defaultValue);
    } else {
      setInfo(JSON.parse(initialValue));
    }
  }, []);

  const handlerUser = (data: IInfo | null) => {
    if (data) {
      window.localStorage.setItem('manager', JSON.stringify(data));
      setInfo(data);
    } else {
      window.localStorage.removeItem('manager');
      setInfo(null);
    }
  };

  return <AppContext.Provider value={{ data: info, handlerUser }}>{children}</AppContext.Provider>;
}
