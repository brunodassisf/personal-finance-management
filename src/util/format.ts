import VMasker from 'vanilla-masker';

const optionMoney = {
  precision: 2,
  separator: ',',
  delimiter: '.',
  unit: 'R$'
};

export const convertCurrency = (value: string | number) => {
  return VMasker.toMoney(value, optionMoney);
};

export const formatPhone = (phone: number) => {
  const phoneString = phone.toString();
  const masked = `(${phoneString.slice(0, 2)}) ${phoneString.slice(2, 7)}-${phoneString.slice(
    7,
    11
  )}`;
  return masked;
};
