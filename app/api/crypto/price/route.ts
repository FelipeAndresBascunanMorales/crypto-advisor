// app/api/crypto/price/route.ts (or .js)
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const req = await request.json()
  const { ids } = req.body

  if (!ids) {
    return NextResponse.json(
      { error: 'Crypto ID is required' }, 
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(',')}&vs_currencies=usd&include_24hr_change=true`,
      { next: { revalidate: 30 } }  // Cache for 30 seconds
    );
    
    const data = await response.json();

    // return NextResponse.json(data.map((id: string) => ({
    //   id: id,
    //   price: data[id].usd,
    //   priceChange: data[id].usd_24h_change
    // })));

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching crypto price:', error);
    return NextResponse.json(
      { error: 'Failed to fetch price' }, 
      { status: 500 }
    );
  }
}