import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://dummyjson.com/products/1', {
    headers: {
      'Content-Type': 'application/json',
      // 'API-Key': process.env.DATA_API_KEY,
    },
  });
  const data = await res.json();

  return NextResponse.json({ data });
}
