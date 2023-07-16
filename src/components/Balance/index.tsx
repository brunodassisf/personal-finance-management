import { FaUser } from 'react-icons/fa';

interface BalanceProps {
  info: {
    name: string;
    phone: number;
    balance: number;
  };
}

function Balance({ info: { name, phone, balance } }: BalanceProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white shadow-md p-4 rounded flex items-center gap-4">
        <div className="border-2 rounded-full p-3 border-emerald-400">
          <FaUser size={32} className="text-emerald-500" />
        </div>
        <div>
          <h6 className="text-xl font-bold text-emerald-800">{name}</h6>
          <p className="text-xl font-bold text-gray-400">{phone}</p>
        </div>
      </div>
      <div className="bg-white shadow-md p-4 rounded flex justify-around">
        <span className="text-xl font-bold text-emerald-800">Saldo</span>
        <span className="text-xl font-bold text-emerald-600">R$ {balance}</span>
      </div>
    </div>
  );
}

export default Balance;
