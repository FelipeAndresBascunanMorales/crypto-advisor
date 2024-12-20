// pages/api/track-click.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const req = await request.json();
  const { exchange, cryptoId, timestamp } = req;

  try {
    await prisma.affiliateClick.create({
      data: {
        exchange,
        cryptoId,
        timestamp: new Date(timestamp),
        // Add user IP, user agent, etc. for fraud prevention
      }
    });

    return Response.json({status: 200})
  } catch (error) {
    console.error('Error tracking click:', error);
    return Response.json({ success: false });
  }
}