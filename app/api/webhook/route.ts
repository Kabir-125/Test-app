import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();



export async function POST (req: Request) {

  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id, email_addresses, first_name, last_name, birthday } = evt.data as unknown as { 
    id: string;
    email_addresses: Array<{ id: string; email_address: string }> ;
    first_name: string;
    last_name: string;
    birthday: string;
  };
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const email = email_addresses[0].email_address;
    const name = `${first_name} ${last_name}`;
    let age: number | null = null;
    if (birthday) {
      const birthDate = new Date(birthday);
      const currentDate = new Date();
      age = currentDate.getFullYear() - birthDate.getFullYear();
    }

    // Store the user in the database
    try {
      await prisma.user.create({
        data: {
          email,
          username: name,
          name,
          age
        },
      });
      console.log(`User with ID ${id} and email ${email} has been created.`);
    } catch (error) {
      console.error('Error storing user in database:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
  console.log('Webhook body:', body)

  return new Response('', { status: 200 })
}

export async function GET ( Request: Request ) {
  return new Response('', { status: 200 })
}