export const formatCurrency = (money: number) => {
  if (money !== 0) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(money);
  } else {
    return 'R$ 0,00';
  }
};

export const formatPhone = (phone: number) => {
  const phoneString = phone.toString();
  const masked = `(${phoneString.slice(0, 2)}) ${phoneString.slice(2, 7)}-${phoneString.slice(
    7,
    11
  )}`;
  return masked;
};
