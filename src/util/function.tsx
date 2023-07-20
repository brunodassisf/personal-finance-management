import { FaCoins, FaPiggyBank, FaPills, FaPlaneDeparture, FaTaxi } from 'react-icons/fa';
import {
  FaArrowTurnDown,
  FaArrowTurnUp,
  FaCartShopping,
  FaGasPump,
  FaPaw,
  FaRegNoteSticky,
  FaScroll,
  FaStethoscope,
  FaUmbrellaBeach
} from 'react-icons/fa6';

import { IInfo, TType } from './interface';

interface IMoviment {
  label: string;
  description: string;
  type: string;
  value: string;
}

export const handleIconMoviment = (type: string) => {
  switch (type) {
    case 'deposit':
      return (
        <div className="flex items-center gap-1 text-emerald-600">
          <FaCoins size={24} />
          <FaArrowTurnDown size={24} />
        </div>
      );
    case 'transfer':
      return (
        <div className="flex items-center gap-1 text-red-600">
          <FaCoins size={24} />
          <FaArrowTurnUp size={24} />
        </div>
      );
    case 'vacancy':
      return (
        <div className="w-14 text-yellow-600">
          <FaUmbrellaBeach size={24} />
        </div>
      );
    case 'bill':
      return (
        <div className="w-14 text-stone-600">
          <FaScroll size={24} />
        </div>
      );
    case 'reserve':
      return (
        <div className="w-14 text-green-600">
          <FaPiggyBank size={24} />
        </div>
      );
    case 'travel':
      return (
        <div className="w-14 text-sky-600">
          <FaPlaneDeparture size={24} />
        </div>
      );
    case 'medical service':
      return (
        <div className="w-14 text-purple-600">
          <FaStethoscope size={24} />
        </div>
      );
    case 'car service':
      return (
        <div className="w-14 text-gray-600">
          <FaTaxi size={24} />
        </div>
      );
    case 'fuel':
      return (
        <div className="w-14 text-red-600">
          <FaGasPump size={24} />
        </div>
      );
    case 'mart':
      return (
        <div className="w-14 text-gold-600">
          <FaCartShopping size={24} />
        </div>
      );
    case 'petshop':
      return (
        <div className="w-14 text-green-600">
          <FaPaw size={24} />
        </div>
      );
    case 'pharmacy':
      return (
        <div className="w-14 text-purple-600">
          <FaPills size={24} />
        </div>
      );
    case 'other ':
      return (
        <div className="w-14 text-stone-600">
          <FaRegNoteSticky size={24} />
        </div>
      );
    default:
      return null;
  }
};

export const createMovement = (data: IMoviment, info: IInfo) => {
  const movimentDate = new Date();
  const dateLocal = movimentDate.toLocaleDateString();
  const timeLocal = movimentDate.toLocaleTimeString();

  const month = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(movimentDate);

  const moviment = {
    type: data.type as TType,
    label: data.label,
    value: Number(data.value.replace(/[^\d-]/g, '')),
    description: data.description || '',
    time: timeLocal,
    month,
    date: dateLocal
  };

  data.type === 'deposit'
    ? (info.user.balance += moviment.value)
    : (info.user.balance -= moviment.value);

  info?.history.push(moviment);
  return info;
};
