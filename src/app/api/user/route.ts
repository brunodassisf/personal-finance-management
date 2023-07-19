import { NextResponse } from 'next/server';

import { conect } from 'lib/conect';

export async function GET() {
  try {
    const data = await conect();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: true, msg: 'Ocorreu um erro, tente novamente mais tarde.' });
  }
}
