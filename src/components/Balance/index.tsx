'use client';
import { useRouter } from 'next/navigation';
import { FaUser } from 'react-icons/fa';
import { FaTableList } from 'react-icons/fa6';

import { convertCurrency, formatPhone } from 'util/format';
import { IUser } from 'util/interface';

interface BalanceProps {
  data: IUser;
}

function Balance({ data }: BalanceProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <div className="card items-center p-7 gap-4">
        <div className="border-2 rounded-full p-3 border-emerald-400">
          <FaUser size={32} className="text-emerald-500" />
        </div>
        <div>
          <h6 className="text-xl font-bold text-emerald-800">{data?.user.name}</h6>
          <p className="text-xl font-bold text-gray-400">{formatPhone(data?.user.phone)}</p>
        </div>
      </div>
      <div className="card p-4 justify-around">
        <span className="text-xl font-bold text-emerald-800">Saldo</span>
        <span className="text-xl font-bold text-emerald-600">
          {convertCurrency(data?.user.balance)}
        </span>
      </div>

      <div className="card h-[100px] p-5">
        <div className="flex justify-center items-center w-full">
          <div
            className="bg-emerald-600 rounded flex items-center gap-3 text-white p-5 cursor-pointer text-xl hover:bg-emerald-700 transition-all"
            onClick={() => router.push('/gestao')}
          >
            <FaTableList size={28} />
            <span>Gestão financeira</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Balance;
