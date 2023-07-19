import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`w-full p-3 bg-emerald-500 rounded text-white text-xl flex justify-center items-center gap-3 cursor-pointer hover:bg-emerald-700 transition-all ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
