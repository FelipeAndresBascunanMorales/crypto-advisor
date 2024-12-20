// pages/api/subscribe.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {

  console.log("we are in the post!")
  try {
    const req = await request.json();
    const { email } = req;

    console.log(email)
    // 1. Store in database (using your preferred DB)
    // await prisma.subscription.create({ data: { email } })

    // 2. Send welcome email
    const emailResult = await resend.emails.send({
      from: 'Crypto Tracker <example@resend.dev>',
      to: email,
      subject: 'Welcome to Crypto Tracker Notifications',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to Crypto Tracker! 🚀</h2>
          <p>Thanks for signing up for our promising crypto notifications.</p>
          <p>We'll notify you when:</p>
          <ul>
            <li>We add new promising cryptocurrencies to our watchlist</li>
            <li>There are significant developments in the crypto space</li>
            <li>We spot potentially interesting opportunities</li>
          </ul>
          <p style="color: #666; font-size: 0.9em;">
            You can unsubscribe at any time by clicking 
            <a href="https://crypto-advisor.vercel.app/unsubscribe?email=${email}">here</a>
          </p>
        </div>
      `
    });

    console.log(emailResult)
    if (emailResult.error)
    {
      return Response.json({message: "email not sent"}, { status: 201})
    }

    return Response.json({ message: 'Subscribed successfully' })
  } catch (error) {
    console.error('Subscription error:', error);
    return Response.json({ message: 'Error subscribing' }, { status: 500 });
  }
}
