// pages/api/subscribe.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { email } = JSON.parse(req.body)
    
    const subscription = await prisma.subscription.create({
      data: { email }
    })

    res.status(200).json({ message: 'Subscribed successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error subscribing' })
  }
}