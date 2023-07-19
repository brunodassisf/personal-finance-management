import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  touched?: boolean;
  label?: string;
}

function Input({ error, touched, label, className, ...props }: InputProps) {
  return (
    <div className={`w-full flex flex-col ${className}`}>
      <label className="text-lg text-emerald-800">{label}</label>
      <input
        className={`border-2 border-gray-400 rounded-md p-2 outline-none ${
          error && touched ? 'border-red-500 text-red-500' : ''
        }`}
        placeholder="R$ 0,00"
        {...props}
      />
      <span className="text-sm text-red-600">{error && touched ? error : undefined}</span>
    </div>
  );
}

export default Input;
