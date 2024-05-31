import prisma from '../../../lib/prisma'

export const dynamic = 'force-dynamic';

export async function GET ( Request: Request ) {
    var users;
    try {
        users = await prisma.user.findMany({
            select: {
                email: true
            }
        }); 
      } catch (error) {
        return new Response('Error fetching user list', { status: 500 });
      }
    console.log(users);
    
    return new Response(users, { status: 200 });
  }