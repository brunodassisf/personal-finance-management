'use client';
import { FaCoins } from 'react-icons/fa';

function Header() {
  return (
    <header className="bg-emerald-500 py-4 shadow-md">
      <div className="container mx-auto flex items-center text-white gap-4 px-5 xl:px-0">
        <FaCoins size={24} />
        <span className="text-lg tracking-wide">Finanças pessoais</span>
      </div>
    </header>
  );
}

export default Header;
