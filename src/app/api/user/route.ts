import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/conect`, {
      method: 'GET',
      cache: 'no-cache'
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: true, msg: 'Ocorreu um erro, tente novamente mais tarde.' });
  }
}
