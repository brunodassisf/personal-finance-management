import { NextResponse } from 'next/server';

import { conect, write } from 'lib/conect';

export async function POST(request: Request) {
  try {
    const requestData = await request.json();

    const movimentDate = new Date();
    const dateLocal = movimentDate.toLocaleDateString();
    const timeLocal = movimentDate.toLocaleTimeString();

    const month = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(movimentDate);

    const format = {
      type: requestData.moviment.value,
      label: requestData.moviment.label,
      value: requestData.value.replace(/[^\d-]/g, ''),
      description: requestData.description || '',
      time: timeLocal,
      month,
      date: dateLocal
    };

    const data = await conect();

    format.type === 'deposit'
      ? (data.user.balance += Number(format.value))
      : (data.user.balance -= Number(format.value));
    data.history.push(format);

    await write(data);

    return NextResponse.json({ msg: `${format.label}, cadastrado com sucesso` });
  } catch (error) {
    return NextResponse.json({
      error: true,
      msg: 'Ocorreu um erro, tente novamente mais tarde.',
      errorText: JSON.stringify(error)
    });
  }
}
